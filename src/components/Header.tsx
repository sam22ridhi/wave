import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Waves, LogOut, User, Settings, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Don't show header on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  const getNavItems = () => {
    if (!user) return [
      { path: '/gallery', label: 'Gallery' },
    ];
    
    if (user.role === 'volunteer') {
      return [
        { path: '/events', label: 'Events' },
        { path: '/volunteer', label: 'Dashboard' },
        { path: '/gamification', label: 'Achievements' },
        { path: '/donations', label: 'Donations' },
        { path: '/analytics', label: 'Impact' },
        { path: '/gallery', label: 'Gallery' },
      ];
    } else {
      return [
        { path: '/organizer', label: 'Dashboard' },
        { path: '/events', label: 'Events' },
        { path: '/donations', label: 'Donations' },
        { path: '/analytics', label: 'Analytics' },
        { path: '/content', label: 'Content' },
        { path: '/gallery', label: 'Gallery' },
      ];
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-ocean-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-ocean-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
              <div className="relative">
                <Waves className="h-8 w-8 text-ocean-500 animate-wave" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-wave-400 to-ocean-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-ocean-600 to-wave-600 bg-clip-text text-transparent">
                WaveAI
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-ocean-600 dark:text-ocean-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-ocean-600 dark:hover:text-ocean-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-ocean-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-ocean-400 to-wave-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.avatar || user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.name}
                      </div>
                      {user.isVerified && user.role === 'organizer' && (
                        <Shield className="h-4 w-4 text-green-500 ml-1" title="Verified Organizer" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user.role}
                      {user.role === 'volunteer' && user.points && (
                        <span className="ml-1">• {user.points} pts</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-ocean-100 dark:hover:bg-gray-800 transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <User className="h-4 w-4 mr-2" />
                        Profile Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-ocean-500 to-wave-500 hover:from-ocean-600 hover:to-wave-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}