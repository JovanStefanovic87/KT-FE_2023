type ChildrenProps = {
  children: React.ReactNode;
};

const Container: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className='hidden fixed md:flex flex-col w-slotsWidth h-main mt-header bg-sideBarBg z-3'>
      <aside className='h-full relative shadow-lg overflow-y-auto z-19'>
        <nav className='p-4 h-full'>
          <ul className='space-y-2 h-full flex flex-col'>{children}</ul>
        </nav>
      </aside>
    </div>
  );
};

export default Container;
