import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import { DaysRowProps } from '@/app/helpers/interfaces';
import { dayTranslations } from '@/app/helpers/mock';

const DaysRow: React.FC<DaysRowProps> = ({ weekDays }) => {
  const calendarMode = useSelector((state: RootState) => state.calendarMode);
  const isWeekMode = calendarMode.mode === 'week';

  return (
    <div className='flex sticky top-0 mb-0.5 z-4 w-full bg-ktBg'>
      {weekDays.map((dayInfo) => (
        <div
          key={dayInfo.day}
          className='flex justify-center items-center h-slotDayHeight w-full mx-0.5 mt-1 min-w-slotsWidth text-orange-200 font-bold border-2 border-stone-500 border-solid bg-gray-800'
        >
          {dayTranslations[dayInfo.day]} {isWeekMode && '('}
          {dayInfo.date}
          {isWeekMode && ')'}
        </div>
      ))}
    </div>
  );
};

export default DaysRow;
