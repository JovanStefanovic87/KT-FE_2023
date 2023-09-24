import { useState, useEffect } from 'react';
import { format, addDays, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
/* import { workingHours } from './mock'; */
import { WeekDay } from '../helpers/interfaces';

export function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobile = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
}

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

export const handleSelectChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<string | number | null>>
) => {
  const selectedValue = event.target.value;
  setState(selectedValue);
};

export const generateWeekDays = async (
  selectedWeekIndex: number,
  workingHours: any[], // Pass your working hours array as a parameter
  selectedEmployee: string // Pass the selected employee
): Promise<WeekDay[]> => {
  const today = new Date();
  const dayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const startOfWeek = addDays(today, -dayOffset);
  const currentWeekStart = addWeeks(startOfWeek, selectedWeekIndex);

  while (workingHours.length === 0) {
    // Wait for workingHours data to be available
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
  }

  // Flatten the nested array structure
  const flattenedWorkingHours = workingHours.flat();

  const weekDays: WeekDay[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(currentWeekStart, i);
    const day = format(currentDate, 'EEE');
    const date = format(currentDate, 'dd.MM.yy');

    // Find the working hours for the current date in the flattened array
    const workingHour = flattenedWorkingHours.find(
      wh => wh.date === format(currentDate, 'dd.MM.yy') && wh.employeeId === selectedEmployee
    );

    if (
      (workingHour &&
        workingHour?.morning_from !== '--:--' &&
        workingHour?.morning_to !== '--:--') ||
      (workingHour?.afternoon_from !== '--:--' && workingHour?.afternoon_to !== '--:--')
    ) {
      weekDays.push({ day, date });
    }
  }
  return weekDays;
};

export const calculateSlotsForDuration = (
  appointmentDuration: number,
  slotDuration: number
): number => Math.ceil(appointmentDuration / slotDuration);

export const isWorkingHour = (day: string, time: string, workingHours: any): boolean => {
  const dayWorkingHours = workingHours.find((wh: any) => wh.day === day);

  if (!dayWorkingHours) {
    return false; // No working hours information for the given day
  }

  const appointmentTime = parseInt(time.replace(':', ''), 10);

  const morningFrom = parseInt(dayWorkingHours.morning_from.replace(':', ''), 10);
  const morningTo = parseInt(dayWorkingHours.morning_to.replace(':', ''), 10);
  const afternoonFrom = parseInt(dayWorkingHours.afternoon_from.replace(':', ''), 10);
  const afternoonTo = parseInt(dayWorkingHours.afternoon_to.replace(':', ''), 10);

  // Check if the appointment time falls within the morning or afternoon working hours
  if (
    (appointmentTime >= morningFrom && appointmentTime <= morningTo) ||
    (appointmentTime >= afternoonFrom && appointmentTime <= afternoonTo)
  ) {
    return true;
  }
  return false;
};

export const hasWorkingHourInHour = (
  hour: string,
  weekDays: WeekDay[],
  timeSlots: string[],
  workingHours: any
): boolean => {
  return weekDays.some(dayInfo => {
    const dayWorkingHours = workingHours.find((wh: any) => wh.day === dayInfo.day);
    if (!dayWorkingHours) {
      return false; // No working hours information for the given day
    }

    return timeSlots.some(time => {
      const startsWithHour = time.startsWith(hour);
      if (startsWithHour) {
        const appointmentTime = parseInt(time.replace(':', ''), 10);
        const morningFrom = parseInt(dayWorkingHours.morning_from.replace(':', ''), 10);
        const afternoonTo = parseInt(dayWorkingHours.afternoon_to.replace(':', ''), 10);

        // Check if the appointment time is within the working hours range
        return appointmentTime >= morningFrom && appointmentTime <= afternoonTo;
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
    const service = allServices?.find(s => s.id === serviceId);
    if (service) {
      return sum + (service.price || 0);
    }
    return sum;
  }, 0);
};

export const totalPrices = (state: any[]) =>
  state.reduce((total: any, service: { price: any }) => total + (service.price || 0), 0);
