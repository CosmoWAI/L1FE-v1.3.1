import React from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-panel-bg border border-white/10 rounded-xl shadow-xl w-full max-w-2xl mx-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-xl font-serif font-bold">{title}</h3>
          <button onClick={onClose} className="text-support-shade hover:text-soft-neutral">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;