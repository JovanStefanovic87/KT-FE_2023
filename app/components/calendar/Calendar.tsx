/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setEmployeeId } from '../../globalRedux/features/employee/employeeSlice';
import 'animate.css';
import {
  generateWeekOptions,
  generateTimeSlots,
  generateWeekDays,
  totalPrice,
  hasWorkingHourInHour,
} from '@/app/helpers/universalFunctions';
import { dayTranslations } from '@/app/helpers/mock';
import {
  AppointmentProps,
  ServecesProps,
  CalendarFormsInitProps,
  AppointmentInfoType,
  ClientProps,
  ServiceProviderProps,
  EmployeeProps,
  ErrorModalType,
  WorkingHoursStateProps,
} from '@/app/helpers/interfaces';
import { displayFormInit, newAppointmentInit } from './initStates';
import {
  fetchCalendarInitData,
  fetchEmployeesData,
  addNewAppointment,
  fetchAppointments,
  fetchEmployeeWorkingHours,
} from '@/app/helpers/apiHandlers';
import GenerateSlotsRow from './GenerateSlotsRow';
import ClientForm from './ClientForm';
import WeekSelect from '../ui/select/WeekSelector';
import SelectUser from '../ui/select/SelectUser';
import Container from './Container';
import DaysRow from './DaysRow';
import SelectContainer from '../ui/select/SelectContainer';
import ServiceForm from './ServiceForm';
import ArrowButtonLeft from '../ui/buttons/ArrowButtonLeft';
import ArrowButtonRight from '../ui/buttons/ArrowButtonRight';
import AppointmentModal from '../ui/modals/AppointmentModal';
import ErrorModal from '../ui/modals/ErrorModal';
import Spinner from '../ui/Spinner';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const [serviceProviders, setServiceProviders] = useState<ServiceProviderProps[]>([]);
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHoursStateProps[]>([]);
  const [services, setServices] = useState<ServecesProps[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [newAppointment, setNewAppointment] = useState<AppointmentProps>(newAppointmentInit);
  const weekOptions = generateWeekOptions();
  const [displayForm, setDisplayForm] = useState<CalendarFormsInitProps>(displayFormInit);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [errorModal, setErrorModal] = useState<ErrorModalType>({ isVisible: false, text: '' });
  const [appontmentInfo, setAppontmentInfo] = useState<AppointmentInfoType>({
    isVisible: false,
    appointmentData: '',
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const weekDays = generateWeekDays(selectedWeek);
  const weekDates = weekDays.map((day) => day.date);
  const slotDuration = 60; //Will come from server
  const timeSlots = generateTimeSlots(slotDuration);
  let isMounted = true;

  useEffect(() => {
    fetchCalendarInitData(
      setServices,
      setClients,
      setServiceProviders,
      setSelectedServiceProvider,
      setDataLoaded,
    );
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    fetchAppointments(setAppointments, selectedEmployee);
    const employeeId = selectedEmployee;
    dispatch(setEmployeeId(employeeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee]);

  useEffect(() => {
    fetchEmployeeWorkingHours(setWorkingHours, selectedEmployee, weekDates);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee, selectedWeek]);

  useEffect(() => {
    if (selectedServiceProvider) {
      fetchEmployeesData(setEmployees, setSelectedEmployee, selectedServiceProvider);
    }
  }, [selectedServiceProvider]);

  const handleAddAppointment = useCallback(async () => {
    addNewAppointment(
      newAppointment,
      selectedEmployee,
      selectedServiceProvider,
      setAppointments,
      setAppontmentInfo,
      setNewAppointment,
      newAppointmentInit,
      setErrorModal,
    );
  }, [newAppointment, selectedEmployee, selectedServiceProvider]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    displayForm.post && handleAddAppointment();
    setDisplayForm((prevState) => ({
      ...prevState,
      post: false,
    }));
  }, [displayForm.post, handleAddAppointment]);

  const handleAppointmentButton = (day: string, time: string, date: string) => {
    setNewAppointment({
      ...newAppointment,
      id: `${day}${time}${date}${selectedEmployee}`,
      day,
      time,
      date,
    });
  };

  return (
    <>
      {appontmentInfo.appointmentData && (
        <AppointmentModal
          appontmentInfo={appontmentInfo}
          setAppontmentInfo={setAppontmentInfo}
          totalPrice={totalPrice}
          services={services}
        />
      )}
      <ErrorModal setErrorModal={setErrorModal} errorModal={errorModal} />
      <ClientForm
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        selected={selectedClient}
        setSelected={setSelectedClient}
      />
      <ServiceForm
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        selected={selectedServices}
        setSelected={setSelectedServices}
      />
      <Container>
        <SelectContainer>
          <ArrowButtonLeft
            onClick={() => setSelectedWeek(selectedWeek - 1)}
            disabled={selectedWeek === 0}
          />
          <WeekSelect
            value={selectedWeek}
            onChange={(value) => setSelectedWeek(value)}
            weekOptions={weekOptions}
            selectStyle='p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer'
          />

          <ArrowButtonRight
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            disabled={selectedWeek === weekOptions.length - 1}
          />
        </SelectContainer>
        <div className='flex px-2 relative'>
          <div className='h-calHeight w-calendarSlots overflow-auto border-2 bg-ktBg border-solid border-white mt-3 mb-3 mx-auto relative'>
            <DaysRow>
              {weekDays.map((dayInfo) => (
                <div
                  key={dayInfo.day}
                  className='flex justify-center items-center h-slotDayHeight w-slotsWidth mx-0.5 mt-1 min-w-slotsWidth text-orange-200 font-bold border-2 border-stone-500 border-solid bg-gray-800'
                >
                  {dayTranslations[dayInfo.day]} ({dayInfo.date})
                </div>
              ))}
            </DaysRow>
            {timeSlots.map((time, index) => {
              const hour = time.split(':')[0];
              const showRow = hasWorkingHourInHour(hour, weekDays, timeSlots, workingHours);

              return GenerateSlotsRow({
                weekDays,
                weekDates,
                dataLoaded,
                workingHours,
                appointments,
                setAppointments,
                time,
                handleAppointmentButton,
                setDisplayForm,
                services,
                clients,
                slotDuration,
                showRow,
                index,
                selectedEmployee,
                setErrorModal,
              });
            })}

            {!dataLoaded && <Spinner />}

            {dataLoaded && workingHours.length === 0 && (
              <div className='w-full h-2/4 flex justify-center items-end absolute'>
                <p className='text-red-500 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl p-2 md:p-4 lg:p-6 xl:p-8'>
                  Radno vreme nije podeseno
                </p>
              </div>
            )}
          </div>
        </div>
        <SelectContainer>
          <SelectUser
            selectedUser={selectedServiceProvider || ''}
            onSelectUser={(user) => {
              setSelectedServiceProvider(user);
            }}
            id='selectedServiceProvider'
          >
            {serviceProviders.map((prov) => (
              <option key={prov.id} value={prov.name}>
                {prov.name}
              </option>
            ))}
          </SelectUser>

          <SelectUser
            selectedUser={selectedEmployee || ''}
            onSelectUser={(user) => setSelectedEmployee(user)}
            id='selectedEmployee'
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </SelectUser>
        </SelectContainer>
      </Container>
    </>
  );
};

export default Calendar;
