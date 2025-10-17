
import React, { useState, useEffect } from 'react';
import type { Challenge } from '../types';
import { Stat, Visibility } from '../types';
import { STAT_OPTIONS, VISIBILITY_OPTIONS } from '../constants';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Button from './Button';

interface ChallengeFormProps {
  initialData?: Challenge | null;
  onSave: (data: Omit<Challenge, 'id'> | Challenge) => void;
  onCancel: () => void;
  loading: boolean;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    statTarget: Stat.Strength,
    goalCount: 1000,
    startAt: '',
    endAt: '',
    visibility: Visibility.Public,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        statTarget: initialData.statTarget,
        goalCount: initialData.goalCount,
        startAt: initialData.startAt,
        endAt: initialData.endAt,
        visibility: initialData.visibility,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        statTarget: Stat.Strength,
        goalCount: 1000,
        startAt: new Date().toISOString().split('T')[0],
        endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        visibility: Visibility.Public,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'goalCount' ? parseInt(value) || 0 : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSave({ ...formData, id: initialData.id });
    } else {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
      <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Stat Target" name="statTarget" value={formData.statTarget} onChange={handleChange} options={STAT_OPTIONS} required />
        <Input label="Goal Count" name="goalCount" type="number" value={formData.goalCount.toString()} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Start Date" name="startAt" type="date" value={formData.startAt} onChange={handleChange} required />
        <Input label="End Date" name="endAt" type="date" value={formData.endAt} onChange={handleChange} required />
      </div>
      <Select label="Visibility" name="visibility" value={formData.visibility} onChange={handleChange} options={VISIBILITY_OPTIONS} required />
      
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Challenge'}</Button>
      </div>
    </form>
  );
};

export default ChallengeForm;
