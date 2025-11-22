import { useState } from 'react';
import { HomePage } from './components/pages/HomePage';
import { QuestionnaireFlow } from './components/pages/QuestionnaireFlow';
import { ResultsTemplate } from './components/templates/ResultsTemplate';
import type { UserPreferences, RecommendationReason, Duvet } from './types/duvet.types';
import { matchDuvets } from './utils/duvetMatcher';
import duvetsData from './data/duvets.json';
import './App.css';

type AppState = 'home' | 'questionnaire' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [recommendations, setRecommendations] = useState<RecommendationReason[]>([]);

  const handleStart = () => {
    setAppState('questionnaire');
  };

  const handleQuestionnaireComplete = (preferences: UserPreferences) => {
    const results = matchDuvets(duvetsData as Duvet[], preferences);
    setRecommendations(results.slice(0, 6)); // Show top 6 matches
    setAppState('results');
  };

  const handleRestart = () => {
    setAppState('home');
    setRecommendations([]);
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-content">
          <h1 className="app__logo">Flora Danica</h1>
          <p className="app__tagline">Duvet Finder</p>
        </div>
      </header>

      <main className="app__main">
        {appState === 'home' && <HomePage onStart={handleStart} />}
        {appState === 'questionnaire' && (
          <QuestionnaireFlow onComplete={handleQuestionnaireComplete} />
        )}
        {appState === 'results' && (
          <ResultsTemplate recommendations={recommendations} onRestart={handleRestart} />
        )}
      </main>

      <footer className="app__footer">
        <p>
          &copy; 2025 Flora Danica. Duvet Finder - AI Manager Web Development Specialization
          Project
        </p>
      </footer>
    </div>
  );
}

export default App;
