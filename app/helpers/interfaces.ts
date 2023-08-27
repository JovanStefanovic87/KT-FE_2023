export interface Appointment {
  id: string;
  day: string;
  time: string;
  duration: string;
  clientName: string;
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

export interface ServecesProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
}
