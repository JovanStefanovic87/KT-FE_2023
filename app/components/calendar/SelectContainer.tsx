import React, { ReactNode } from 'react';

interface SelectContainerProps {
  children: ReactNode;
}

const SelectContainer: React.FC<SelectContainerProps> = ({ children }) => {
  return (
    <div className="flex self-center justify-center gap-x-6 w-calendar-sm md:w-calendar-lg">
      {children}
    </div>
  );
};

export default SelectContainer;
