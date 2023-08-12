import React, { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

const DropdownBtn: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className="py-2 px-4 text-center text-white center bg-gray-700 border border-gray-900 rounded-md transition duration-300 hover:bg-gray-900 transform hover:translate-x-1">
      {children}
    </div>
  );
};

export default DropdownBtn;
