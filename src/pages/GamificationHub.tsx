import React, { useState } from 'react';
import { Trophy, Award, Star, Target, Users, Zap, Lock } from 'lucide-react';
import { mockAchievements } from '../data/mockData';

export default function GamificationHub() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'leaderboard'>('achievements');

  const challenges = [
    {
      id: 1,
      title: 'Weekend Warrior',
      description: 'Complete 3 cleanups this weekend',
      progress: 1,
      total: 3,
      reward: '100 points',
      timeLeft: '2 days',
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Plastic Hunter',
      description: 'Identify 50 plastic items using AI detection',
      progress: 23,
      total: 50,
      reward: '200 points + Badge',
      timeLeft: '5 days',
      difficulty: 'Hard'
    },
    {
      id: 3,
      title: 'Team Builder',
      description: 'Invite 5 friends to join cleanups',
      progress: 2,
      total: 5,
      reward: '150 points',
      timeLeft: '1 week',
      difficulty: 'Easy'
    }
  ];

  const achievements = mockAchievements;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Gamification Hub</h1>
        <p className="text-yellow-100 text-lg">Unlock achievements, complete challenges, and climb the leaderboard</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-ocean-600 dark:text-ocean-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl ${
                achievement.unlocked
                  ? 'border-2 border-green-300 dark:border-green-600'
                  : 'opacity-75'
              }`}
            >
              <div className="text-center">
                <div className={`text-6xl mb-4 ${
                  achievement.unlocked ? 'grayscale-0' : 'grayscale'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {achievement.description}
                </p>
                
                {achievement.unlocked ? (
                  <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Unlocked
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Locked
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mr-3">
                      {challenge.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{challenge.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reward</div>
                  <div className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                    {challenge.reward}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {challenge.timeLeft} left
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all">
                Start Challenge
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Global Leaderboard</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-ocean-100 dark:bg-ocean-900 text-ocean-700 dark:text-ocean-300 rounded-lg text-sm font-medium">
                This Month
              </button>
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                All Time
              </button>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="flex items-end justify-center space-x-4 mb-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                2
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-8 rounded-t-lg">
                <div className="text-2xl mb-2">👩‍💼</div>
                <div className="font-semibold text-gray-900 dark:text-white">Priya S.</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2,456 pts</div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
                1
              </div>
              <div className="bg-gradient-to-t from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800 px-4 py-12 rounded-t-lg">
                <div className="text-3xl mb-2">👨‍🌾</div>
                <div className="font-bold text-gray-900 dark:text-white">Arjun P.</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2,847 pts</div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                3
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 px-4 py-6 rounded-t-lg">
                <div className="text-2xl mb-2">👨‍🔬</div>
                <div className="font-semibold text-gray-900 dark:text-white">Rohit K.</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">2,234 pts</div>
              </div>
            </div>
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-2">
            {[
              { rank: 4, name: 'Anita Singh', points: 2156, avatar: '👩‍🎨' },
              { rank: 5, name: 'Vikram Rao', points: 1987, avatar: '👨‍💻' },
              { rank: 6, name: 'Meera Gupta', points: 1876, avatar: '👩‍⚕️' },
              { rank: 7, name: 'Karan Mehta', points: 1654, avatar: '👨‍🎓' },
              { rank: 8, name: 'Sneha Joshi', points: 1543, avatar: '👩‍🏫' },
              { rank: 9, name: 'Rajesh Iyer', points: 1432, avatar: '👨‍⚡' },
              { rank: 10, name: 'Kavya Nair', points: 1247, avatar: '👩‍🚀' },
            ].map((user) => (
              <div
                key={user.rank}
                className={`flex items-center p-4 rounded-lg transition-all ${
                  user.rank === 10 
                    ? 'bg-gradient-to-r from-ocean-50 to-wave-50 dark:from-ocean-900 dark:to-wave-900 border-2 border-ocean-300 dark:border-ocean-600'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400 mr-4">
                  {user.rank}
                </div>
                <div className="text-2xl mr-4">{user.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {user.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}