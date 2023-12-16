import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className='flex relative flex-grow w-full h-main mt-header md:ml-slotsWidth overflow-hidden'>
      <div className='px-4 bg-ktBg w-full overflow-y-auto'>{children}</div>
    </main>
  );
};

export default Main;
