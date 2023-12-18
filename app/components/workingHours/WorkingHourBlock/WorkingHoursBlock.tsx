import { WorkingHoursProps } from '../../../helpers/interfaces';
import WorkingHoursAbsence from './WorkingHoursAbsence';
import WorkingHoursBlockContent from './WorkingHoursBlockContent';
import WorkingHourBlockHeader from './WorkingHoursBlockHeader';

interface Props {
  dayNames: string[];
  obj: WorkingHoursProps;
  index: number;
  setWorkingHours: React.Dispatch<React.SetStateAction<WorkingHoursProps[]>>;
}

const WorkingHoursBlock: React.FC<Props> = ({ dayNames, obj, index, setWorkingHours }) => {
  const onChange = (day: number, field: keyof WorkingHoursProps, value: string) => {
    const dayIndex = day;
    setWorkingHours((prevWorkingHours) => {
      const updatedWorkingHours = [...prevWorkingHours];
      updatedWorkingHours[dayIndex] = {
        ...updatedWorkingHours[dayIndex],
        [field]: value,
      };
      return updatedWorkingHours;
    });
  };

  return (
    <>
      <WorkingHourBlockHeader obj={obj} value={dayNames} index={index} />
      <WorkingHoursBlockContent obj={obj} index={index} onChange={onChange} Shift='Prva' />
      <WorkingHoursBlockContent obj={obj} index={index} onChange={onChange} Shift='Druga' />
      <WorkingHoursAbsence obj={obj} index={index} onChange={onChange} />
    </>
  );
};

export default WorkingHoursBlock;
