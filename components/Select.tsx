import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-support-shade mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full bg-primary-deep/50 border border-white/10 text-soft-neutral rounded-lg shadow-sm focus:ring-accent-aura focus:border-accent-aura sm:text-sm p-2"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-primary-deep">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;