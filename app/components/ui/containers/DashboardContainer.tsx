type Props = {
  children: React.ReactNode;
};

const DashboardContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className='hidden fixed md:flex flex-col w-slotsWidth h-main mt-header bg-sideBarBg z-4'>
      <aside className='h-full relative shadow-lg overflow-y-auto'>
        <nav className='p-4 h-full'>
          <ul className='space-y-2 h-full flex flex-col'>{children}</ul>
        </nav>
      </aside>
    </div>
  );
};

export default DashboardContainer;
