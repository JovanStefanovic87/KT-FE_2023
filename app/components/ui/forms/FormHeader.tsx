import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormHeader: React.FC<Props> = ({ children }) => {
  return (
    <div className='bg-ktCyan z-11 w-full flex flex-col items-center sticky top-0 mb-4 p-1'>
      {children}
    </div>
  );
};

export default FormHeader;
