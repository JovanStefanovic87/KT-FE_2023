/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { addDays } from 'date-fns';
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
import SelectUser from '../ui/select/SelectUser';
import Container from './Container';
import DaysRow from './DaysRow';
import SelectContainer from '../ui/containers/SelectContainer';
import ServiceForm from './ServiceForm';
import AppointmentModal from '../ui/modals/AppointmentModal';
import ErrorModal from '../ui/modals/ErrorModal';
import Spinner from '../ui/Spinner';
import UnsetWorkingHoursText from '../ui/text/UnsetWorkingHoursText';
import SlotsContainer from '../ui/containers/SlotsContainer';
import ArrowBtn from '../ui/buttons/ArrowBtn';

interface DayObject {
  day: string;
  date: string;
}

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

const generateDayObject = (selectedDay: Date): DayObject[] => {
  const serbianLatinLocale: string = 'sr-Latn-RS';

  const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const day: string = selectedDay.toLocaleDateString(serbianLatinLocale, dayOptions);
  const date: string = selectedDay.toLocaleDateString(serbianLatinLocale, dateOptions);

  return [{ day, date }];
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
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const [newAppointment, setNewAppointment] = useState<AppointmentProps>(newAppointmentInit);
  const [displayForm, setDisplayForm] = useState<CalendarFormsInitProps>(displayFormInit);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [errorModal, setErrorModal] = useState<ErrorModalType>({ isVisible: false, text: '' });
  const [appontmentInfo, setAppontmentInfo] = useState<AppointmentInfoType>({
    isVisible: false,
    appointmentData: '',
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const weekDays = generateDayObject(selectedDay);
  const weekDates = weekDays.map((day) => day.date);
  const slotDuration = 60; //Will come from server
  const timeSlots = generateTimeSlots(slotDuration);
  let isMounted = true;

  console.log(selectedDay);
  console.log(weekDates);

  const changeDay = (increment = true) => {
    const value = increment ? 1 : -1;
    setSelectedDay(addDays(selectedDay, value));
  };

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
          onClick={() => changeDay(false)}
          disabled={selectedDay.toDateString() === today.toDateString()}
          direction='left'
        />
        <ArrowBtn onClick={() => changeDay(true)} direction='right' />
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
