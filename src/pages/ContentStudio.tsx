import React, { useState } from 'react';
import { Mic, Image, Share2, Download, Wand2, Play, Pause } from 'lucide-react';

export default function ContentStudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [generatedContent, setGeneratedContent] = useState('');

  const templates = [
    { id: 1, name: 'Event Announcement', type: 'Instagram Post', preview: '🌊 Join our beach cleanup!' },
    { id: 2, name: 'Impact Report', type: 'LinkedIn Article', preview: 'This month we collected...' },
    { id: 3, name: 'Volunteer Thank You', type: 'Story Template', preview: 'Thank you volunteers!' },
    { id: 4, name: 'Before/After', type: 'Comparison Post', preview: 'See the transformation!' },
  ];

  const simulateRecording = () => {
    setIsRecording(true);
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    setTimeout(() => {
      setIsRecording(false);
      setRecordingTime(0);
      clearInterval(timer);
      setGeneratedContent(
        '🌊 Amazing beach cleanup at Juhu today! Our volunteers collected over 200kg of waste, including 150 plastic bottles and 75 food wrappers. The before and after photos show the incredible transformation! Thank you to all 45 volunteers who made this possible. Together, we\'re making Mumbai\'s beaches cleaner and protecting our marine ecosystem. 🐠🌴 #BeachCleanup #Mumbai #Environment #Sustainability'
      );
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">AI Content Studio</h1>
        <p className="text-purple-100 text-lg">Create compelling content to amplify your environmental impact</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Voice Input & Generation */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Voice-to-Content Generator
            </h2>
            
            {/* Recording Interface */}
            <div className="text-center mb-6">
              <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              }`}>
                <button
                  onClick={simulateRecording}
                  disabled={isRecording}
                  className="w-full h-full flex items-center justify-center"
                >
                  {isRecording ? (
                    <div className="text-center">
                      <div className="w-6 h-6 bg-white rounded-full mx-auto mb-2"></div>
                      <div className="text-white text-sm font-bold">{formatTime(recordingTime)}</div>
                    </div>
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isRecording ? 'Recording...' : 'Tap to Record'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {isRecording 
                  ? 'Describe your cleanup event, achievements, or any environmental story'
                  : 'Tell us about your event and we\'ll create engaging social media content'
                }
              </p>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Generated Content</h4>
                  <Wand2 className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {generatedContent}
                </p>
                
                <div className="flex space-x-2 mt-4">
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
                    <Share2 className="h-4 w-4 inline mr-2" />
                    Share
                  </button>
                  <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
                    <Download className="h-4 w-4 inline mr-2" />
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* Content Customization */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                  <option>Facebook</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option>Inspiring</option>
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Educational</option>
                </select>
              </div>
            </div>
          </div>

          {/* Before/After Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Before/After Comparison
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="aspect-square bg-gradient-to-br from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                    <p className="text-sm text-red-700 dark:text-red-300">Before Cleanup</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="aspect-square bg-gradient-to-br from-green-200 to-teal-200 dark:from-green-800 dark:to-teal-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-green-700 dark:text-green-300">After Cleanup</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-lg font-semibold transition-all">
              Generate Comparison Post
            </button>
          </div>
        </div>

        {/* Templates & Preview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Content Templates
            </h2>
            
            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{template.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{template.type}</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-sm font-medium">
                      Use Template
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{template.preview}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Guidelines Checker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Brand Guidelines Check
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Logo Usage</span>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Color Palette</span>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Hashtag Guidelines</span>
                <span className="text-yellow-600 dark:text-yellow-400">!</span>
              </div>
            </div>
          </div>

          {/* Publishing Queue */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Publishing Queue
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Beach Cleanup Announcement</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Scheduled for tomorrow 9:00 AM</p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                  <Play className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Impact Report - January</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Draft saved</p>
                </div>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  <Pause className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}