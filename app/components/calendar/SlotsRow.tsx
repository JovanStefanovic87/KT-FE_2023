import React, { ReactNode } from 'react';

interface slotsRowProps {
  children: ReactNode;
}

const SlotsRow: React.FC<slotsRowProps> = ({ children }) => {
  const dayNamesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  };
  const containerBodyRowStyle: React.CSSProperties = {
    margin: '0.5rem 0',
  };

  return (
    <div className="grid grid-cols-9 gap-2" style={containerBodyRowStyle}>
      <div className="col-span-8" style={dayNamesContainerStyle}>
        {children}
      </div>
    </div>
  );
};

export default SlotsRow;
