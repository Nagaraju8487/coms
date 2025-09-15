import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ConversationSimulator } from './components/ConversationSimulator';
import { PronunciationTrainer } from './components/PronunciationTrainer';
import { PublicSpeakingTimer } from './components/PublicSpeakingTimer';
import { DailyChallenge } from './components/DailyChallenge';
import { BodyLanguageGuide } from './components/BodyLanguageGuide';
import { ImpromptuSpeechGenerator } from './components/ImpromptuSpeechGenerator';
import { EmailToneImprover } from './components/EmailToneImprover';

export type AppView = 
  | 'dashboard' 
  | 'conversation' 
  | 'pronunciation' 
  | 'speaking-timer' 
  | 'daily-challenge' 
  | 'body-language' 
  | 'impromptu-speech' 
  | 'email-tone';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'conversation':
        return <ConversationSimulator />;
      case 'pronunciation':
        return <PronunciationTrainer />;
      case 'speaking-timer':
        return <PublicSpeakingTimer />;
      case 'daily-challenge':
        return <DailyChallenge />;
      case 'body-language':
        return <BodyLanguageGuide />;
      case 'impromptu-speech':
        return <ImpromptuSpeechGenerator />;
      case 'email-tone':
        return <EmailToneImprover />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="pt-20">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;