export interface Appointment {
  id: string;
  day: string;
  time: string;
  duration: string;
  clientName: string;
  date: string; // Add the date property
}

export interface NewAppointment {
  id: string;
  day: string;
  time: string;
  clientName: string;
  date: string;
  services: string[];
}

export interface SelectedSlotProps {
  time: string;
  day: string;
  date: string;
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

export interface ServiceFormProps {
  displayForm: {
    clientForm: boolean;
    serviceForm: boolean;
    backdrop: boolean;
  };
  setDisplayForm: React.Dispatch<
    React.SetStateAction<{
      clientForm: boolean;
      serviceForm: boolean;
      backdrop: boolean;
    }>
  >;
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ServecesProps {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface ClientFormProps {
  displayForm: {
    clientForm: boolean;
    serviceForm: boolean;
    backdrop: boolean;
  };
  setDisplayForm: React.Dispatch<
    React.SetStateAction<{
      clientForm: boolean;
      serviceForm: boolean;
      backdrop: boolean;
    }>
  >;
  selectedClient: string;
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
}

export interface ClientProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}
