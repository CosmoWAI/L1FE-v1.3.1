import React, { useState } from 'react';
import useAdminData from '../hooks/useAdminData';
import type { Challenge } from '../types';
import Modal from './Modal';
import ChallengeForm from './ChallengeForm';
import Button from './Button';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';

const Challenges: React.FC = () => {
  const { challenges, addChallenge, updateChallenge, deleteChallenge, loading } = useAdminData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

  const handleOpenModalForCreate = () => {
    setEditingChallenge(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChallenge(null);
  };
  
  const handleSaveChallenge = async (challengeData: Omit<Challenge, 'id'> | Challenge) => {
    if ('id' in challengeData) {
      await updateChallenge(challengeData);
    } else {
      await addChallenge(challengeData);
    }
    handleCloseModal();
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    if(window.confirm('Are you sure you want to delete this challenge?')) {
      await deleteChallenge(challengeId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-serif font-bold">Challenges</h2>
        <Button onClick={handleOpenModalForCreate}><PlusIcon className="w-5 h-5 mr-2" />Add New Challenge</Button>
      </div>
      
      <div className="bg-panel-bg backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-primary-deep/50">
              <tr>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Title</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Stat Target</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Goal Count</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Period</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Visibility</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-soft-neutral">{challenge.title}</td>
                  <td className="p-4 text-support-shade">{challenge.statTarget}</td>
                  <td className="p-4 text-support-shade">{challenge.goalCount.toLocaleString()}</td>
                  <td className="p-4 text-support-shade">{challenge.startAt} to {challenge.endAt}</td>
                  <td className="p-4 text-support-shade">{challenge.visibility}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => handleOpenModalForEdit(challenge)}><EditIcon className="w-4 h-4" /></Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteChallenge(challenge.id)}><TrashIcon className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}>
        <ChallengeForm
          initialData={editingChallenge}
          onSave={handleSaveChallenge}
          onCancel={handleCloseModal}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Challenges;