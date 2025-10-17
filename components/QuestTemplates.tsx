import React, { useState } from 'react';
import useAdminData from '../hooks/useAdminData';
import type { QuestTemplate } from '../types';
import { Stat } from '../types';
import Modal from './Modal';
import QuestTemplateForm from './QuestTemplateForm';
import Button from './Button';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';

const QuestTemplates: React.FC = () => {
  const { quests, addQuest, updateQuest, deleteQuest, loading } = useAdminData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<QuestTemplate | null>(null);

  const handleOpenModalForCreate = () => {
    setEditingQuest(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (quest: QuestTemplate) => {
    setEditingQuest(quest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuest(null);
  };
  
  const handleSaveQuest = async (questData: Omit<QuestTemplate, 'id'> | QuestTemplate) => {
    if ('id' in questData) {
      await updateQuest(questData);
    } else {
      await addQuest(questData);
    }
    handleCloseModal();
  };

  const handleDeleteQuest = async (questId: string) => {
    if(window.confirm('Are you sure you want to delete this quest template?')) {
      await deleteQuest(questId);
    }
  };

  const getStatColor = (stat: Stat) => {
    switch(stat) {
      case Stat.Strength: return 'bg-energy-pulse/10 text-energy-pulse';
      case Stat.Mind: return 'bg-blue-400/10 text-blue-300';
      case Stat.Spirit: return 'bg-purple-400/10 text-purple-300';
      case Stat.Wealth: return 'bg-teal-mint-start/10 text-teal-mint-start';
      case Stat.Relation: return 'bg-pink-400/10 text-pink-300';
      default: return 'bg-support-shade/10 text-support-shade';
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-serif font-bold">Quest Templates</h2>
        <Button onClick={handleOpenModalForCreate}><PlusIcon className="w-5 h-5 mr-2" />Add New Quest</Button>
      </div>
      
      <div className="bg-panel-bg backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-primary-deep/50">
              <tr>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Title</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Stat Target</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Base XP</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Cadence</th>
                <th className="p-4 font-semibold text-support-shade uppercase tracking-wider text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quests.map((quest) => (
                <tr key={quest.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-soft-neutral">{quest.title}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatColor(quest.statTarget)}`}>{quest.statTarget}</span>
                  </td>
                  <td className="p-4 text-support-shade">{quest.baseXP}</td>
                  <td className="p-4 text-support-shade">{quest.cadence}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => handleOpenModalForEdit(quest)}><EditIcon className="w-4 h-4" /></Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteQuest(quest.id)}><TrashIcon className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingQuest ? 'Edit Quest Template' : 'Create New Quest Template'}>
        <QuestTemplateForm
          initialData={editingQuest}
          onSave={handleSaveQuest}
          onCancel={handleCloseModal}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default QuestTemplates;