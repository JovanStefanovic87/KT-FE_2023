import { WorkingHoursProps } from '../../../helpers/interfaces';

interface Props {
  children: React.ReactNode;
  obj: WorkingHoursProps;
  index: number;
}

const WorkingHourBlockContainer: React.FC<Props> = ({ children, obj, index }) => {
  return (
    <div
      key={`${obj.date}-${index}`}
      className='w-full xl:w-workingHoursSlotXl lg:w-workingHoursSlotLg p-4 border border-gray-300 rounded shadow-inner'
    >
      {children}
    </div>
  );
};

export default WorkingHourBlockContainer;
