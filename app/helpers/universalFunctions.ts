import { format, addDays, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
/* import { workingHours } from './mock'; */
import { WeekDay } from '../helpers/interfaces';

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
        'dd.MM.yy.',
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

export const handleSelectChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<string | number | null>>,
) => {
  const selectedValue = event.target.value;
  setState(selectedValue);
};

export const generateWeekDays = (selectedWeekIndex: number, dayView = false): WeekDay[] => {
  const weekDays: WeekDay[] = [];
  const today = new Date();
  const dayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const startOfWeek = addDays(today, -dayOffset);
  const currentWeekStart = addWeeks(startOfWeek, selectedWeekIndex);
  const days = dayView ? 1 : 7;

  for (let i = 0; i < days; i++) {
    const currentDate = addDays(currentWeekStart, i);
    const day = format(currentDate, 'EEE');
    const date = format(currentDate, 'dd.MM.yy');

    weekDays.push({ day, date });
  }
  return weekDays;
};

export const isWorkingHour = (day: string, time: string, workingHours: any): boolean => {
  const dayWorkingHours = workingHours.find((wh: any) => wh.day === day);

  if (!dayWorkingHours) {
    return false;
  }

  const appointmentTime = parseInt(time.replace(':', ''), 10);

  const morningFrom = parseInt(dayWorkingHours.morningFrom.replace(':', ''), 10);
  const morningTo = parseInt(dayWorkingHours.morningTo.replace(':', ''), 10);
  const afternoonFrom = parseInt(dayWorkingHours.afternoonFrom.replace(':', ''), 10);
  const afternoonTo = parseInt(dayWorkingHours.afternoonTo.replace(':', ''), 10);

  // Check if the appointment time falls within the morning or afternoon working hours
  if (
    (appointmentTime >= morningFrom && appointmentTime <= morningTo) ||
    (appointmentTime >= afternoonFrom && appointmentTime <= afternoonTo) ||
    dayWorkingHours.absence !== 'nema odsustva'
  ) {
    return true;
  }

  return false;
};

export const isAbsenceWeek = (workingHours: any[]): boolean => {
  // Check if there are no working hours (morning and afternoon) for every day in the week
  const hasNoWorkingHours = workingHours.every(
    (wh) => !wh || (wh.morningFrom === 'nn:nn' && wh.afternoonFrom === 'nn:nn'),
  );

  // Check if there is at least one day with an absence reason other than "nema odsustva"
  const hasAbsence = workingHours.some((wh) => wh && wh.absence !== 'nema odsustva');

  // Return true if there are no working hours for every day and at least one day with absence
  return hasNoWorkingHours && hasAbsence;
};

export const hasWorkingHourInHour = (
  hour: string,
  weekDays: WeekDay[],
  timeSlots: string[],
  workingHours: any,
): boolean => {
  return weekDays.some((dayInfo) => {
    const dayWorkingHours = workingHours.find((wh: any) => wh.day === dayInfo.day);
    if (!dayWorkingHours) {
      return false; // No working hours information for the given day
    }

    return timeSlots.some((time) => {
      // Check for "HH:mm" format or "nn:nn" format
      const isValidTime = (timeStr: string) => {
        return (
          /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr) || /^\d{1,2}:\d{1,2}$/.test(timeStr)
        );
      };

      const startsWithHour = isValidTime(time) && time.startsWith(hour);
      if (startsWithHour) {
        const appointmentTime = parseInt(time.replace(':', ''), 10);
        const morningFrom = parseInt(dayWorkingHours.morningFrom.replace(':', ''), 10);
        const morningTo = parseInt(dayWorkingHours.morningTo.replace(':', ''), 10);
        const afternoonFrom = parseInt(dayWorkingHours.afternoonFrom.replace(':', ''), 10);
        const afternoonTo = parseInt(dayWorkingHours.afternoonTo.replace(':', ''), 10);

        // Check if the appointment time is within the working hours range
        if (morningFrom && afternoonTo) {
          return appointmentTime >= morningFrom && appointmentTime <= afternoonTo;
        } else if (morningFrom) {
          return appointmentTime >= morningFrom && appointmentTime <= morningTo;
        } else if (afternoonFrom) {
          return appointmentTime >= afternoonFrom && appointmentTime <= afternoonTo;
        } else if (!afternoonFrom && !morningFrom && dayWorkingHours.absence !== 'nema odsustva') {
          return appointmentTime >= 80 && appointmentTime <= 160;
        }
      }

      return false;
    });
  });
};

type SetModalInfoType = React.Dispatch<
  React.SetStateAction<{ isVisible: boolean; message: string }>
>;

export const handleCloseModal = (setModalInfo: SetModalInfoType) => () => {
  setModalInfo({ isVisible: false, message: '' });
};

export const totalPrice = (selectedServices: any[], allServices: any[] | undefined) => {
  return selectedServices.reduce((sum, serviceId) => {
    const service = allServices?.find((s) => s.id === serviceId);
    if (service) {
      return sum + (service.price || 0);
    }
    return sum;
  }, 0);
};

export const totalPrices = (state: any[]) =>
  state.reduce((total: any, service: { price: any }) => total + (service.price || 0), 0);

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const animationClass = (isVisible: boolean) =>
  isVisible ? 'ease-out duration-300 opacity-100' : 'ease-in duration-200 opacity-0';
