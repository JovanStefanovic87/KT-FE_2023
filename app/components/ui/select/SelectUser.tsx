import React, { ReactNode } from 'react';

interface SelectUserProps {
  selectedUser: string;
  onSelectUser: (user: string) => void;
  id: string;
  children: ReactNode;
}

const SelectUser: React.FC<SelectUserProps> = ({ selectedUser, onSelectUser, id, children }) => {
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelectUser(selectedValue);
  };

  return (
    <select
      id={id}
      name={id}
      value={selectedUser}
      onChange={handleUserChange}
      className={
        'flex p-2.5 max-w-select md:max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer'
      }
    >
      {children}
    </select>
  );
};

export default SelectUser;
