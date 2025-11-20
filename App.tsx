import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { CallsignAuth } from './components/CallsignAuth';
import { Assessment } from './components/Assessment';
import { Dashboard } from './components/Dashboard';
import { UserState, AssessmentResult } from './types';
import { HashRouter } from 'react-router-dom';

type View = 'AUTH' | 'ASSESSMENT' | 'DASHBOARD';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    callsign: localStorage.getItem('callsign'),
    isAuthenticated: !!localStorage.getItem('callsign')
  });
  
  const [view, setView] = useState<View>(user.isAuthenticated ? 'ASSESSMENT' : 'AUTH');
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleLogin = (callsign: string) => {
    localStorage.setItem('callsign', callsign);
    setUser({ callsign, isAuthenticated: true });
    setView('ASSESSMENT');
  };

  const handleLogout = () => {
    localStorage.removeItem('callsign');
    setUser({ callsign: null, isAuthenticated: false });
    setView('AUTH');
    setResult(null);
  };

  const handleAssessmentComplete = (newResult: AssessmentResult) => {
    setResult(newResult);
    setView('DASHBOARD');
  };

  const handleRetake = () => {
    setResult(null);
    setView('ASSESSMENT');
  };

  return (
    <HashRouter>
      <Layout user={user} onLogout={handleLogout}>
        {view === 'AUTH' && (
          <CallsignAuth onLogin={handleLogin} />
        )}
        
        {view === 'ASSESSMENT' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Assessment In Progress</h2>
                <p className="text-neutral-600">Answer honestly for the most accurate exit readiness score.</p>
             </div>
            <Assessment onComplete={handleAssessmentComplete} />
          </div>
        )}

        {view === 'DASHBOARD' && result && (
          <Dashboard result={result} onRetake={handleRetake} />
        )}
      </Layout>
    </HashRouter>
  );
};

export default App;
