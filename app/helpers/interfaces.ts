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

export interface InfoModalType {
  isVisible: boolean;
  text: string;
}

export interface AppointmentInfoType {
  isVisible: boolean;
  appointmentData?: any;
}

export interface ErrorModalType extends InfoModalType {} //showInfoModal: InfoModalType; setShowInfoModal: React.Dispatch<React.SetStateAction<InfoModalType>>;

export interface GenerateSlotsRowProps {
  weekDays: WeekDay[]; // day: string; date: string;
  weekDates: string[];
  dataLoaded: boolean;
  workingHours: WorkingHoursStateProps[]; // id?: string; employeeId?: string; date: string; day: string; morningFrom: string; morningTo: string; afternoonFrom: string; afternoonTo: string; absence: string;
  appointments: AppointmentProps[]; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentProps[]>>; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  time: string;
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  clients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  slotDuration: number;
  showRow: boolean;
  index: number;
  selectedEmployee: string;
  setErrorModal: React.Dispatch<React.SetStateAction<any>>;
}

export interface SlotProps {
  time: string;
  dataLoaded: boolean;
  workingHours: WorkingHoursStateProps[]; // id?: string; employeeId?: string; date: string; day: string; morningFrom: string; morningTo: string; afternoonFrom: string; afternoonTo: string; absence: string;
  appointments: AppointmentProps[]; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: ServicesProps[]; // id: string; name: string; phoneNumber: string; email: string;
  clients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  slotDuration: number;
  setShowConfirmation: Function;
  weekDays: WeekDay[]; // day: string; date: string;
}

export interface WorkingHoursStateProps {
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

export interface WorkingHoursContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export type ChildrenProps = {
  children: ReactNode;
};

export interface AbsenceHoursLabelProps {
  time: string;
  absence: string;
}

export interface ArrowButtonsProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface AppointmentBtnProps {
  onClick: () => void;
  time: string;
}

export interface FormButtonProps {
  onClick: (event: React.FormEvent) => void;
}

export interface SideBarBtnProps {
  children: ReactNode;
  onClick: (event: React.FormEvent) => void;
}

export interface CustomTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface UnworkingHoursLabelProps {
  time: string;
}

export interface FormListContainerProps {
  children: ReactNode;
  list: {
    id: number;
    name: string;
  };
  selectedName: string;
  onClick: () => void;
}

export interface AppointmentModalProps {
  totalPrice: (services: string[], servicesList: ServicesProps[]) => number;
  services: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  setAppontmentInfo: React.Dispatch<React.SetStateAction<AppointmentInfoType>>;
  appontmentInfo: AppointmentInfoType;
}

export interface ConfirmDeletationModalProps {
  subject: string;
  isVisible: boolean;
  SetState: React.Dispatch<
    React.SetStateAction<{ isVisible: boolean; delete: boolean; appointmentId: string }>
  >;
  submit: (event: React.FormEvent<Element>) => void;
}

export interface ModalContainerProps {
  isVisible: boolean;
  onClose: (event: React.FormEvent<Element>) => void;
  children?: React.ReactNode;
}

export interface InfoModalProps {
  showInfoModal: InfoModalType; // isVisible: boolean; text: string;
  setShowInfoModal: React.Dispatch<React.SetStateAction<InfoModalType>>; // isVisible: boolean; text: string;
}

export interface ErrorModalProps {
  errorModal: ErrorModalType; // isVisible: boolean; text: string;
  setErrorModal: React.Dispatch<React.SetStateAction<ErrorModalType>>; // isVisible: boolean; text: string;
}

export interface DeleteBtnProps {
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CloseBtnProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

export interface BackdropProps {
  onClick: (event: React.FormEvent) => void;
  isVisible: boolean;
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

export interface SearchInputProps {
  dataSearchQuery: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export interface ClientsDataListProps {
  filteredClients: ClientProps[]; // id: string; name: string; phoneNumber: string; email: string;
  newAppointment: NewAppointmentProps; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
  setNewAppointment: React.Dispatch<React.SetStateAction<NewAppointmentProps>>; // id: string; date: string; day: string; time: string; client: string; services: string[]; price: number; employee: string; serviceProvider: string;
}

export interface PrimaryTitleProps {
  value: string;
}

export interface FormContainerProps {
  displayForm: boolean;
  id: string;
  handleFormClose: (event: React.FormEvent) => void;
  children: React.ReactNode;
}

export interface ServiceDataListProps {
  filteredServices: ServicesProps[]; // id: string; name: string; description: string; duration?: number; price: number;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
