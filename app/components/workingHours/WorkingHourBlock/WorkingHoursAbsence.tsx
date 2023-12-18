import { WorkingHoursProps } from '../../../helpers/interfaces';

interface Props {
  obj: WorkingHoursProps;
  index: number;
  onChange: (day: number, field: keyof WorkingHoursProps, value: string) => void;
}

const WorkingHoursAbsence: React.FC<Props> = ({ obj, index, onChange }) => {
  return (
    <div>
      <label className='block text-sm font-semibold mb-2'>Odsustvo</label>
      <select
        value={obj.absence}
        onChange={(e) => onChange(index, 'absence', e.target.value)}
        className='border border-gray-300 rounded p-2 w-full'
      >
        <option value='nema odsustva'>Nema odsustva</option>
        <option value='godišnji odmor'>Godišnji odmor</option>
        <option value='praznik'>Praznik</option>
        <option value='bolovanje'>Bolovanje</option>
      </select>
    </div>
  );
};

export default WorkingHoursAbsence;
