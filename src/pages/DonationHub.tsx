import React, { useState } from 'react';
import { Heart, Target, Users, Calendar, MapPin, IndianRupee, TrendingUp, Award, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function DonationHub() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'my-donations'>('browse');
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedDrive, setSelectedDrive] = useState<any>(null);

  const donationDrives = [
    {
      id: 1,
      title: 'Mumbai Beach Restoration Project',
      organizer: 'Marine Conservation Society',
      verified: true,
      description: 'Large-scale restoration of Juhu and Versova beaches with advanced cleanup equipment and community programs.',
      target: 500000,
      raised: 347500,
      donors: 234,
      daysLeft: 15,
      category: 'Equipment',
      image: '🏖️',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Plastic-Free Coastal Initiative',
      organizer: 'EcoWarriors Mumbai',
      verified: true,
      description: 'Educational programs and cleanup drives to eliminate single-use plastics from Mumbai coastline.',
      target: 250000,
      raised: 189750,
      donors: 156,
      daysLeft: 8,
      category: 'Education',
      image: '♻️',
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'Marine Life Protection Fund',
      organizer: 'Ocean Guardians',
      verified: true,
      description: 'Protecting sea turtle nesting sites and marine biodiversity through scientific research and conservation.',
      target: 750000,
      raised: 423000,
      donors: 312,
      daysLeft: 22,
      category: 'Research',
      image: '🐢',
      urgency: 'low'
    },
    {
      id: 4,
      title: 'Community Cleanup Equipment',
      organizer: 'Green Mumbai Initiative',
      verified: true,
      description: 'Purchase advanced cleanup tools, safety equipment, and waste sorting facilities for volunteer groups.',
      target: 150000,
      raised: 98500,
      donors: 89,
      daysLeft: 12,
      category: 'Equipment',
      image: '🛠️',
      urgency: 'high'
    }
  ];

  const myDonations = [
    { id: 1, drive: 'Mumbai Beach Restoration Project', amount: 2500, date: '2024-01-10', status: 'completed' },
    { id: 2, drive: 'Plastic-Free Coastal Initiative', amount: 1000, date: '2024-01-08', status: 'completed' },
    { id: 3, drive: 'Marine Life Protection Fund', amount: 5000, date: '2024-01-05', status: 'completed' },
  ];

  const handleDonate = (drive: any) => {
    setSelectedDrive(drive);
  };

  const processDonation = () => {
    if (!donationAmount || !selectedDrive) return;
    
    // Simulate payment processing
    alert(`Thank you for donating ₹${donationAmount} to ${selectedDrive.title}!`);
    setSelectedDrive(null);
    setDonationAmount('');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Donation Hub</h1>
        <p className="text-pink-100 text-lg">Support verified environmental initiatives and make a lasting impact</p>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'browse', label: 'Browse Drives', icon: Heart },
            { id: 'create', label: 'Create Drive', icon: Target },
            { id: 'my-donations', label: 'My Donations', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                disabled={tab.id === 'create' && (!user || user.role !== 'organizer')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-pink-600 dark:text-pink-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Browse Drives */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {donationDrives.map((drive) => (
            <div key={drive.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{drive.image}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{drive.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{drive.organizer}</span>
                        {drive.verified && (
                          <div className="flex items-center ml-2">
                            <Shield className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(drive.urgency)}`}>
                    {drive.urgency} priority
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{drive.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{drive.raised.toLocaleString()} / ₹{drive.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(drive.raised / drive.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>{Math.round((drive.raised / drive.target) * 100)}% funded</span>
                    <span>{drive.daysLeft} days left</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    {drive.donors} donors
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    drive.category === 'Equipment' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                    drive.category === 'Education' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  }`}>
                    {drive.category}
                  </span>
                </div>

                <button
                  onClick={() => handleDonate(drive)}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Drive */}
      {activeTab === 'create' && user?.role === 'organizer' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Donation Drive</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Drive Title
                </label>
                <input
                  type="text"
                  placeholder="Enter drive title"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="500000"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option>Equipment</option>
                  <option>Education</option>
                  <option>Research</option>
                  <option>Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe your donation drive and how funds will be used..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fund Usage Plan
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed breakdown of how funds will be utilized..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Verification Required</p>
                <p>As a verified organizer, your donation drives are automatically approved and display the verification badge for donor trust.</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-lg font-semibold transition-all">
            Create Donation Drive
          </button>
        </div>
      )}

      {/* My Donations */}
      {activeTab === 'my-donations' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Donation History</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">₹8,500</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Total Donated</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">3</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Drives Supported</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">12%</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Impact Growth</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {myDonations.map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{donation.drive}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{donation.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">₹{donation.amount.toLocaleString()}</p>
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {selectedDrive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Donate to {selectedDrive.title}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex space-x-2">
                {[500, 1000, 2500, 5000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount.toString())}
                    className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-pink-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Tax Benefit:</strong> Your donation is eligible for 80G tax deduction.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedDrive(null)}
                  className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processDonation}
                  disabled={!donationAmount}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}