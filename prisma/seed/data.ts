const serviceProviderTypes = [
  { name: 'Barber' },
  { name: 'Male hairdresser' },
  { name: 'Female hairdresser' },
  { name: 'Dentist' },
];

const absenceTypes = [
  { name: 'SickLeave' },
  { name: 'Vacation' },
  { name: 'FreeDay' },
  { name: 'Holiday' },
];

const serviceOptions = [
  { name: 'Favorit', description: 'Service is marked as favorite, and will be at top of the list' },
  {
    name: 'AlwaysSelected',
    description: 'Service is always pre-selected in list when scheduling appointment',
  },
  { name: 'ClientsSeePrice', description: 'Clients can see price of the service' },
  { name: 'ClientsSeeService', description: 'Clients can see service' },
  { name: 'InUse', description: 'Service is in use' },
];

const systemOptions = [
  { name: 'CalendarFieldDuration', description: 'Duration of the calendar field in minutes' },
  {
    name: 'MaxReservationsPerMonth',
    description: 'Maximum number of reservations per month per client',
  },
  { name: 'CalendarVisibleToOthers', description: 'Calendar is visible to other employees' },
  {
    name: 'OthersSchedulingForMe',
    description: 'Other employees can schedule for me in my calendar',
  },
  {
    name: 'OthersCancelForMe',
    description: 'Other employees can cancel appointments for me in my calendar',
  },
  {
    name: 'TimeBeforeAppointmentToCancel',
    description: 'How many hours before appointment can be canceled',
  },
  {
    name: 'TimeBeforeAppointmentToSendReminder',
    description: 'How many hours before appointment to send reminder',
  },
  {
    name: 'TimeBeforeAppointmentNotToSendReminder',
    description: 'How many hours before appointment if scheduled will not trigger sending reminder',
  },
  {
    name: 'SendSmsOfSuccessfulScheduling',
    description: 'Send SMS to client when appointment is scheduled',
  },
  {
    name: 'SendSmsOfSuccessfulCanceling',
    description: 'Send SMS to client when appointment is canceled',
  },
  {
    name: 'SendSmsOfCancelation',
    description: 'Send SMS to employee when appointment is canceled',
  },
  { name: 'SendSmsOfSheduling', description: 'Send SMS to employee when appointment is scheduled' },
  {
    name: 'TimeFromNowToNotifyScheduling',
    description: 'How many hours from now to notify employee that appointment is scheduled',
  },
];

module.exports = {
  serviceProviderTypes,
  absenceTypes,
  serviceOptions,
  systemOptions,
};
