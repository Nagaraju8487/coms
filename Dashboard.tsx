import React from 'react';
import { AppView } from '../App';
import { 
  MessageSquare, 
  Mic, 
  Timer, 
  Calendar, 
  Users, 
  Zap, 
  Mail,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const features = [
  {
    id: 'conversation' as AppView,
    title: 'Conversation Simulator',
    description: 'Practice interviews and discussions with AI feedback',
    icon: MessageSquare,
    color: 'from-blue-500 to-indigo-600',
    stats: 'Practice scenarios'
  },
  {
    id: 'pronunciation' as AppView,
    title: 'Pronunciation Trainer',
    description: 'Improve your pronunciation with speech recognition',
    icon: Mic,
    color: 'from-green-500 to-emerald-600',
    stats: 'Speech accuracy'
  },
  {
    id: 'speaking-timer' as AppView,
    title: 'Speaking Timer',
    description: 'Time your speeches and get pacing feedback',
    icon: Timer,
    color: 'from-orange-500 to-red-600',
    stats: 'Timing practice'
  },
  {
    id: 'daily-challenge' as AppView,
    title: 'Daily Challenge',
    description: 'New communication challenges every day',
    icon: Calendar,
    color: 'from-purple-500 to-pink-600',
    stats: 'Daily streaks'
  },
  {
    id: 'body-language' as AppView,
    title: 'Body Language Guide',
    description: 'Learn non-verbal communication skills',
    icon: Users,
    color: 'from-teal-500 to-cyan-600',
    stats: 'Interactive guides'
  },
  {
    id: 'impromptu-speech' as AppView,
    title: 'Impromptu Speech',
    description: 'Practice spontaneous speaking with random topics',
    icon: Zap,
    color: 'from-yellow-500 to-orange-600',
    stats: 'Quick thinking'
  },
  {
    id: 'email-tone' as AppView,
    title: 'Email Tone Improver',
    description: 'Get feedback on your written communication',
    icon: Mail,
    color: 'from-indigo-500 to-purple-600',
    stats: 'Tone analysis'
  }
];

const stats = [
  { label: 'Practice Sessions', value: '124', icon: Target, change: '+12%' },
  { label: 'Skills Improved', value: '7', icon: TrendingUp, change: '+2' },
  { label: 'Achievements', value: '15', icon: Award, change: '+3' }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CommSkills
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Master the art of communication with our comprehensive training platform
        </p>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} this week</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {feature.stats}
                </span>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <span className="text-gray-600 group-hover:text-blue-600">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Tips Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Daily Communication Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Practice Active Listening</h3>
            <p className="text-gray-600 text-sm">
              Focus on understanding before being understood. Ask clarifying questions and summarize what you've heard.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Reduce Filler Words</h3>
            <p className="text-gray-600 text-sm">
              Replace "um," "ah," and "like" with purposeful pauses. This makes your speech more confident and clear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}