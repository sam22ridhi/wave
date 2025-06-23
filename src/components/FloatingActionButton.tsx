import React, { useState } from 'react';
import { Plus, Camera, Calendar, MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Camera, label: 'Start Cleanup', path: '/cleanup', color: 'bg-green-500' },
    { icon: Calendar, label: 'Find Events', path: '/events', color: 'bg-blue-500' },
    { icon: MessageCircle, label: 'Ask AI', path: '/assistant', color: 'bg-purple-500' },
  ];

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-8 z-40">
      {/* Action buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-float`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-ocean-500 to-wave-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6 animate-spin" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}