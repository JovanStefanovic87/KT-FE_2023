import { format, addWeeks, startOfWeek, endOfWeek } from 'date-fns';

export const generateWeekOptions = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;

  const weeks = [];
  let currentDate = startOfWeek(today, { weekStartsOn: 1 }); // Start from the current week, with Monday as the starting day

  while (currentDate.getFullYear() <= nextYear) {
    const endOfWeekDate = endOfWeek(currentDate);

    weeks.push({
      label: `Nedelja ${format(currentDate, 'w')} (${format(currentDate, 'dd.MM.yy.')} - ${format(
        endOfWeekDate,
        'dd.MM.yy.'
      )})`,
      start: currentDate,
      end: endOfWeekDate,
    });

    currentDate = addWeeks(currentDate, 1);
  }
  return weeks;
};

export const generateTimeSlots = (slotInterval: number): string[] => {
  const timeSlots: string[] = [];
  const startTime = '00:00';
  const endTime = '23:59';

  let currentTime = startTime;
  while (currentTime <= endTime) {
    timeSlots.push(currentTime);

    // Increment currentTime by the slotInterval
    const [hours, minutes] = currentTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const nextTotalMinutes = totalMinutes + slotInterval;
    const nextHours = Math.floor(nextTotalMinutes / 60);
    const nextMinutes = nextTotalMinutes % 60;
    currentTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes
      .toString()
      .padStart(2, '0')}`;
  }
  return timeSlots;
};

export const getCurrentYear = (): string => {
  const today = new Date();
  return today.getFullYear().toString();
};
