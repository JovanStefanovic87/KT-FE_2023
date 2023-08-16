import React, { ReactNode } from 'react';

interface SelectUserProps {
  selectedUser: string;
  onSelectUser: (user: string) => void;
  children: ReactNode;
}

const SelectUser: React.FC<SelectUserProps> = ({ selectedUser, onSelectUser, children }) => {
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelectUser(selectedValue);
  };

  return (
    <select
      value={selectedUser}
      onChange={handleUserChange}
      className={
        'p-2.5 mx-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      }
    >
      {children}
    </select>
  );
};

export default SelectUser;
