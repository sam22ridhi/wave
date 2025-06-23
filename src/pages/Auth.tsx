import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Waves, Mail, Lock, User, Building, Sparkles, Shield } from 'lucide-react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import AadhaarVerification from '../components/AadhaarVerification';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
  });

  const { login, signup, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || (selectedRole === 'volunteer' ? '/volunteer' : '/organizer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate(from, { replace: true });
        } else {
          setError('Invalid email or password');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        if (selectedRole === 'organizer') {
          // Show Aadhaar verification for organizers
          setShowVerification(true);
          setIsLoading(false);
          return;
        }

        const success = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
          organizationName: selectedRole === 'organizer' ? formData.organizationName : undefined,
          avatar: selectedRole === 'volunteer' ? '👤' : '🏢',
        });

        if (success) {
          navigate(selectedRole === 'volunteer' ? '/volunteer' : '/organizer', { replace: true });
        } else {
          setError('User already exists with this email');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = async (verified: boolean) => {
    if (verified) {
      const success = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        organizationName: formData.organizationName,
        avatar: '🏢',
        isVerified: true,
      });

      if (success) {
        setShowVerification(false);
        navigate('/organizer', { replace: true });
      } else {
        setError('User already exists with this email');
        setShowVerification(false);
      }
    } else {
      setShowVerification(false);
      setError('Verification failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-wave-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2314b8a6%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="relative">
              <Waves className="h-12 w-12 text-ocean-500 animate-wave" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-wave-400 to-ocean-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-wave-600 bg-clip-text text-transparent">
              WaveAI
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLogin ? 'Welcome back!' : 'Join the movement'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
          {/* Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white dark:bg-gray-600 text-ocean-600 dark:text-ocean-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white dark:bg-gray-600 text-ocean-600 dark:text-ocean-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection (Sign Up Only) */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('volunteer')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'volunteer'
                      ? 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <Sparkles className={`h-6 w-6 mx-auto mb-2 ${
                    selectedRole === 'volunteer' ? 'text-ocean-500' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Volunteer</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Join cleanups</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setSelectedRole('organizer')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'organizer'
                      ? 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <Shield className={`h-6 w-6 mx-auto mb-2 ${
                    selectedRole === 'organizer' ? 'text-ocean-500' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Organizer</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Create events</div>
                </button>
              </div>
              
              {selectedRole === 'organizer' && !isLogin && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
                    <div className="text-sm text-green-800 dark:text-green-200">
                      <p className="font-medium">Verification Required</p>
                      <p className="text-xs mt-1">Organizers undergo Aadhaar-based verification for community trust and security.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && selectedRole === 'organizer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="organizationName"
                    required
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Enter organization name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-ocean-500 to-wave-500 hover:from-ocean-600 hover:to-wave-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : (selectedRole === 'organizer' ? 'Proceed to Verification' : 'Create Account')
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
                <div><strong>Volunteer:</strong> ritika@example.com / password123</div>
                <div><strong>Verified Organizer:</strong> sam@example.com / password123</div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-ocean-600 dark:text-ocean-400 hover:text-ocean-700 dark:hover:text-ocean-300 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Aadhaar Verification Modal */}
      <AadhaarVerification
        isVisible={showVerification}
        onVerificationComplete={handleVerificationComplete}
      />
    </div>
  );
}