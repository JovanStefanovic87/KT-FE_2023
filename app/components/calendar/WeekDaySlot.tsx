import React, { ReactNode } from 'react';

interface WeekDaySlotProps {
  children: ReactNode;
}

const WeekDaySlot: React.FC<WeekDaySlotProps> = ({ children }) => {
  const calendarHeadStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 3,
  };

  const dayNamesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  };

  return (
    <div className="grid grid-cols-9 gap-2" style={calendarHeadStyle}>
      <div className="col-span-8" style={dayNamesContainerStyle}>
        {children}
      </div>
    </div>
  );
};

export default WeekDaySlot;
