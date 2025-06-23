import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, User, Calendar, Camera, Settings, Gamepad2, Store, BarChart3, MessageCircle, Users, Palette, Shield, Heart, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  // Don't show sidebar on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  const getMenuItems = () => {
    if (!user) return [
      { path: '/', icon: Home, label: 'Home' },
      { path: '/gallery', icon: Image, label: 'Gallery' },
    ];

    const commonItems = [
      { path: '/', icon: Home, label: 'Home' },
      { path: '/events', icon: Calendar, label: 'Event Discovery' },
      { path: '/cleanup', icon: Camera, label: 'Live Cleanup' },
      { path: '/donations', icon: Heart, label: 'Donations' },
      { path: '/analytics', icon: BarChart3, label: 'Impact Analytics' },
      { path: '/gallery', icon: Image, label: 'Gallery' },
      { path: '/assistant', icon: MessageCircle, label: 'AI Assistant' },
    ];

    if (user.role === 'volunteer') {
      return [
        ...commonItems.slice(0, 1), // Home
        { path: '/volunteer', icon: User, label: 'Volunteer Dashboard' },
        ...commonItems.slice(1, 3), // Events, Cleanup
        { path: '/gamification', icon: Gamepad2, label: 'Gamification Hub' },
        { path: '/vendor', icon: Store, label: 'Vendor Portal' },
        ...commonItems.slice(3), // Donations, Analytics, Gallery, Assistant
      ];
    } else {
      return [
        ...commonItems.slice(0, 1), // Home
        { path: '/organizer', icon: Users, label: 'Organizer Dashboard' },
        ...commonItems.slice(1, 3), // Events, Cleanup
        { path: '/content', icon: Palette, label: 'Content Studio' },
        { path: '/vendor', icon: Store, label: 'Vendor Portal' },
        ...commonItems.slice(3), // Donations, Analytics, Gallery, Assistant
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ocean-400 to-wave-400 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.avatar || user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  {user.isVerified && user.role === 'organizer' && (
                    <Shield className="h-4 w-4 text-green-500 ml-1" title="Verified Organizer" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'volunteer' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {user.role === 'volunteer' ? (
                      <>
                        <Shield className="h-3 w-3 mr-1" />
                        Volunteer
                      </>
                    ) : (
                      <>
                        <Users className="h-3 w-3 mr-1" />
                        {user.isVerified ? 'Verified Organizer' : 'Organizer'}
                      </>
                    )}
                  </span>
                </div>
                {user.role === 'volunteer' && user.level && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.level} • {user.points} pts
                  </p>
                )}
                {user.role === 'organizer' && user.organizationName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.organizationName}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <nav className="mt-4 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-ocean-100 dark:bg-ocean-900 text-ocean-700 dark:text-ocean-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}