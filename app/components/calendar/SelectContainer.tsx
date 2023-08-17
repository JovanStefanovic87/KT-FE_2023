import React, { ReactNode } from 'react';

interface SelectContainerProps {
  children: ReactNode;
}

const SelectContainer: React.FC<SelectContainerProps> = ({ children }) => {
  const SelectContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '320px',
    overflow: 'hidden',
  };

  return <div style={SelectContainerStyle}>{children}</div>;
};

export default SelectContainer;
