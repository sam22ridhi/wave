import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MapPin, Award, Zap, Eye, Bot, Gamepad2, Camera, Sparkles, Shield } from 'lucide-react';
import { mockStats } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const [stats, setStats] = useState({ beachesCleaned: 0, wasteCollected: 0, volunteersActive: 0, co2Saved: 0 });
  const { user } = useAuth();

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          beachesCleaned: Math.floor(mockStats.beachesCleaned * progress),
          wasteCollected: Math.floor(mockStats.wasteCollected * progress),
          volunteersActive: Math.floor(mockStats.volunteersActive * progress),
          co2Saved: Math.floor(mockStats.co2Saved * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(mockStats);
        }
      }, increment);
    };

    animateStats();
  }, []);

  const features = [
    {
      icon: Eye,
      title: 'CV Waste Intelligence',
      description: 'AI-powered computer vision identifies and categorizes waste in real-time, making cleanup more efficient.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'AI Copilot',
      description: 'Smart assistant provides personalized guidance, safety tips, and instant answers to environmental questions.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Gamepad2,
      title: 'Gamification',
      description: 'Earn points, unlock achievements, and compete with friends while making a positive environmental impact.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Camera,
      title: 'Content Creation',
      description: 'AI-powered tools help create compelling social media content to amplify your environmental message.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-100 via-wave-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2314b8a6%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="block">WaveAI</span>
              <span className="block bg-gradient-to-r from-ocean-600 to-wave-600 bg-clip-text text-transparent">
                Empowering Communities
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              AI-driven innovation for a cleaner, greener tomorrow. Join thousands of volunteers making a real difference in beach conservation.
            </p>
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  to={user.role === 'volunteer' ? '/volunteer' : '/organizer'}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-ocean-500 to-wave-500 text-white font-semibold rounded-full hover:from-ocean-600 hover:to-wave-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-ocean-600 dark:text-ocean-400 font-semibold rounded-full border-2 border-ocean-500 hover:bg-ocean-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-200"
                >
                  Find Events
                  <MapPin className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    to="/auth"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-ocean-500 to-wave-500 text-white font-semibold rounded-full hover:from-ocean-600 hover:to-wave-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>

                {/* Role Selection Preview */}
                <div className="max-w-2xl mx-auto mb-16">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Choose your path to environmental impact:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-200">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join as Volunteer</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Participate in cleanups, earn points, unlock achievements, and make a direct impact
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-200">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Become Organizer</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Create events, manage volunteers, track impact, and lead community initiatives
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Stats Counter */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ocean-600 dark:text-ocean-400 mb-2">
                  {stats.beachesCleaned}+
                </div>
                <div className="text-gray-600 dark:text-gray-300">Beaches Cleaned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-wave-600 dark:text-wave-400 mb-2">
                  {stats.wasteCollected}kg
                </div>
                <div className="text-gray-600 dark:text-gray-300">Waste Collected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {stats.volunteersActive}+
                </div>
                <div className="text-gray-600 dark:text-gray-300">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stats.co2Saved}kg
                </div>
                <div className="text-gray-600 dark:text-gray-300">CO₂ Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by AI Innovation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our cutting-edge technology makes beach cleanup more effective, engaging, and impactful than ever before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-ocean-500 to-wave-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Make Waves?
          </h2>
          <p className="text-xl text-ocean-100 mb-12 max-w-3xl mx-auto">
            Join our community of environmental champions and start making a difference today. Every cleanup counts, every action matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link
                  to="/events"
                  className="inline-flex items-center px-8 py-4 bg-white text-ocean-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Events Near Me
                </Link>
                <Link
                  to="/gamification"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-ocean-600 transform hover:scale-105 transition-all duration-200"
                >
                  <Award className="mr-2 h-5 w-5" />
                  View Achievements
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="inline-flex items-center px-8 py-4 bg-white text-ocean-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join the Movement
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-ocean-600 transform hover:scale-105 transition-all duration-200"
                >
                  <Award className="mr-2 h-5 w-5" />
                  Start Organizing
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}