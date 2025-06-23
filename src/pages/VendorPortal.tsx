import React, { useState } from 'react';
import { QrCode, IndianRupee, TrendingUp, Users, Calendar, Smartphone } from 'lucide-react';

export default function VendorPortal() {
  const [isScanning, setIsScanning] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<any>(null);

  const stats = [
    { label: 'Monthly Revenue', value: '₹45,250', change: '+12%', color: 'text-green-600' },
    { label: 'Vouchers Redeemed', value: '287', change: '+8%', color: 'text-blue-600' },
    { label: 'Active Customers', value: '156', change: '+15%', color: 'text-purple-600' },
    { label: 'Commission Earned', value: '₹4,525', change: '+12%', color: 'text-orange-600' },
  ];

  const recentTransactions = [
    { id: 1, customer: 'Kavya N.', amount: 25, type: 'Food', time: '2 mins ago', status: 'completed' },
    { id: 2, customer: 'Arjun P.', amount: 50, type: 'Shopping', time: '15 mins ago', status: 'completed' },
    { id: 3, customer: 'Priya S.', amount: 10, type: 'Beverages', time: '1 hour ago', status: 'completed' },
    { id: 4, customer: 'Rohit K.', amount: 25, type: 'Food', time: '2 hours ago', status: 'pending' },
  ];

  const simulateQRScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const transaction = {
        customer: 'Meera G.',
        amount: 30,
        type: 'Food & Beverages',
        points: 450,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setLastTransaction(transaction);
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Vendor Partnership Portal</h1>
        <p className="text-green-100 text-lg">Manage voucher redemptions and track your eco-business impact</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* QR Scanner */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Voucher Redemption Scanner
            </h2>
            
            <div className="text-center">
              <div className={`w-64 h-64 mx-auto mb-6 rounded-2xl border-4 border-dashed transition-all ${
                isScanning 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900' 
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
              } flex items-center justify-center`}>
                {isScanning ? (
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-green-700 dark:text-green-300 font-medium">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Tap to scan voucher QR code</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={simulateQRScan}
                disabled={isScanning}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  isScanning
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105'
                }`}
              >
                {isScanning ? 'Scanning...' : 'Start QR Scan'}
              </button>
            </div>

            {/* Transaction Result */}
            {lastTransaction && (
              <div className="mt-6 p-6 bg-green-50 dark:bg-green-900 rounded-xl border border-green-200 dark:border-green-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-200">
                    Transaction Successful!
                  </h3>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {lastTransaction.timestamp}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-medium">Customer:</span>
                    <p className="text-green-800 dark:text-green-200">{lastTransaction.customer}</p>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-medium">Amount:</span>
                    <p className="text-green-800 dark:text-green-200 font-bold">₹{lastTransaction.amount}</p>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-medium">Category:</span>
                    <p className="text-green-800 dark:text-green-200">{lastTransaction.type}</p>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-medium">Customer Points:</span>
                    <p className="text-green-800 dark:text-green-200">{lastTransaction.points} pts</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-sm text-center">
                    💳 Payment processed via UPI • Transaction ID: #TXN{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Customer Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Customer Analytics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">156</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Active Customers</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">₹289</div>
                <div className="text-sm text-green-600 dark:text-green-400">Avg. Transaction</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">4.2</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Visits/Month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Transactions
            </h3>
            
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {transaction.customer}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {transaction.type} • {transaction.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ₹{transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commission Tracker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Commission Tracker
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">This Month</span>
                <span className="font-bold text-green-600 dark:text-green-400">₹4,525</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                75% of monthly target (₹6,000)
              </div>
            </div>
          </div>

          {/* Onboarding */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
              Invite New Vendors
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
              Earn ₹500 for each successful vendor referral
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Share Referral Link
            </button>
          </div>

          {/* Mobile App Promo */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl p-6">
            <div className="text-center">
              <Smartphone className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">
                Get the Mobile App
              </h3>
              <p className="text-purple-700 dark:text-purple-300 text-sm mb-4">
                Faster scanning, offline mode, and instant notifications
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}