import { dayTranslations } from '@/app/helpers/mock';

interface Props {
  day: string;
  date: string;
}

const DaysRowPerDay: React.FC<Props> = ({ day, date }) => {
  return (
    <div className='flex sticky top-0 mb-0.5 z-3 bg-ktBg'>
      <div className='flex justify-center items-center h-slotDayHeight mx-0.5 mt-1 min-w-full text-orange-200 font-bold border-2 border-stone-500 border-solid bg-gray-800'>
        {dayTranslations[day]} ({date})
      </div>
    </div>
  );
};

export default DaysRowPerDay;
