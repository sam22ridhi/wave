import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Clock, Sun, CloudRain } from 'lucide-react';
import { mockEvents } from '../data/mockData';

export default function EventDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'today', label: 'Today' },
    { value: 'weekend', label: 'This Weekend' },
    { value: 'nearby', label: 'Nearby' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-500 to-wave-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Discover Cleanup Events</h1>
        <p className="text-ocean-100 text-lg">Find and join beach cleanup events near you</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 ${
                  viewMode === 'grid'
                    ? 'bg-ocean-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-3 ${
                  viewMode === 'map'
                    ? 'bg-ocean-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Event Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-ocean-400 to-wave-400 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">26°C</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                  <div className="text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.volunteers}/{event.maxVolunteers} volunteers</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{event.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      event.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {event.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{event.organizer}</span>
                  </div>
                  <button className="bg-ocean-500 hover:bg-ocean-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Join Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-ocean-100 to-wave-100 dark:from-gray-700 dark:to-gray-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-ocean-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Interactive Map View</h3>
                <p className="text-gray-600 dark:text-gray-400">Event locations would be displayed on an interactive map</p>
              </div>
            </div>
            
            {/* Mock Map Markers */}
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="absolute w-8 h-8 bg-ocean-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${30 + index * 15}%`,
                  top: `${40 + index * 10}%`,
                }}
                title={event.title}
              >
                {index + 1}
              </div>
            ))}
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Events on Map</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}