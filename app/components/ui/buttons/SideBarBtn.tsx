import React, { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
  onClick?: () => void; // Make onClick prop optional
}

const SideBarBtn: React.FC<MyComponentProps> = ({ onClick, children }) => {
  // Define a default onClick handler that does nothing (an empty function)
  const defaultOnClick = () => {};

  // Use the provided onClick handler if available, otherwise use the defaultOnClick
  const handleClick = onClick || defaultOnClick;

  return (
    <div
      className="text-center text-white center  border border-white rounded-md transition duration-300 hover:bg-sideBarBgHover transform hover:translate-x-1 cursor-pointer"
      onClick={handleClick} // Use the determined onClick handler
    >
      {children}
    </div>
  );
};

export default SideBarBtn;
