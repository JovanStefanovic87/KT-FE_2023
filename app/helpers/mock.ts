import { AppointmentProps, WorkingHours, DayTranslations } from './interfaces';

export const workingHours: WorkingHours = {
  Sun: { start: 'nn:nn', end: 'nn:nn' },
  Mon: { start: '09:00', end: '17:00' },
  Tue: { start: '09:00', end: '17:00' },
  Wed: { start: '09:00', end: '17:00' },
  Thu: { start: '09:00', end: '17:00' },
  Fri: { start: '09:00', end: '19:00' },
  Sat: { start: '09:00', end: '12:00' },
};

export const initialAppointmentsWeek32: AppointmentProps[] = [
  {
    // Replace with actual date
    id: 'sa',
    day: 'Mon',
    time: '09:00',
    client: 'John Doe',
    date: '22.10.2023.',
    services: ['Haircut'],
    price: 200,
    employee: 'adam',
    serviceProvider: 'adamshe',
  },
];

export const dayTranslations: DayTranslations = {
  Mon: 'Pon', // Monday -> Pon
  Tue: 'Uto', // Tuesday -> Uto
  Wed: 'Sre', // Wednesday -> Sre
  Thu: 'Čet', // Thursday -> Čet
  Fri: 'Pet', // Friday -> Pet
  Sat: 'Sub', // Saturday -> Sub
  Sun: 'Ned', // Sunday -> Ned
};
