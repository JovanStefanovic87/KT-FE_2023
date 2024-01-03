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
import {
  AppointmentProps,
  ServicesProps,
  CalendarFormsInitProps,
  AppointmentInfoType,
  ClientProps,
  ServiceProviderProps,
  EmployeeProps,
  ErrorModalType,
  WorkingHoursProps,
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
import AppointmentModal from '../ui/modals/AppointmentModal';
import ErrorModal from '../ui/modals/ErrorModal';
import Spinner from '../ui/Spinner';
import UnsetWorkingHoursText from '../ui/text/UnsetWorkingHoursText';
import SlotsContainer from '../ui/containers/SlotsContainer';
import ArrowBtn from '../ui/buttons/ArrowBtn';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const [serviceProviders, setServiceProviders] = useState<ServiceProviderProps[]>([]);
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHoursProps[]>([]);
  const [services, setServices] = useState<ServicesProps[]>([]);
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

  const calendar = () => (
    <>
      <Container dataLoaded={dataLoaded}>
        <SelectContainer>
          <ArrowBtn
            onClick={() => setSelectedWeek(selectedWeek - 1)}
            disabled={selectedWeek === 0}
            direction='left'
          />
          <WeekSelect
            value={selectedWeek}
            onChange={(value) => setSelectedWeek(value)}
            weekOptions={weekOptions}
            selectStyle='p-2.5 bg-ktHeaderGray border border-ktAppointmentBg text-ktOrange text-sm lg:text-base rounded-lg  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 cursor-pointer'
          />

          <ArrowBtn
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            disabled={selectedWeek === weekOptions.length - 1}
            direction='right'
          />
        </SelectContainer>
        <SlotsContainer>
          <DaysRow weekDays={weekDays} />
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

          {dataLoaded && workingHours.length === 0 && <UnsetWorkingHoursText />}
        </SlotsContainer>
        <SelectContainer>
          <SelectUser
            selectedUser={selectedServiceProvider || ''}
            onSelectUser={(user) => {
              setSelectedServiceProvider(user);
            }}
            id='selectedServiceProvider'
            data={serviceProviders}
          />

          <SelectUser
            selectedUser={selectedEmployee || ''}
            onSelectUser={(user) => setSelectedEmployee(user)}
            id='selectedEmployee'
            data={employees}
          />
        </SelectContainer>
      </Container>
    </>
  );

  const assets = () => (
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
    </>
  );

  return (
    <>
      <Spinner dataLoaded={dataLoaded} />
      {assets()}
      {calendar()}
    </>
  );
};

export default Calendar;
