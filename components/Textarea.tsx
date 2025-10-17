import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-support-shade mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="w-full bg-primary-deep/50 border border-white/10 text-soft-neutral rounded-lg shadow-sm focus:ring-accent-aura focus:border-accent-aura sm:text-sm p-2"
        {...props}
      />
    </div>
  );
};

export default Textarea;