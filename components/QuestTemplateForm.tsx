
import React, { useState, useEffect } from 'react';
import type { QuestTemplate } from '../types';
import { Stat, Cadence, Verification } from '../types';
import { STAT_OPTIONS, CADENCE_OPTIONS, VERIFICATION_OPTIONS } from '../constants';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from './Button';

interface QuestTemplateFormProps {
  initialData?: QuestTemplate | null;
  onSave: (data: Omit<QuestTemplate, 'id'> | QuestTemplate) => void;
  onCancel: () => void;
  loading: boolean;
}

const QuestTemplateForm: React.FC<QuestTemplateFormProps> = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    statTarget: Stat.Strength,
    baseXP: 10,
    cadence: Cadence.Daily,
    verification: Verification.Self,
    tags: '', // Storing tags as a comma-separated string for simplicity
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        statTarget: initialData.statTarget,
        baseXP: initialData.baseXP,
        cadence: initialData.cadence,
        verification: initialData.verification,
        tags: initialData.tags.join(', '),
      });
    } else {
       setFormData({
        title: '',
        description: '',
        statTarget: Stat.Strength,
        baseXP: 10,
        cadence: Cadence.Daily,
        verification: Verification.Self,
        tags: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'baseXP' ? parseInt(value) || 0 : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const questData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    if (initialData) {
      onSave({ ...questData, id: initialData.id });
    } else {
      onSave(questData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
      <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Stat Target" name="statTarget" value={formData.statTarget} onChange={handleChange} options={STAT_OPTIONS} required />
        <Input label="Base XP" name="baseXP" type="number" value={formData.baseXP.toString()} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Cadence" name="cadence" value={formData.cadence} onChange={handleChange} options={CADENCE_OPTIONS} required />
        <Select label="Verification" name="verification" value={formData.verification} onChange={handleChange} options={VERIFICATION_OPTIONS} required />
      </div>
      <Input label="Tags (comma-separated)" name="tags" value={formData.tags} onChange={handleChange} />
      
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Quest'}</Button>
      </div>
    </form>
  );
};

export default QuestTemplateForm;
