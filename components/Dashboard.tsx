import React from 'react';
import { QuestIcon, ChallengeIcon, UsersIcon } from './Icons';
import useAdminData from '../hooks/useAdminData';
import Guide from './Guide';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-panel-bg backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg flex items-center">
    <div className="p-3 rounded-full bg-primary-deep mr-4">
        {icon}
    </div>
    <div>
        <p className="text-sm text-support-shade">{title}</p>
        <p className="text-2xl font-bold text-soft-neutral">{value}</p>
    </div>
  </div>
);


const Dashboard: React.FC = () => {
  const { quests, challenges } = useAdminData();

  return (
    <div>
      <h2 className="text-4xl font-serif font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Quest Templates" value={quests.length} icon={<QuestIcon className="w-8 h-8 text-accent-aura"/>} />
        <StatCard title="Active Challenges" value={challenges.length} icon={<ChallengeIcon className="w-8 h-8 text-secondary-highlight"/>} />
        <StatCard title="Simulated Active Users" value="1,482" icon={<UsersIcon className="w-8 h-8 text-teal-mint-end"/>} />
      </div>
       <div className="mt-12 bg-panel-bg backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-serif font-bold mb-4">Welcome, Admin!</h3>
        <p className="text-support-shade">
          This is the central hub for managing the L1FE game world. You can create and manage quest templates that will be assigned to players, and launch global or guild-based challenges to drive engagement.
        </p>
        <ul className="list-disc list-inside mt-4 text-support-shade space-y-2">
            <li>Use the <span className="font-semibold text-accent-aura">Quest Templates</span> section to design new daily, weekly, and epic quests.</li>
            <li>Head over to <span className="font-semibold text-accent-aura">Challenges</span> to create time-based events for the community.</li>
            <li>Monitor game health and player engagement through upcoming analytics features.</li>
        </ul>
       </div>
       <div className="mt-8">
        <Guide />
       </div>
    </div>
  );
};

export default Dashboard;