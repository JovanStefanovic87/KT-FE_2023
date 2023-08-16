import React, { ReactNode } from 'react';

interface WeekSelectProps {
  value: number;
  onChange: (value: number) => void;
  children: ReactNode;
}

const WeekSelect: React.FC<WeekSelectProps> = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(parseInt(e.target.value, 10))}
      className={`p-2.5 mx-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 responsive-select`}
    >
      {children}
    </select>
  );
};

export default WeekSelect;
