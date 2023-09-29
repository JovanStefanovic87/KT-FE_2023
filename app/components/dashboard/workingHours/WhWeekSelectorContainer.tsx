import { ChildrenProps } from '@/app/helpers/interfaces';

const whWeekSelectorContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className='mb-4'>
      <label className='block text-lg font-semibold'>Izaberite Nedelju:</label>
      {children}
    </div>
  );
};

export default whWeekSelectorContainer;
