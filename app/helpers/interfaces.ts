export interface Appointment {
  id: string;
  day: string;
  time: string;
  duration: string;
  genericName: string;
  genericService: string;
  date: string; // Add the date property
}

export interface WorkingHours {
  [day: string]: { start: string; end: string };
}

export interface DayTranslations {
  [day: string]: string;
}

export interface AppointmentLabelProps {
  appointment?: Appointment;
}
