import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, FileText, Clock } from 'lucide-react';

interface SpeechAnalysis {
  wordCount: number;
  estimatedTime: number;
  wpm: number;
  recommendations: string[];
}

export function PublicSpeakingTimer() {
  const [script, setScript] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [analysis, setAnalysis] = useState<SpeechAnalysis | null>(null);
  const [targetDuration, setTargetDuration] = useState(300); // 5 minutes default

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (script.trim()) {
      analyzeScript(script);
    } else {
      setAnalysis(null);
    }
  }, [script]);

  const analyzeScript = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const avgWPM = 150; // Average speaking pace
    const estimatedTime = Math.ceil(wordCount / avgWPM * 60); // in seconds
    
    const recommendations = [];
    
    if (wordCount < 100) {
      recommendations.push("Consider adding more content - your speech might be too short");
    } else if (wordCount > 1000) {
      recommendations.push("Your speech might be too long - consider condensing key points");
    }
    
    if (estimatedTime < targetDuration * 0.8) {
      recommendations.push("Speech may be shorter than your target time - add examples or details");
    } else if (estimatedTime > targetDuration * 1.2) {
      recommendations.push("Speech may be longer than your target time - consider removing less critical points");
    }
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = wordCount / sentences.length;
    
    if (avgSentenceLength > 20) {
      recommendations.push("Consider shorter sentences for better clarity and pacing");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Great! Your speech length looks well-balanced for your target time");
    }

    setAnalysis({
      wordCount,
      estimatedTime,
      wpm: Math.round(wordCount / (estimatedTime / 60)),
      recommendations
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const getTimerColor = () => {
    if (!analysis) return 'text-gray-900';
    const progress = timer / analysis.estimatedTime;
    if (progress < 0.8) return 'text-green-600';
    if (progress < 1.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPacingFeedback = () => {
    if (!analysis || timer === 0) return null;
    
    const currentWPM = Math.round((analysis.wordCount * timer / analysis.estimatedTime) / (timer / 60));
    
    if (currentWPM < 120) return { text: "Speaking slower than recommended", color: "text-blue-600" };
    if (currentWPM > 180) return { text: "Speaking faster than recommended", color: "text-orange-600" };
    return { text: "Good speaking pace", color: "text-green-600" };
  };

  const pacingFeedback = getPacingFeedback();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Public Speaking Timer</h1>
        <p className="text-gray-600 text-lg">Practice your timing and get pacing feedback</p>
      </div>

      {/* Target Duration Setting */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Target Speech Duration</h2>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Minutes:</label>
          <select
            value={Math.floor(targetDuration / 60)}
            onChange={(e) => setTargetDuration(parseInt(e.target.value) * 60)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            {[1, 2, 3, 5, 10, 15, 20, 30].map(min => (
              <option key={min} value={min}>{min} minutes</option>
            ))}
          </select>
        </div>
      </div>

      {/* Script Input */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Your Speech Script</h2>
        </div>

        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your speech script here to get timing estimates and pacing recommendations..."
          className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        {analysis && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{analysis.wordCount}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{formatDuration(analysis.estimatedTime)}</div>
              <div className="text-sm text-gray-600">Estimated Time</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{analysis.wpm}</div>
              <div className="text-sm text-gray-600">Est. WPM</div>
            </div>
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold ${getTimerColor()} mb-4`}>
            {formatTime(timer)}
          </div>
          
          {analysis && (
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-gray-600">Target</div>
                <div className="font-semibold">{formatTime(analysis.estimatedTime)}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Progress</div>
                <div className="font-semibold">
                  {Math.round((timer / analysis.estimatedTime) * 100)}%
                </div>
              </div>
            </div>
          )}

          {pacingFeedback && (
            <div className={`mt-4 font-medium ${pacingFeedback.color}`}>
              {pacingFeedback.text}
            </div>
          )}
        </div>

        {/* Timer Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isRunning
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Progress Bar */}
        {analysis && (
          <div className="mt-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((timer / analysis.estimatedTime) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((timer / analysis.estimatedTime) * 100, 100)}%`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {analysis && analysis.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}