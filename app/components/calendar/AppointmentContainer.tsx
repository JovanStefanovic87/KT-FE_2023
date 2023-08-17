import React, { ReactNode } from 'react';

interface AppointmentContainerProps {
  children: ReactNode;
}

const AppointmentContainer: React.FC<AppointmentContainerProps> = ({ children }) => {
  const slotsWidth = 200;
  const appointmentContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    minWidth: slotsWidth,
    position: 'relative', // Add relative positioning
  };

  return <div style={appointmentContainerStyle}>{children}</div>;
};

export default AppointmentContainer;
