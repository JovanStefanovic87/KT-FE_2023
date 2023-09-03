import React, { ReactNode } from 'react';

interface slotsRowProps {
  children: ReactNode;
}

const SlotsRow: React.FC<slotsRowProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-9 gap-2 mt-0 z-5">
      <div className="flex flex-row col-span-8">{children}</div>
    </div>
  );
};

export default SlotsRow;
