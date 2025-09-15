import React from 'react';
import { AppView } from '../App';
import { 
  Home, 
  MessageSquare, 
  Mic, 
  Timer, 
  Calendar, 
  Users, 
  Zap, 
  Mail 
} from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const navItems = [
  { id: 'dashboard' as AppView, label: 'Dashboard', icon: Home },
  { id: 'conversation' as AppView, label: 'Conversation', icon: MessageSquare },
  { id: 'pronunciation' as AppView, label: 'Pronunciation', icon: Mic },
  { id: 'speaking-timer' as AppView, label: 'Speaking Timer', icon: Timer },
  { id: 'daily-challenge' as AppView, label: 'Daily Challenge', icon: Calendar },
  { id: 'body-language' as AppView, label: 'Body Language', icon: Users },
  { id: 'impromptu-speech' as AppView, label: 'Impromptu Speech', icon: Zap },
  { id: 'email-tone' as AppView, label: 'Email Tone', icon: Mail },
];

export function Navigation({ currentView, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">CommSkills</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu - simplified for demo */}
          <div className="md:hidden">
            <select 
              value={currentView} 
              onChange={(e) => onNavigate(e.target.value as AppView)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}