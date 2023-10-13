import { DaysRowProps } from '@/app/helpers/interfaces';
import { dayTranslations } from '@/app/helpers/mock';

const DaysRow: React.FC<DaysRowProps> = ({ weekDays }) => {
  return (
    <div className='flex sticky top-0 mb-0.5 z-10 bg-ktBg'>
      {weekDays.map((dayInfo) => (
        <div
          key={dayInfo.day}
          className='flex justify-center items-center h-slotDayHeight w-slotsWidth mx-0.5 mt-1 min-w-slotsWidth text-orange-200 font-bold border-2 border-stone-500 border-solid bg-gray-800'
        >
          {dayTranslations[dayInfo.day]} ({dayInfo.date})
        </div>
      ))}
    </div>
  );
};

export default DaysRow;
