import React, { ReactNode } from 'react';

interface WeekDaySlotProps {
  children: ReactNode;
}

const DaysRow: React.FC<WeekDaySlotProps> = ({ children }) => {
  return <div className="flex sticky top-0 z-3 bg-ktBg">{children}</div>;
};

export default DaysRow;
