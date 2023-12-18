import { WorkingHoursProps } from '../../../helpers/interfaces';

interface Props {
  obj: WorkingHoursProps;
  value: string[];
  index: number;
}

const WorkingHourBlockHeader: React.FC<Props> = ({ obj, value, index }) => {
  return (
    <div className='flex items-center justify-between mb-2'>
      <h3 className='text-lg font-semibold'>{value[index]}</h3>
      <p className='text-sm font-semibold'>{obj.date}</p>
    </div>
  );
};

export default WorkingHourBlockHeader;
