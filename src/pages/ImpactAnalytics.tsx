import React, { useState } from 'react';
import { BarChart3, TrendingUp, MapPin, Leaf, Users, Calendar, Award, Target } from 'lucide-react';

export default function ImpactAnalytics() {
  const [timeRange, setTimeRange] = useState('month');

  const impactStats = [
    { label: 'Total Waste Collected', value: '12,847 kg', change: '+23%', icon: Target, color: 'text-green-600' },
    { label: 'CO₂ Emissions Saved', value: '1,847 kg', change: '+18%', icon: Leaf, color: 'text-emerald-600' },
    { label: 'Beaches Restored', value: '247', change: '+15%', icon: MapPin, color: 'text-blue-600' },
    { label: 'Community Members', value: '5,623', change: '+31%', icon: Users, color: 'text-purple-600' },
  ];

  const wasteBreakdown = [
    { type: 'Plastic Bottles', amount: 3247, percentage: 25, color: 'bg-red-500' },
    { type: 'Food Wrappers', amount: 2156, percentage: 17, color: 'bg-orange-500' },
    { type: 'Plastic Bags', amount: 1987, percentage: 15, color: 'bg-yellow-500' },
    { type: 'Cigarette Butts', amount: 1654, percentage: 13, color: 'bg-green-500' },
    { type: 'Glass Bottles', amount: 1432, percentage: 11, color: 'bg-blue-500' },
    { type: 'Metal Cans', amount: 1234, percentage: 10, color: 'bg-purple-500' },
    { type: 'Other', amount: 1137, percentage: 9, color: 'bg-gray-500' },
  ];

  const monthlyData = [
    { month: 'Jan', waste: 890, volunteers: 234, events: 12 },
    { month: 'Feb', waste: 1120, volunteers: 287, events: 15 },
    { month: 'Mar', waste: 1340, volunteers: 342, events: 18 },
    { month: 'Apr', waste: 1580, volunteers: 398, events: 22 },
    { month: 'May', waste: 1820, volunteers: 456, events: 25 },
    { month: 'Jun', waste: 2100, volunteers: 523, events: 28 },
  ];

  const successStories = [
    {
      title: 'Juhu Beach Transformation',
      description: 'From heavily polluted to pristine in 6 months',
      impact: '2,340 kg waste removed',
      image: '🏖️'
    },
    {
      title: 'Marine Life Recovery',
      description: 'Sea turtle nesting sites restored',
      impact: '15 nesting sites protected',
      image: '🐢'
    },
    {
      title: 'Community Engagement',
      description: 'Local schools joined the movement',
      impact: '1,200 students participated',
      image: '🎓'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Impact Analytics Dashboard</h1>
        <p className="text-blue-100 text-lg">Track environmental progress and community impact</p>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Overview</h2>
          <div className="flex space-x-2">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {impactStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Monthly Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Monthly Trends</h3>
            
            <div className="space-y-6">
              {/* Waste Collection Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Waste Collected (kg)</h4>
                <div className="flex items-end space-x-2 h-32">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                        style={{ height: `${(data.waste / 2500) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteers Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Active Volunteers</h4>
                <div className="flex items-end space-x-2 h-24">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                        style={{ height: `${(data.volunteers / 600) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Waste Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Waste Type Breakdown</h3>
            
            <div className="space-y-4">
              {wasteBreakdown.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm text-gray-600 dark:text-gray-400">{item.type}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-sm text-gray-900 dark:text-white font-medium text-right">
                    {item.amount} kg
                  </div>
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beach Heatmap */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Mumbai Beach Activity Heatmap</h3>
            
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Interactive Beach Map
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Cleanup activity intensity across Mumbai beaches
                  </p>
                </div>
              </div>
              
              {/* Mock heatmap points */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full opacity-75 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-orange-500 rounded-full opacity-75 animate-pulse"></div>
              <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-yellow-500 rounded-full opacity-75 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-green-500 rounded-full opacity-75 animate-pulse"></div>
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Low Activity</span>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                <div className="w-4 h-4 bg-red-500 rounded"></div>
              </div>
              <span className="text-gray-600 dark:text-gray-400">High Activity</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Environmental Calculator */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Environmental Impact Calculator
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="font-medium text-green-800 dark:text-green-200">CO₂ Reduction</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">1,847 kg</p>
                <p className="text-sm text-green-600 dark:text-green-400">Equivalent to 8,234 km of car travel</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Marine Life Protected</span>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">~2,500</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Sea creatures saved from plastic</p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">Economic Impact</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">₹12.4L</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Tourism revenue protected</p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h3>
            
            <div className="space-y-4">
              {successStories.map((story, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">{story.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {story.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {story.description}
                      </p>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        {story.impact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Growth */}
          <div className="bg-gradient-to-br from-ocean-50 to-wave-50 dark:from-ocean-900 dark:to-wave-900 rounded-xl p-6">
            <h3 className="text-lg font-bold text-ocean-800 dark:text-ocean-200 mb-4">
              Community Growth
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-ocean-700 dark:text-ocean-300">New Volunteers</span>
                <span className="font-bold text-ocean-800 dark:text-ocean-200">+156 this month</span>
              </div>
              
              <div className="w-full bg-ocean-200 dark:bg-ocean-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-ocean-400 to-wave-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              
              <div className="text-xs text-ocean-600 dark:text-ocean-400">
                78% growth target achieved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}