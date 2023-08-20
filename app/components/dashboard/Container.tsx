import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="block w-96 bg-white" style={{ height: 'calc(100vh - 68px)' }}>
    {children}
  </div>
);

export default Container;
