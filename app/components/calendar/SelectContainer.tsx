import React, { ReactNode } from 'react';

interface SelectContainerProps {
  children: ReactNode;
}

const SelectContainer: React.FC<SelectContainerProps> = ({ children }) => {
  return <div className="flex justify-center gap-x-6 w-screen">{children}</div>;
};

export default SelectContainer;
