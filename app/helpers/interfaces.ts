export interface AppointmentProps {
  id: string;
  day: string;
  time: string;
  client: string;
  date: string;
  services: string[];
  price: number;
  employee: string;
  serviceProvider: string;
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
  clients: any;
  slotDuration: number;
  onDoubleClick: any;
}

export interface CalendarFormsInitProps {
  clientForm: boolean;
  serviceForm: boolean;
  backdrop: boolean;
  post: boolean;
}

type NewAppointmentProps = {
  id: string;
  date: string;
  day: string;
  time: string;
  client: string;
  services: string[];
  price: number;
  employee: string;
  serviceProvider: string;
};

export interface CalendarFormsProps {
  displayForm: CalendarFormsInitProps;
  setDisplayForm: React.Dispatch<React.SetStateAction<CalendarFormsInitProps>>;
  newAppointment: NewAppointmentProps;
  setNewAppointment: React.Dispatch<React.SetStateAction<NewAppointmentProps>>;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

export interface SubmitBtnProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
  buttonText: string;
}

export interface ServiceProviderProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface EmployeeProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  service_provider: String;
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

export interface AppointmentInfoType {
  isVisible: boolean;
  appointmentData?: any;
}

export interface ErrorModalType {
  isVisible: boolean;
  text: string;
}

export interface InfoModalType {
  isVisible: boolean;
  text: string;
}

export interface GenerateSlotsRowProps {
  weekDays: any[]; // Adjust the types as needed
  dataLoaded: boolean;
  isWorkingHour: Function;
  appointments: any[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentProps[]>>;
  time: string;
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: any[]; // Adjust the types as needed
  clients: any[]; // Adjust the types as needed
  slotDuration: number;
  showRow: any;
  index: number;
  selectedEmployee: string;
  setErrorModal: React.Dispatch<React.SetStateAction<any>>;
}
