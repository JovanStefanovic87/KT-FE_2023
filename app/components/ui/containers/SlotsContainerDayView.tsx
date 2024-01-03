import React from 'react';

interface Props {
  children: React.ReactNode;
}

const SlotsContainerDayView: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex px-2 relative'>
      <div className='h-calHeight w-full overflow-auto border-2 bg-ktBg border-solid border-white mt-3 mb-3 mx-auto relative'>
        {children}
      </div>
    </div>
  );
};

export default SlotsContainerDayView;
