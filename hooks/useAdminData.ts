
import { useState, useCallback } from 'react';
import type { QuestTemplate, Challenge } from '../types';
import { Stat, Cadence, Verification, Visibility } from '../types';

const initialQuests: QuestTemplate[] = [
  { id: 'qt1', title: 'Morning Meditation', description: 'Meditate for 10 minutes.', statTarget: Stat.Spirit, baseXP: 10, cadence: Cadence.Daily, verification: Verification.Self, tags: ['mindfulness', 'daily'] },
  { id: 'qt2', title: 'Weekly Fitness Goal', description: 'Complete 3 workouts this week.', statTarget: Stat.Strength, baseXP: 50, cadence: Cadence.Weekly, verification: Verification.Self, tags: ['fitness', 'weekly-goal'] },
  { id: 'qt3', title: 'Read a Chapter', description: 'Read one chapter of a non-fiction book.', statTarget: Stat.Mind, baseXP: 15, cadence: Cadence.Daily, verification: Verification.Self, tags: ['learning', 'reading'] },
  { id: 'qt4', title: 'Budget Review', description: 'Review your weekly spending and savings.', statTarget: Stat.Wealth, baseXP: 30, cadence: Cadence.Weekly, verification: Verification.Self, tags: ['finance', 'planning'] },
];

const initialChallenges: Challenge[] = [
  { id: 'ch1', title: 'Global Meditation Streak', description: 'All players contribute to a global meditation streak for 7 days.', statTarget: Stat.Spirit, goalCount: 10000, startAt: '2024-08-01', endAt: '2024-08-08', visibility: Visibility.Public },
  { id: 'ch2', title: 'Strength Guild War', description: 'Guilds compete to see who can complete the most Strength quests.', statTarget: Stat.Strength, goalCount: 500, startAt: '2024-08-05', endAt: '2024-08-12', visibility: Visibility.Guild },
];

const useAdminData = () => {
  const [quests, setQuests] = useState<QuestTemplate[]>(initialQuests);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [loading, setLoading] = useState(false);

  const simulateApiCall = <T,>(callback: () => T): Promise<T> => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const result = callback();
        setLoading(false);
        resolve(result);
      }, 500);
    });
  };

  const addQuest = useCallback((quest: Omit<QuestTemplate, 'id'>) => {
    return simulateApiCall(() => {
      const newQuest = { ...quest, id: `qt${Date.now()}` };
      setQuests(prev => [newQuest, ...prev]);
      return newQuest;
    });
  }, []);

  const updateQuest = useCallback((updatedQuest: QuestTemplate) => {
    return simulateApiCall(() => {
      setQuests(prev => prev.map(q => q.id === updatedQuest.id ? updatedQuest : q));
      return updatedQuest;
    });
  }, []);

  const deleteQuest = useCallback((questId: string) => {
    return simulateApiCall(() => {
      setQuests(prev => prev.filter(q => q.id !== questId));
      return questId;
    });
  }, []);
  
  const addChallenge = useCallback((challenge: Omit<Challenge, 'id'>) => {
    return simulateApiCall(() => {
      const newChallenge = { ...challenge, id: `ch${Date.now()}` };
      setChallenges(prev => [newChallenge, ...prev]);
      return newChallenge;
    });
  }, []);

  const updateChallenge = useCallback((updatedChallenge: Challenge) => {
    return simulateApiCall(() => {
      setChallenges(prev => prev.map(c => c.id === updatedChallenge.id ? updatedChallenge : c));
      return updatedChallenge;
    });
  }, []);

  const deleteChallenge = useCallback((challengeId: string) => {
    return simulateApiCall(() => {
      setChallenges(prev => prev.filter(c => c.id !== challengeId));
      return challengeId;
    });
  }, []);


  return { 
    quests, addQuest, updateQuest, deleteQuest, 
    challenges, addChallenge, updateChallenge, deleteChallenge,
    loading 
  };
};

export default useAdminData;
