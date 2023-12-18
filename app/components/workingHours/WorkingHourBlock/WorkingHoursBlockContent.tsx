import { WorkingHoursProps } from '../../../helpers/interfaces';
import CustomTimeInput from '../../ui/input/CustomTimeInput';

interface Props {
  obj: WorkingHoursProps;
  index: number;
  onChange: (day: number, field: keyof WorkingHoursProps, value: string) => void;
  Shift: string;
}

const WorkingHoursBlockContent: React.FC<Props> = ({ obj, index, onChange, Shift }) => {
  const from = Shift === 'Prva' ? 'morningFrom' : 'afternoonFrom';
  const to = Shift === 'Prva' ? 'morningTo' : 'afternoonTo';
  return (
    <div className='mb-4'>
      <label className='block text-sm font-semibold mb-2'>{`${Shift} Smena`}</label>
      <div className='flex flex-wrap -mx-2'>
        <div className='w-1/2 px-2 mb-2'>
          <label className='block text-xs font-medium'>Od:</label>
          <CustomTimeInput value={obj[from]} onChange={(value) => onChange(index, from, value)} />
        </div>
        <div className='w-1/2 px-2 mb-2'>
          <label className='block text-xs font-medium'>Do:</label>
          <CustomTimeInput value={obj[to]} onChange={(value) => onChange(index, to, value)} />
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursBlockContent;
