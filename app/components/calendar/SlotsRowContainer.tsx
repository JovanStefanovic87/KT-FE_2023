import { ChildrenProps } from '@/app/helpers/interfaces';

const SlotsRowContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className='grid grid-cols-9 gap-2 mt-0 z-5'>
      <div className='flex flex-row col-span-8'>{children}</div>
    </div>
  );
};

export default SlotsRowContainer;
