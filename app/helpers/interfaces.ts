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
  weekDays: WeekDay[];
  weekDates: string[];
  dataLoaded: boolean;
  workingHours: any;
  appointments: any[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentProps[]>>;
  time: string;
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: any[];
  clients: any[];
  slotDuration: number;
  showRow: any;
  index: number;
  selectedEmployee: string;
  setErrorModal: React.Dispatch<React.SetStateAction<any>>;
}

export interface SlotProps {
  time: string;
  dataLoaded: boolean;
  workingHours: any;
  appointments: any[];
  handleAppointmentButton: Function;
  setDisplayForm: Function;
  services: any[];
  clients: any[];
  slotDuration: number;
  setShowConfirmation: Function;
  weekDays: WeekDay[];
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
  absence: string;
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
  totalPrice: (services: string[], servicesList: any[]) => number;
  services: any[];
  setAppontmentInfo: React.Dispatch<React.SetStateAction<AppointmentInfoType>>;
  appontmentInfo: AppointmentInfoType;
}

export interface ConfirmDeletationModalProps {
  subject: string;
  isVisible: boolean;
  SetState: React.Dispatch<
    React.SetStateAction<{ isVisible: boolean; delete: boolean; appointmentId: string }>
  >;
  submit: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface InfoModalProps {
  showInfoModal: InfoModalType;
  setShowInfoModal: React.Dispatch<React.SetStateAction<InfoModalType>>;
}

export interface ErrorModalProps {
  errorModal: ErrorModalType;
  setErrorModal: React.Dispatch<React.SetStateAction<ErrorModalType>>;
}

export interface DeleteBtnProps {
  onDelete: React.Dispatch<React.SetStateAction<any>>;
}

export interface CloseBtnProps {
  onClose: React.Dispatch<React.SetStateAction<any>>;
}

export interface BackdropProps {
  onClick: (event: React.FormEvent) => void;
  isVisible: boolean;
}
