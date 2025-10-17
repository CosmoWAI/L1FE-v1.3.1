import React, { useState } from 'react';
import type { View } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QuestTemplates from './components/QuestTemplates';
import Challenges from './components/Challenges';
import { GameControllerIcon } from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard />;
      case 'quests':
        return <QuestTemplates />;
      case 'challenges':
        return <Challenges />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-primary-deep text-soft-neutral flex">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-serif font-bold flex items-center gap-3 text-soft-neutral">
              <GameControllerIcon className="w-10 h-10 text-accent-aura" />
              L1FE
            </h1>
        </header>
        {renderView()}
      </main>
    </div>
  );
};

export default App;