import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const headerHeight = 68;

  return (
    <div
      className="bg-ktBg flex flex-col py-4 "
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
    >
      {children}
    </div>
  );
};

export default Container;
