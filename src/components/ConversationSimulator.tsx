import React, { useState, useEffect } from 'react';
import { MessageSquare, Play, Pause, RotateCcw, Mic, MicOff } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  tips: string[];
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Interview',
    question: 'Tell me about yourself.',
    tips: ['Keep it professional and relevant', 'Structure: Present → Past → Future', 'Highlight key achievements']
  },
  {
    id: 2,
    category: 'Interview',
    question: 'What are your greatest strengths?',
    tips: ['Choose strengths relevant to the role', 'Provide specific examples', 'Connect to business value']
  },
  {
    id: 3,
    category: 'Small Talk',
    question: 'How was your weekend?',
    tips: ['Keep it brief and positive', 'Ask a follow-up question', 'Find common interests']
  },
  {
    id: 4,
    category: 'Group Discussion',
    question: 'What do you think about remote work?',
    tips: ['Present both sides of the argument', 'Use personal experience if relevant', 'Acknowledge other viewpoints']
  }
];

const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally'];

export function ConversationSimulator() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [userResponse, setUserResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<{
    wordCount: number;
    fillerCount: number;
    fillerWords: string[];
    estimatedTime: number;
  } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const analyzeResponse = (text: string) => {
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const detectedFillers = words.filter(word => 
      fillerWords.some(filler => word.includes(filler))
    );
    
    return {
      wordCount: words.length,
      fillerCount: detectedFillers.length,
      fillerWords: [...new Set(detectedFillers)],
      estimatedTime: Math.ceil(words.length / 2.5) // ~150 WPM average
    };
  };

  const handleResponseChange = (text: string) => {
    setUserResponse(text);
    if (text.trim()) {
      setAnalysis(analyzeResponse(text));
    } else {
      setAnalysis(null);
    }
  };

  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserResponse('');
    setAnalysis(null);
    resetTimer();
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      pauseTimer();
    } else {
      setIsRecording(true);
      startTimer();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Conversation Simulator</h1>
        <p className="text-gray-600 text-lg">Practice your responses and get real-time feedback</p>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Question</h2>
              <p className="text-sm text-blue-600 font-medium">{currentQuestion.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{formatTime(timer)}</div>
              <div className="text-sm text-gray-500">Response time</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-xl text-gray-800 font-medium">{currentQuestion.question}</p>
        </div>

        {/* Tips */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">💡 Tips for a great response:</h3>
          <ul className="space-y-2">
            {currentQuestion.tips.map((tip, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={toggleRecording}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
          </button>

          <button
            onClick={isTimerRunning ? pauseTimer : startTimer}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isTimerRunning ? 'Pause' : 'Start'} Timer</span>
          </button>

          <button
            onClick={resetTimer}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Response Input */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Your Response:</label>
          <textarea
            value={userResponse}
            onChange={(e) => handleResponseChange(e.target.value)}
            placeholder="Type your response here or use the microphone to practice speaking..."
            className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Analysis Panel */}
      {analysis && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Response Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analysis.wordCount}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{analysis.fillerCount}</div>
              <div className="text-sm text-gray-600">Filler Words</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analysis.estimatedTime}s</div>
              <div className="text-sm text-gray-600">Est. Speaking Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {analysis.wordCount > 0 ? Math.round((1 - analysis.fillerCount / analysis.wordCount) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Clarity Score</div>
            </div>
          </div>

          {analysis.fillerWords.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Detected Filler Words:</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.fillerWords.map((word, index) => (
                  <span key={index} className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next Question Button */}
      <div className="text-center">
        <button
          onClick={nextQuestion}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Next Question
        </button>
      </div>
    </div>
  );
}