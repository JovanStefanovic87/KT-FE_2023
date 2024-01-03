import React, { ReactNode } from 'react';

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
  totalDuration?: number;
}

export interface WorkingHours {
  [day: string]: { start: string; end: string };
}

export interface DayTranslations {
  [day: string]: string;
}

export interface ServicesProps {
  id: string;
  name: string;
  description: string;
  duration?: number;
  price: number;
}

export interface AppointmentServicesProps {
  appointmentServices: (
    | ServicesProps // id: string; name: string; description: string; duration?: number; price: number;
    | { id: string; name: string; duration: number; price: number }
  )[];
}

export interface AppointmentLabelProps {
  appointment?: AppointmentProps; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  services: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  time?: string;
  clients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  slotDuration: number;
  onDoubleClick: React.MouseEventHandler<HTMLDivElement>;
}

export interface AppointmentClientName {
  appointment?: AppointmentProps; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  clients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
}

export interface CalendarFormsInitProps {
  clientForm: boolean;
  serviceForm: boolean;
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
  displayForm: CalendarFormsInitProps; // clientForm: boolean; serviceForm: boolean; post: boolean;
  setDisplayForm: React.Dispatch<React.SetStateAction<CalendarFormsInitProps>>; // clientForm: boolean; serviceForm: boolean; post: boolean;
  newAppointment: NewAppointmentProps; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  setNewAppointment: React.Dispatch<React.SetStateAction<NewAppointmentProps>>; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
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

export interface GenerateSlotsRowProps {
  weekDays: WeekDay[]; // day: string; date: string;
  weekDates: string[];
  dataLoaded?: boolean;
  workingHours: WorkingHoursProps[]; // id?: string; employeeId?: string; date: string; day: string; morningFrom: string; morningTo: string; afternoonFrom: string; afternoonTo: string; absence: string;
  appointments: AppointmentProps[]; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentProps[]>>; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  time: string;
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  clients?: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  slotDuration: number;
  showRow: boolean;
  index: number;
  selectedEmployee: string;
  setErrorModal: React.Dispatch<React.SetStateAction<any>>;
}

export interface SlotProps {
  time: string;
  dataLoaded?: boolean;
  workingHours: WorkingHoursProps[]; // id?: string; employeeId?: string; date: string; day: string; morningFrom: string; morningTo: string; afternoonFrom: string; afternoonTo: string; absence: string;
  appointments: AppointmentProps[]; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: ServicesProps[]; // id: string; name: string; phoneNumber: string; email: string;
  clients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  slotDuration: number;
  setShowConfirmation: Function;
  weekDays: WeekDay[]; // day: string; date: string;
}

export interface WorkingHoursProps {
  id?: string;
  employeeId?: string;
  date: string;
  day: string;
  morningFrom: string;
  morningTo: string;
  afternoonFrom: string;
  afternoonTo: string;
  absence: string | any;
}

export interface ShowConfirmation {
  isVisible: boolean;
  delete: boolean;
  appointmentId: string;
}

export type ChildrenProps = {
  children: ReactNode;
};

export interface AppointmentModalProps {
  totalPrice: (services: string[], servicesList: ServicesProps[]) => number;
  services: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  setAppontmentInfo: React.Dispatch<React.SetStateAction<AppointmentInfoType>>;
  appontmentInfo: AppointmentInfoType;
}

export interface AppointmentTimeRangeProps {
  appointment: AppointmentProps; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
}

export interface SelectUserProps {
  selectedUser: string;
  onSelectUser: (user: string) => void;
  id: string;
  data: EmployeeProps[] | ServiceProviderProps[]; // id: string; name: string; phoneNumber: string; email: string; service_provider: String; && // id: string; name: string; phoneNumber: string; email: string;
}

export interface DaysRowProps {
  weekDays: WeekDay[]; // day: string; date: string;
}

export interface ClientsListProps {
  clients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  newAppointment: NewAppointmentProps; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  setNewAppointment: React.Dispatch<React.SetStateAction<NewAppointmentProps>>; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ServiceListProps {
  services: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface InfoModalType {
  isVisible: boolean;
  text: string;
}

export interface ErrorModalType extends InfoModalType {} //showInfoModal: InfoModalType; setShowInfoModal: React.Dispatch<React.SetStateAction<InfoModalType>>;
