import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => {
  const baseClasses = 'block text-sm font-medium';
  
  return (
    <label 
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};