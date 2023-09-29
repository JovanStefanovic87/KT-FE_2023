import { ChildrenProps } from '@/app/helpers/interfaces';

const DaysRow: React.FC<ChildrenProps> = ({ children }) => {
  return <div className='flex sticky top-0 mb-0.5 z-10 bg-ktBg'>{children}</div>;
};

export default DaysRow;
