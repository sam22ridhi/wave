import React, { useState, useEffect } from 'react';
import { Camera, Target, Award, TrendingUp, RefreshCw, MessageCircle } from 'lucide-react';
import { mockWasteTypes } from '../data/mockData';

export default function LiveCleanup() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedWaste, setDetectedWaste] = useState<any>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [itemsDetected, setItemsDetected] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const simulateWasteDetection = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const randomWaste = mockWasteTypes[Math.floor(Math.random() * mockWasteTypes.length)];
      setDetectedWaste(randomWaste);
      setTotalPoints(prev => prev + randomWaste.points);
      setItemsDetected(prev => prev + 1);
      setIsScanning(false);
      
      // Clear detection after 3 seconds
      setTimeout(() => {
        setDetectedWaste(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Mobile-style header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-sm opacity-75">Session Time</div>
            <div className="text-lg font-bold">{formatTime(sessionTime)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm opacity-75">Items Found</div>
            <div className="text-lg font-bold">{itemsDetected}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">Points</div>
            <div className="text-lg font-bold text-ocean-400">{totalPoints}</div>
          </div>
        </div>
      </div>

      {/* Camera viewfinder simulation */}
      <div className="relative h-screen bg-gradient-to-b from-blue-900 via-teal-800 to-green-800">
        {/* Background pattern to simulate camera view */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M20%2020c0%2011.046-8.954%2020-20%2020v20h40V20H20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <RefreshCw className="h-12 w-12 text-white animate-spin" />
            </div>
          </div>
        )}

        {/* Detection result */}
        {detectedWaste && (
          <div className="absolute inset-0 z-15">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-green-400 animate-bounce-slow">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">{detectedWaste.type}</h3>
                <div className="text-3xl font-bold text-yellow-400">+{detectedWaste.points} points</div>
              </div>
            </div>
            
            {/* Bounding box simulation */}
            <div className="absolute top-1/3 left-1/4 w-1/2 h-1/3 border-2 border-green-400 rounded-lg animate-pulse">
              <div className="absolute -top-6 left-0 bg-green-400 text-black px-2 py-1 rounded text-sm font-bold">
                {detectedWaste.type}
              </div>
            </div>
          </div>
        )}

        {/* Viewfinder overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner markers */}
          <div className="absolute top-20 left-8 w-8 h-8 border-l-2 border-t-2 border-white opacity-50"></div>
          <div className="absolute top-20 right-8 w-8 h-8 border-r-2 border-t-2 border-white opacity-50"></div>
          <div className="absolute bottom-32 left-8 w-8 h-8 border-l-2 border-b-2 border-white opacity-50"></div>
          <div className="absolute bottom-32 right-8 w-8 h-8 border-r-2 border-b-2 border-white opacity-50"></div>
          
          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Target className="h-8 w-8 text-white opacity-50" />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex items-center justify-center space-x-8 mb-6">
          {/* Scan button */}
          <button
            onClick={simulateWasteDetection}
            disabled={isScanning}
            className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
              isScanning
                ? 'bg-blue-500 border-blue-400 animate-pulse'
                : 'bg-ocean-500 hover:bg-ocean-600 hover:scale-110'
            }`}
          >
            <Camera className="h-8 w-8 text-white" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Cleanup Progress</span>
            <span>{itemsDetected}/25 items</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-ocean-400 to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(itemsDetected / 25) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
            <Award className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{totalPoints}</div>
            <div className="text-xs opacity-75">Points</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{itemsDetected}</div>
            <div className="text-xs opacity-75">Items</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
            <Target className="h-6 w-6 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold">92%</div>
            <div className="text-xs opacity-75">Accuracy</div>
          </div>
        </div>
      </div>

      {/* AI Assistant chat bubble */}
      <div className="absolute bottom-32 right-4 z-30">
        <div className="bg-ocean-500 hover:bg-ocean-600 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-110 transition-all">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Instructions overlay for first-time users */}
      {itemsDetected === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 max-w-sm">
            <h3 className="text-xl font-bold mb-2">Ready to Clean? 🌊</h3>
            <p className="text-sm opacity-90 mb-4">
              Point your camera at waste items on the beach. Our AI will automatically detect and classify them!
            </p>
            <div className="animate-bounce">
              <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}