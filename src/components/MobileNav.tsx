import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, BarChart3, MessageCircle, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MobileNav() {
  const location = useLocation();
  const { user } = useAuth();

  // Don't show mobile nav on auth page or if user is not logged in
  if (location.pathname === '/auth' || !user) {
    return null;
  }

  const getNavItems = () => {
    if (user.role === 'volunteer') {
      return [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/events', icon: Calendar, label: 'Events' },
        { path: '/volunteer', icon: User, label: 'Dashboard' },
        { path: '/analytics', icon: BarChart3, label: 'Impact' },
        { path: '/assistant', icon: MessageCircle, label: 'AI Chat' },
      ];
    } else {
      return [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/events', icon: Calendar, label: 'Events' },
        { path: '/organizer', icon: Users, label: 'Dashboard' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/assistant', icon: MessageCircle, label: 'AI Chat' },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-ocean-600 dark:text-ocean-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}