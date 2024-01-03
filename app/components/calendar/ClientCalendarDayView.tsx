/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { format, addDays, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setEmployeeId } from '../../globalRedux/features/employee/employeeSlice';
import 'animate.css';
import {
  AppointmentProps,
  ServicesProps,
  CalendarFormsInitProps,
  AppointmentInfoType,
  ServiceProviderProps,
  EmployeeProps,
  ErrorModalType,
  WorkingHoursProps,
  WeekDay,
} from '@/app/helpers/interfaces';
import { displayFormInit, newAppointmentInit } from './initStates';
import {
  fetchCleintCalendarInitData,
  fetchEmployeesData,
  addNewAppointment,
  fetchAppointments,
  fetchEmployeeWorkingHours,
} from '@/app/helpers/apiHandlers';
import GenerateSlotsRow from './GenerateSlotsRow';
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

const generateTimeSlots = (slotInterval: number): string[] => {
  const timeSlots: string[] = [];
  const startTime = '00:00';
  const endTime = '23:59';

  let currentTime = startTime;
  while (currentTime <= endTime) {
    timeSlots.push(currentTime);

    // Increment currentTime by the slotInterval
    const [hours, minutes] = currentTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const nextTotalMinutes = totalMinutes + slotInterval;
    const nextHours = Math.floor(nextTotalMinutes / 60);
    const nextMinutes = nextTotalMinutes % 60;
    currentTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes
      .toString()
      .padStart(2, '0')}`;
  }
  return timeSlots;
};

const generateWeekOptions = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;

  const weeks = [];
  let currentDate = startOfWeek(today, { weekStartsOn: 1 }); // Start from the current week, with Monday as the starting day

  while (currentDate.getFullYear() <= nextYear) {
    const endOfWeekDate = endOfWeek(currentDate);

    weeks.push({
      label: `Nedelja ${format(currentDate, 'w')} (${format(currentDate, 'dd.MM.yy.')} - ${format(
        endOfWeekDate,
        'dd.MM.yy.',
      )})`,
      start: currentDate,
      end: endOfWeekDate,
    });

    currentDate = addWeeks(currentDate, 1);
  }
  return weeks;
};

const generateWeekDays = (): WeekDay[] => {
  const weekDays: WeekDay[] = [];
  const today = new Date();
  const day = format(today, 'EEE');
  const date = format(today, 'dd.MM.yy');

  weekDays.push({ day, date });

  return weekDays;
};

export const totalPrice = (selectedServices: any[], allServices: any[] | undefined) => {
  return selectedServices.reduce((sum, serviceId) => {
    const service = allServices?.find((s) => s.id === serviceId);
    if (service) {
      return sum + (service.price || 0);
    }
    return sum;
  }, 0);
};

const hasWorkingHourInHour = (
  hour: string,
  weekDays: WeekDay[],
  timeSlots: string[],
  workingHours: any,
): boolean => {
  return weekDays.some((dayInfo) => {
    const dayWorkingHours = workingHours.find((wh: any) => wh.day === dayInfo.day);
    if (!dayWorkingHours) {
      return false; // No working hours information for the given day
    }

    return timeSlots.some((time) => {
      // Check for "HH:mm" format or "nn:nn" format
      const isValidTime = (timeStr: string) => {
        return (
          /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr) || /^\d{1,2}:\d{1,2}$/.test(timeStr)
        );
      };

      const startsWithHour = isValidTime(time) && time.startsWith(hour);
      if (startsWithHour) {
        const appointmentTime = parseInt(time.replace(':', ''), 10);
        const morningFrom = parseInt(dayWorkingHours.morningFrom.replace(':', ''), 10);
        const morningTo = parseInt(dayWorkingHours.morningTo.replace(':', ''), 10);
        const afternoonFrom = parseInt(dayWorkingHours.afternoonFrom.replace(':', ''), 10);
        const afternoonTo = parseInt(dayWorkingHours.afternoonTo.replace(':', ''), 10);

        // Check if the appointment time is within the working hours range
        if (morningFrom && afternoonTo) {
          return appointmentTime >= morningFrom && appointmentTime <= afternoonTo;
        } else if (morningFrom) {
          return appointmentTime >= morningFrom && appointmentTime <= morningTo;
        } else if (afternoonFrom) {
          return appointmentTime >= afternoonFrom && appointmentTime <= afternoonTo;
        } else if (!afternoonFrom && !morningFrom && dayWorkingHours.absence !== 'nema odsustva') {
          return appointmentTime >= 80 && appointmentTime <= 160;
        }
      }

      return false;
    });
  });
};

const ClientCalendarDayView: React.FC = () => {
  const dispatch = useDispatch();
  const firstRun = useRef(true);
  const [serviceProviders, setServiceProviders] = useState<ServiceProviderProps[]>([]);
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHoursProps[]>([]);
  const [services, setServices] = useState<ServicesProps[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(0);
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
  const weekDays = generateWeekDays();
  const weekDates = weekDays.map((day) => day.date);
  const slotDuration = 60; //Will come from server
  const timeSlots = generateTimeSlots(slotDuration);
  let isMounted = true;

  useEffect(() => {
    fetchCleintCalendarInitData(
      setServices,
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
  }, [selectedEmployee]);

  useEffect(() => {
    fetchEmployeeWorkingHours(setWorkingHours, selectedEmployee, weekDates);
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
    <Container dataLoaded={dataLoaded}>
      <SelectContainer>
        <ArrowBtn
          onClick={() => setSelectedWeek(selectedWeek - 1)}
          disabled={selectedWeek === 0}
          direction='left'
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
            workingHours,
            appointments,
            setAppointments,
            time,
            handleAppointmentButton,
            setDisplayForm,
            services,
            slotDuration,
            showRow,
            index,
            selectedEmployee,
            setErrorModal,
          });
        })}

        {workingHours.length === 0 && <UnsetWorkingHoursText />}
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

export default ClientCalendarDayView;
