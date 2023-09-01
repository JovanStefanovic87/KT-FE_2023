export interface AppointmentProps {
  id: string;
  day: string;
  time: string;
  client: string;
  date: string;
  services: string[];
}

export interface WorkingHours {
  [day: string]: { start: string; end: string };
}

export interface DayTranslations {
  [day: string]: string;
}

export interface AppointmentLabelProps {
  appointment?: AppointmentProps;
  services: any;
  slotDuration: number;
}

export interface CalendarFormsInitProps {
  clientForm: boolean;
  serviceForm: boolean;
  backdrop: boolean;
  post: boolean;
}

export interface CalendarFormsProps {
  displayForm: CalendarFormsInitProps;
  setDisplayForm: React.Dispatch<React.SetStateAction<CalendarFormsInitProps>>;
  newAppointment: {
    id: string;
    date: string;
    day: string;
    time: string;
    client: string;
    services: string[];
  };
  setNewAppointment: React.Dispatch<
    React.SetStateAction<{
      id: string;
      date: string;
      day: string;
      time: string;
      client: string;
      services: string[];
    }>
  >;
}

export interface ServecesProps {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface ClientProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface WeekDay {
  day: string;
  date: string;
}
