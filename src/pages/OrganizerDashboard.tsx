import React, { useState } from 'react';
import { Plus, Users, Calendar, MapPin, Mic, Share2, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function OrganizerDashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const { user } = useAuth();

  const stats = [
    { label: 'Active Events', value: user?.eventsOrganized?.toString() || '8', color: 'text-ocean-600', bgColor: 'bg-ocean-100' },
    { label: 'Total Volunteers', value: user?.totalVolunteers?.toString() || '247', color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Pending RSVPs', value: '23', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { label: 'Completion Rate', value: '94%', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const recentEvents = [
    { id: 1, title: 'Juhu Beach Sunrise Cleanup', date: '2024-01-15', volunteers: 45, status: 'upcoming' },
    { id: 2, title: 'Versova Plastic Drive', date: '2024-01-18', volunteers: 32, status: 'upcoming' },
    { id: 3, title: 'Marine Drive Conservation', date: '2024-01-12', volunteers: 28, status: 'completed' },
  ];

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setEventTitle('Beach cleanup at Bandra Bandstand this Saturday morning at 7 AM');
      setIsRecording(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-green-100 text-lg">
              {user?.organizationName ? `${user.organizationName} • ` : ''}Manage and create impactful cleanup events
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{user?.eventsOrganized || 0}</div>
            <div className="text-green-200">Events Organized</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className={`p-3 ${stat.bgColor} dark:bg-gray-700 rounded-lg`}>
                <BarChart3 className={`h-6 w-6 ${stat.color} dark:text-gray-300`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Event Creation */}
        <div className="xl:col-span-2 space-y-6">
          {/* Quick Event Creator */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Event</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Description (Voice Input)
                </label>
                <div className="relative">
                  <textarea
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Tell us about your event..."
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                  />
                  <button
                    onClick={simulateVoiceInput}
                    className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
                      isRecording
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-ocean-500 hover:bg-ocean-600'
                    } text-white`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                </div>
                {isRecording && (
                  <p className="text-sm text-ocean-600 dark:text-ocean-400 mt-2">
                    🎤 Listening... Speak your event details
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Volunteers
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-ocean-500 to-wave-500 text-white py-3 rounded-lg font-semibold hover:from-ocean-600 hover:to-wave-600 transition-all">
                Create Event
              </button>
            </div>
          </div>

          {/* AI Equipment Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              AI Equipment Calculator
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Based on 45 volunteers for beach cleanup:
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Trash bags:</span> 90 units
                </div>
                <div>
                  <span className="font-medium">Gloves:</span> 50 pairs
                </div>
                <div>
                  <span className="font-medium">Reacher tools:</span> 15 units
                </div>
                <div>
                  <span className="font-medium">Water bottles:</span> 50 units
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Events */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Events</h3>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {event.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>{event.date}</span>
                    <span className={`px-2 py-1 rounded ${
                      event.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Social Preview</h3>
              <Share2 className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="bg-gradient-to-br from-ocean-100 to-wave-100 dark:from-ocean-900 dark:to-wave-900 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                🌊 Join our Beach Cleanup!
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                📍 Juhu Beach, Mumbai<br/>
                📅 Saturday, 7:00 AM<br/>
                👥 45 volunteers needed
              </div>
              <div className="text-xs text-ocean-600 dark:text-ocean-400">
                #BeachCleanup #Mumbai #Environment
              </div>
            </div>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Auto-post to Social Media
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-white">View RSVPs</span>
                <Users className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Send Reminders</span>
                <Calendar className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Event Analytics</span>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}