import React from 'react';
import { Trophy, Award, MapPin, Gift, TrendingUp, Users, Calendar, Star } from 'lucide-react';
import { mockVolunteers, mockEvents, mockVouchers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const topVolunteers = mockVolunteers.slice(0, 10);
  const nearbyEvents = mockEvents.slice(0, 3);

  // Use actual user data or fallback to mock data
  const currentUser = user || mockVolunteers[9];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-ocean-500 to-wave-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h1>
            <p className="text-ocean-100 text-lg">Ready to make a difference today?</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{(currentUser.points || 0).toLocaleString()}</div>
            <div className="text-ocean-200">Total Points</div>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-ocean-100 dark:bg-ocean-900 rounded-lg">
              <Trophy className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Level</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.level || 'Newcomer'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.badges || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Events Joined</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 20) + 5}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Global Rank</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                #{Math.floor(Math.random() * 100) + 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h2>
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {topVolunteers.map((volunteer, index) => (
                <div
                  key={volunteer.id}
                  className={`flex items-center p-4 rounded-lg transition-all duration-200 ${
                    volunteer.name === currentUser.name
                      ? 'bg-gradient-to-r from-ocean-50 to-wave-50 dark:from-ocean-900 dark:to-wave-900 border-2 border-ocean-300 dark:border-ocean-600'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {index < 3 ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                      }`}>
                        {index + 1}
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{volunteer.avatar}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{volunteer.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{volunteer.level}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{volunteer.points.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{volunteer.badges} badges</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Find Events */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Events Near Me</h3>
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {nearbyEvents.map((event) => (
                <div key={event.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.location}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ocean-600 dark:text-ocean-400">{event.date}</span>
                    <span className="text-gray-500">{event.volunteers}/{event.maxVolunteers} joined</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-ocean-500 hover:bg-ocean-600 text-white py-2 rounded-lg transition-colors">
              View All Events
            </button>
          </div>

          {/* Available Vouchers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Available Vouchers</h3>
              <Gift className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {mockVouchers.map((voucher) => (
                <div key={voucher.id} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">₹{voucher.amount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{voucher.vendor}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        {voucher.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
              <Star className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Account created</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Welcome to WaveAI!</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Profile completed</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Ready to join events</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">First login</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Newcomer level achieved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}