import React from 'react';

interface Props {
  children: React.ReactNode;
}

const NewAppointmentFormContainer: React.FC<Props> = ({ children }) => {
  return (
    <ul className='grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-4/6 overflow-auto'>
      {children}
    </ul>
  );
};

export default NewAppointmentFormContainer;
