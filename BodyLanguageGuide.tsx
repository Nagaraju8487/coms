import React, { useState } from 'react';
import { Users, Eye, Hand, UserCheck, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface BodyLanguageTip {
  id: number;
  category: string;
  title: string;
  description: string;
  dos: string[];
  donts: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const bodyLanguageTips: BodyLanguageTip[] = [
  {
    id: 1,
    category: 'Eye Contact',
    title: 'Effective Eye Contact',
    description: 'Proper eye contact builds trust and shows confidence while speaking or listening.',
    dos: [
      'Maintain eye contact for 3-5 seconds at a time',
      'Look at the person when they start speaking',
      'Make eye contact when making important points',
      'Look away briefly to avoid staring'
    ],
    donts: [
      'Avoid staring intensely without breaks',
      'Don\'t look down or away when being addressed',
      'Don\'t look at your phone or other distractions',
      'Avoid darting eyes around the room'
    ],
    icon: Eye,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    category: 'Posture',
    title: 'Confident Posture',
    description: 'Your posture communicates confidence, openness, and professionalism.',
    dos: [
      'Stand tall with shoulders back',
      'Keep your head level and chin parallel to floor',
      'Distribute weight evenly on both feet',
      'Sit up straight in chairs'
    ],
    donts: [
      'Don\'t slouch or hunch your shoulders',
      'Avoid crossing arms defensively',
      'Don\'t lean too far forward or backward',
      'Avoid fidgeting or swaying'
    ],
    icon: UserCheck,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 3,
    category: 'Hand Gestures',
    title: 'Purposeful Gestures',
    description: 'Hand gestures can enhance your message when used appropriately and naturally.',
    dos: [
      'Use open palm gestures to appear honest',
      'Keep gestures within the "box" from shoulders to waist',
      'Match gestures to your words naturally',
      'Use gestures to emphasize key points'
    ],
    donts: [
      'Don\'t point directly at people',
      'Avoid excessive or distracting movements',
      'Don\'t keep hands in pockets constantly',
      'Don\'t use closed fist gestures unless necessary'
    ],
    icon: Hand,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 4,
    category: 'Facial Expression',
    title: 'Expressive Face',
    description: 'Your facial expressions should match your message and engage your audience.',
    dos: [
      'Smile genuinely when appropriate',
      'Show engagement through facial expressions',
      'Match your expression to your content',
      'Use eyebrow movements for emphasis'
    ],
    donts: [
      'Don\'t maintain a blank or stern expression',
      'Avoid fake or forced smiles',
      'Don\'t let expressions contradict your words',
      'Don\'t grimace or frown unintentionally'
    ],
    icon: Users,
    color: 'from-purple-500 to-pink-600'
  }
];

export function BodyLanguageGuide() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const currentTip = bodyLanguageTips[currentTipIndex];
  const Icon = currentTip.icon;

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % bodyLanguageTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + bodyLanguageTips.length) % bodyLanguageTips.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Body Language Guide</h1>
        <p className="text-gray-600 text-lg">Master non-verbal communication for better impact</p>
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-center space-x-2 mb-8">
        {bodyLanguageTips.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTipIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentTipIndex
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        {/* Header */}
        <div className={`bg-gradient-to-r ${currentTip.color} p-8 text-white`}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-medium opacity-90">{currentTip.category}</div>
              <h2 className="text-3xl font-bold">{currentTip.title}</h2>
            </div>
          </div>
          <p className="mt-4 text-lg opacity-90">{currentTip.description}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do's */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Do's</h3>
              </div>
              <div className="space-y-3">
                {currentTip.dos.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-green-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900">Don'ts</h3>
              </div>
              <div className="space-y-3">
                {currentTip.donts.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-red-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={prevTip}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{currentTipIndex + 1} of {bodyLanguageTips.length}</span>
          </div>

          <button
            onClick={nextTip}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Practice Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Mirror Practice</h4>
            <p className="text-sm text-gray-600">Practice in front of a mirror to see your body language</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Video Recording</h4>
            <p className="text-sm text-gray-600">Record yourself to review your non-verbal communication</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Ask for Feedback</h4>
            <p className="text-sm text-gray-600">Get input from friends about your body language</p>
          </div>
        </div>
      </div>
    </div>
  );
}