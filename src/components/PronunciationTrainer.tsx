import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface PracticeSentence {
  id: number;
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  phonetics: string;
  tips: string;
}

const practiceSentences: PracticeSentence[] = [
  {
    id: 1,
    text: "The quick brown fox jumps over the lazy dog",
    difficulty: 'Easy',
    phonetics: "/ðə kwɪk braʊn fɒks ʤʌmps ˈoʊvər ðə ˈleɪzi dɒg/",
    tips: "Focus on clear consonants and vowel sounds"
  },
  {
    id: 2,
    text: "She sells seashells by the seashore",
    difficulty: 'Medium',
    phonetics: "/ʃi sɛlz ˈsiʃɛlz baɪ ðə ˈsiʃɔr/",
    tips: "Practice the 'sh' and 's' sounds - they're different!"
  },
  {
    id: 3,
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood",
    difficulty: 'Hard',
    phonetics: "/haʊ mʌʧ wʊd wʊd ə ˈwʊdʧʌk ʧʌk ɪf ə ˈwʊdʧʌk kʊd ʧʌk wʊd/",
    tips: "Focus on the 'w' and 'ch' sounds, maintain rhythm"
  }
];

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export function PronunciationTrainer() {
  const [currentSentence, setCurrentSentence] = useState<PracticeSentence>(practiceSentences[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        calculateAccuracy(result, currentSentence.text);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentSentence.text]);

  const calculateAccuracy = (spoken: string, target: string) => {
    const spokenWords = spoken.toLowerCase().split(/\s+/);
    const targetWords = target.toLowerCase().split(/\s+/);
    
    let matches = 0;
    const maxLength = Math.max(spokenWords.length, targetWords.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (spokenWords[i] && targetWords[i] && spokenWords[i] === targetWords[i]) {
        matches++;
      }
    }
    
    const accuracyScore = Math.round((matches / targetWords.length) * 100);
    setAccuracy(accuracyScore);
    setAttempts(prev => prev + 1);
    
    if (accuracyScore > bestScore) {
      setBestScore(accuracyScore);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setAccuracy(null);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const playExample = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentSentence.text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const nextSentence = () => {
    const currentIndex = practiceSentences.findIndex(s => s.id === currentSentence.id);
    const nextIndex = (currentIndex + 1) % practiceSentences.length;
    setCurrentSentence(practiceSentences[nextIndex]);
    reset();
  };

  const reset = () => {
    setTranscript('');
    setAccuracy(null);
    setAttempts(0);
    setBestScore(0);
    setIsListening(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAccuracyColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pronunciation Trainer</h1>
        <p className="text-gray-600 text-lg">Practice your pronunciation and get instant feedback</p>
      </div>

      {!isSpeechRecognitionSupported && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">
            Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      )}

      {/* Practice Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Practice Sentence</h2>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentSentence.difficulty)}`}>
                {currentSentence.difficulty}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{bestScore}%</div>
            <div className="text-sm text-gray-500">Best Score</div>
          </div>
        </div>

        {/* Target Sentence */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl text-gray-800 font-medium">{currentSentence.text}</p>
            <button
              onClick={playExample}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span className="text-sm">Listen</span>
            </button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Phonetics:</p>
            <p className="text-gray-600 font-mono text-sm">{currentSentence.phonetics}</p>
          </div>
        </div>

        {/* Tip */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> {currentSentence.tips}
          </p>
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={!isSpeechRecognitionSupported}
            className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Mic className="w-4 h-4" />
            <span>{isListening ? 'Recording...' : 'Start Recording'}</span>
          </button>

          <button
            onClick={reset}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Results */}
        {transcript && (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">What you said:</h4>
              <p className="text-gray-800">{transcript}</p>
            </div>

            {accuracy !== null && (
              <div className="flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  {accuracy >= 80 ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                  <div>
                    <div className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>
                      {accuracy}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Accuracy Score
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    Attempt #{attempts}
                  </div>
                  <div className="text-sm text-gray-600">
                    Keep practicing!
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={nextSentence}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Next Sentence
        </button>
      </div>
    </div>
  );
}