import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-deep transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-secondary-highlight text-primary-deep hover:opacity-90 focus:ring-secondary-highlight',
    secondary: 'bg-support-shade/20 text-soft-neutral hover:bg-support-shade/40 focus:ring-support-shade',
    danger: 'bg-energy-pulse text-white hover:bg-energy-pulse/90 focus:ring-energy-pulse',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${props.className || ''}`;

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;