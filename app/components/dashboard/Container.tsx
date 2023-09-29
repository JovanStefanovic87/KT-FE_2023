import { ChildrenProps } from '@/app/helpers/interfaces';

const Container: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-auto bg-sideBarBg'>
      <aside className='h-full relative shadow-lg overflow-y-auto z-19 hidden md:block '>
        <nav className='p-4 h-full'>
          <ul className='space-y-2 h-full flex flex-col'>{children}</ul>
        </nav>
      </aside>
    </div>
  );
};

export default Container;
