import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, Paperclip, Bot, User, Volume2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your AI environmental assistant. I can help you with beach cleanup guidance, waste identification, safety tips, and answer any questions about marine conservation. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { text: "How to segregate waste?", icon: "🗂️" },
    { text: "Safety guidelines for beach cleanup", icon: "⚠️" },
    { text: "Identify this waste item", icon: "🔍" },
    { text: "Find events near me", icon: "📍" },
    { text: "Environmental impact tips", icon: "🌱" },
    { text: "Team coordination help", icon: "👥" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "how to segregate waste": "Great question! Here's how to properly segregate waste during beach cleanups:\n\n🔴 **Non-Recyclable Plastics**: Food wrappers, multilayer packaging, dirty plastic bags\n🟡 **Recyclable Plastics**: Clean bottles, containers, caps (remove labels when possible)\n🟢 **Organic Waste**: Seaweed, food scraps, biodegradable items\n🔵 **Glass & Metal**: Bottles, cans, metal debris\n⚫ **Hazardous**: Batteries, chemicals, medical waste (handle with extra care)\n\nAlways wear gloves and use pickup tools for safety!",
        
        "safety guidelines": "Safety first! Here are essential guidelines for beach cleanup:\n\n⚠️ **Personal Protection**:\n• Wear closed-toe shoes and gloves\n• Use sun protection (hat, sunscreen)\n• Stay hydrated\n\n🚨 **Hazard Awareness**:\n• Never touch sharp objects directly\n• Avoid handling unknown chemicals\n• Watch for marine life and nesting areas\n• Be cautious of tides and currents\n\n🏥 **Emergency Preparedness**:\n• Carry a first aid kit\n• Have emergency contacts ready\n• Work in pairs or groups\n• Know the location of nearest medical facility",
        
        "identify waste": "I can help identify waste items! Here's what to look for:\n\n🔍 **Common Beach Waste**:\n• Plastic bottles (15 points each)\n• Food wrappers (8 points each)\n• Cigarette butts (5 points each)\n• Fishing nets and lines\n• Glass bottles and fragments\n\n📱 **Using AI Detection**:\n1. Open the Live Cleanup camera\n2. Point at the waste item\n3. Wait for automatic identification\n4. Confirm the classification\n\nFor unusual items, take a photo and I'll help identify it!",
        
        "find events": "I can help you find cleanup events! Here are ways to discover events:\n\n📍 **Near You**:\n• Check the Events page for nearby cleanups\n• Use location filters for distance\n• View events on the interactive map\n\n📅 **Upcoming Events**:\n• Juhu Beach - Tomorrow 7:00 AM\n• Versova Beach - This Saturday 6:30 AM\n• Marine Drive - Next Sunday 8:00 AM\n\n🔔 **Stay Updated**:\n• Enable notifications for new events\n• Follow your favorite organizers\n• Join community groups in your area",
        
        "environmental impact": "Every action counts! Here are impactful tips:\n\n🌊 **Beach Conservation**:\n• Remove 1kg of waste = Save ~10 marine animals\n• Proper disposal prevents ocean microplastics\n• Clean beaches boost local tourism\n\n♻️ **Sustainable Practices**:\n• Use reusable water bottles and bags\n• Choose biodegradable products\n• Support eco-friendly businesses\n\n📊 **Track Your Impact**:\n• Monitor your cleanup statistics\n• Share achievements to inspire others\n• Calculate your carbon footprint reduction\n\nYour efforts contribute to protecting marine ecosystems!",
        
        "team coordination": "Great teamwork makes cleanups more effective! Here's how to coordinate:\n\n👥 **Team Organization**:\n• Assign roles: collectors, sorters, photographers\n• Set meeting points and safety protocols\n• Use group chat for real-time updates\n\n📋 **Planning Tools**:\n• Create shared equipment lists\n• Coordinate transportation\n• Plan post-cleanup activities\n\n🎯 **Motivation Tips**:\n• Set team goals and challenges\n• Celebrate achievements together\n• Share progress on social media\n• Organize friendly competitions\n\nRemember: teamwork makes the dream work! 🌊"
      };

      const responseKey = Object.keys(responses).find(key => 
        content.toLowerCase().includes(key)
      );

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responseKey ? responses[responseKey as keyof typeof responses] : 
          `I understand you're asking about "${content}". While I don't have specific information on that topic right now, I can help you with:\n\n• Beach cleanup safety and techniques\n• Waste identification and sorting\n• Environmental impact information\n• Event discovery and planning\n• Team coordination tips\n\nFeel free to ask about any of these topics, or try one of the quick action buttons below!`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      handleSendMessage("What are the best practices for organizing a beach cleanup event?");
    }, 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-ocean-50 to-wave-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-ocean-500 to-wave-500 rounded-full flex items-center justify-center mr-4">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Environmental Assistant</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Always here to help with your cleanup questions</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-ocean-500' 
                    : 'bg-gradient-to-r from-green-500 to-teal-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className={`px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-ocean-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' 
                    ? 'text-ocean-100' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex mr-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.text)}
              className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <Image className="h-5 w-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              placeholder="Ask me anything about beach cleanup..."
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-ocean-500 focus:border-transparent dark:text-white"
            />
          </div>

          <button
            onClick={simulateVoiceRecording}
            className={`p-3 rounded-full transition-all ${
              isRecording
                ? 'bg-red-500 animate-pulse'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Mic className={`h-5 w-5 ${isRecording ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
          </button>

          <button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim()}
            className="p-3 bg-ocean-500 hover:bg-ocean-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}