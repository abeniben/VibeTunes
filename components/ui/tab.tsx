import React from 'react';

interface TabProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export function Tab({ children, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm transition-colors ${
        active
          ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
          : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
      }`}
    >
      {children}
    </button>
  );
}