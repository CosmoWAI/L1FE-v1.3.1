import React from 'react';
import type { View } from '../types';
import { DashboardIcon, QuestIcon, ChallengeIcon, L1FEIcon } from './Icons';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-all duration-300 transform group ${
      isActive
        ? 'bg-gradient-to-r from-teal-mint-start to-teal-mint-end text-primary-deep shadow-aura font-bold'
        : 'text-support-shade hover:bg-white/5 hover:text-soft-neutral'
    }`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-64 bg-ebony-black-blue p-4 flex flex-col border-r border-white/10">
      <div className="flex items-center gap-2 px-2 pb-6 mb-6 border-b border-white/10">
        <L1FEIcon className="w-10 h-10 text-secondary-highlight" />
        <span className="text-2xl font-serif font-bold tracking-wider text-soft-neutral">L1FE</span>
      </div>
      <nav className="flex flex-col gap-2">
        <NavItem
          icon={<DashboardIcon className="w-6 h-6" />}
          label="Dashboard"
          isActive={currentView === 'dashboard'}
          onClick={() => setView('dashboard')}
        />
        <NavItem
          icon={<QuestIcon className="w-6 h-6" />}
          label="Quest Templates"
          isActive={currentView === 'quests'}
          onClick={() => setView('quests')}
        />
        <NavItem
          icon={<ChallengeIcon className="w-6 h-6" />}
          label="Challenges"
          isActive={currentView === 'challenges'}
          onClick={() => setView('challenges')}
        />
      </nav>
      <div className="mt-auto text-center text-support-shade text-xs">
        <p>&copy; 2024 L1FE Game Studios</p>
        <p>Admin Panel v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;