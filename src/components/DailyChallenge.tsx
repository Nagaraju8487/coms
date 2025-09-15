import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Target, Clock, CheckCircle } from 'lucide-react';

interface Challenge {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'speaking' | 'writing' | 'listening';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number; // in minutes
  prompt: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    date: new Date().toDateString(),
    title: 'Elevator Pitch Challenge',
    description: 'Create a compelling 30-second introduction about yourself',
    type: 'speaking',
    difficulty: 'Easy',
    timeLimit: 1,
    prompt: 'Imagine you\'re in an elevator with your dream employer. You have 30 seconds to make a great first impression. What do you say?'
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toDateString(),
    title: 'Persuasive Writing',
    description: 'Write a convincing argument for a cause you care about',
    type: 'writing',
    difficulty: 'Medium',
    timeLimit: 5,
    prompt: 'Choose a cause or issue you\'re passionate about. Write a 200-word persuasive piece that could convince someone to support your viewpoint.'
  },
  {
    id: 3,
    date: new Date(Date.now() - 172800000).toDateString(),
    title: 'Impromptu Storytelling',
    description: 'Tell a compelling story based on a random word',
    type: 'speaking',
    difficulty: 'Hard',
    timeLimit: 3,
    prompt: 'Tell a 2-minute story that includes the word "serendipity". Your story should have a clear beginning, middle, and end.'
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'speaking': return 'bg-blue-100 text-blue-800';
    case 'writing': return 'bg-green-100 text-green-800';
    case 'listening': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-100 text-green-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function DailyChallenge() {
  const [todaysChallenge] = useState<Challenge>(challenges[0]);
  const [userResponse, setUserResponse] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('challenge-streak') || '0');
  });
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const saved = localStorage.getItem('completed-challenges');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    const todayCompleted = completedChallenges.includes(todaysChallenge.date);
    setIsCompleted(todayCompleted);
  }, [completedChallenges, todaysChallenge.date]);

  const startChallenge = () => {
    setTimer(0);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const completeChallenge = () => {
    if (userResponse.trim()) {
      const newCompletedChallenges = [...completedChallenges, todaysChallenge.date];
      setCompletedChallenges(newCompletedChallenges);
      localStorage.setItem('completed-challenges', JSON.stringify(newCompletedChallenges));
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('challenge-streak', newStreak.toString());
      
      setIsCompleted(true);
      setIsTimerRunning(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeRemaining = () => {
    const timeLimit = todaysChallenge.timeLimit * 60;
    const remaining = Math.max(0, timeLimit - timer);
    return formatTime(remaining);
  };

  const isTimeUp = timer >= todaysChallenge.timeLimit * 60;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Daily Communication Challenge</h1>
        <p className="text-gray-600 text-lg">Improve your skills with daily practice challenges</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedChallenges.length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((completedChallenges.length / challenges.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Challenge */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{todaysChallenge.title}</h2>
              <p className="text-sm text-gray-600">{todaysChallenge.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(todaysChallenge.type)}`}>
              {todaysChallenge.type}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(todaysChallenge.difficulty)}`}>
              {todaysChallenge.difficulty}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{todaysChallenge.description}</p>

        {/* Challenge Prompt */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Today's Challenge:</h3>
          <p className="text-gray-700">{todaysChallenge.prompt}</p>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${isTimeUp ? 'text-red-600' : 'text-gray-900'}`}>
              {isTimerRunning ? getTimeRemaining() : formatTime(todaysChallenge.timeLimit * 60)}
            </div>
            <div className="text-sm text-gray-600">
              {isTimerRunning ? 'Time Remaining' : `${todaysChallenge.timeLimit} Minute${todaysChallenge.timeLimit > 1 ? 's' : ''} Available`}
            </div>
            {isTimeUp && (
              <div className="text-red-600 font-medium mt-2">Time's up!</div>
            )}
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={isTimerRunning ? pauseTimer : startChallenge}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              isTimerRunning
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isTimerRunning ? 'Pause Timer' : 'Start Challenge'}
          </button>

          <button
            onClick={resetTimer}
            disabled={isCompleted}
            className="px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>

        {/* Response Area */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Your Response:</label>
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            disabled={isCompleted}
            placeholder={`${todaysChallenge.type === 'writing' ? 'Write' : 'Type notes about'} your response here...`}
            className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        {/* Complete Button */}
        {!isCompleted && (
          <div className="mt-6 text-center">
            <button
              onClick={completeChallenge}
              disabled={!userResponse.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Complete Challenge
            </button>
          </div>
        )}

        {/* Completed State */}
        {isCompleted && (
          <div className="mt-6 bg-green-50 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800">Challenge Completed! 🎉</h3>
            <p className="text-green-700 text-sm">Great job! Come back tomorrow for your next challenge.</p>
          </div>
        )}
      </div>

      {/* Challenge History */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Challenges</h3>
        <div className="space-y-4">
          {challenges.slice(1).map((challenge) => {
            const isChallengeDone = completedChallenges.includes(challenge.date);
            return (
              <div key={challenge.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isChallengeDone ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                    <p className="text-sm text-gray-600">{challenge.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                    {challenge.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}