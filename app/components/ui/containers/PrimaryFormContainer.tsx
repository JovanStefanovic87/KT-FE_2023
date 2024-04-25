import React, { ReactNode } from 'react';

type PrimaryFormContainerProps = {
  children: ReactNode;
};

const PrimaryFormContainer: React.FC<PrimaryFormContainerProps> = ({ children }) => {
  return (
    <div className='max-w-md w-full p-8 rounded-lg shadow-neumorphism-lg bg-gradient-to-br from-white to-blue-100'>
      {children}
    </div>
  );
};

export default PrimaryFormContainer;
