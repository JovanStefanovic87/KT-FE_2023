/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import 'animate.css';
import {
  generateWeekOptions,
  generateTimeSlots,
  generateWeekDays,
  isWorkingHour,
  handleCloseModal,
  totalPrice,
  hasWorkingHourInHour,
} from '../../helpers/universalFunctions';
import { dayTranslations } from '../../helpers/mock';
import {
  AppointmentProps,
  ServecesProps,
  CalendarFormsInitProps,
  ModalInfoType,
  ClientProps,
  ServiceProviderProps,
  EmployeeProps,
} from '../../helpers/interfaces';
import { displayFormInit, newAppointmentInit } from './initStates';
import { fetchCalendarInitData } from '../../helpers/apiHandlers';
import GenerateSlotsRow from './GenerateSlotsRow';
import ClientForm from './ClientForm';
import WeekSelect from '../ui/select/WeekSelect';
import SelectUser from '../ui/select/SelectUser';
import Container from './Container';
import DaysRow from './DaysRow';
import SelectContainer from './SelectContainer';
import ServiceForm from './ServiceForm';
import InfoModal from '../ui/modals/InfoModal';
import ArrowButtonLeft from '../ui/buttons/ArrowButtonLeft';
import ArrowButtonRight from '../ui/buttons/ArrowButtonRight';
import AppointmentModal from './AppointmentModal';

const Calendar: React.FC = () => {
  const firstRun = useRef(true);
  const [serviceProviders, setServiceProviders] = useState<ServiceProviderProps[]>([]);
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
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
  const [modalInfo, setModalInfo] = useState<ModalInfoType>({ isVisible: false, message: '' });
  const [dataLoaded, setDataLoaded] = useState(false);
  const weekDays = generateWeekDays(selectedWeek);
  const slotDuration = 60; //Will come from server
  const timeSlots = generateTimeSlots(slotDuration);

  useEffect(() => {
    let isMounted = true;
    fetchCalendarInitData(
      setServices,
      setClients,
      setServiceProviders,
      setSelectedServiceProvider,
      setDataLoaded
    );
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (selectedEmployee) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments?employee=${selectedEmployee}`
          );
          if (response.data) {
            setAppointments(response.data);
          }
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/employees?service_provider=${selectedServiceProvider}`
        );
        if (employeesResponse.data && employeesResponse.data.length > 0) {
          setEmployees(employeesResponse.data);

          // Set selectedEmployee to the first employee in the array
          setSelectedEmployee(employeesResponse.data[0].name); // Assuming 'name' is the property containing employee names
        }
      } catch (error) {}
    };

    if (selectedServiceProvider) {
      fetchEmployees();
    }
  }, [selectedServiceProvider]);

  const handleAddAppointment = useCallback(async () => {
    try {
      newAppointment.employee = selectedEmployee;
      newAppointment.serviceProvider = selectedServiceProvider;

      await axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments`, newAppointment);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments?employee=${selectedEmployee}`
      );
      if (response.data) {
        setAppointments(response.data);
        setModalInfo({
          isVisible: true,
          message: 'Appointment successfully made.',
          appointmentData: newAppointment,
        });
      } else {
        setModalInfo({ isVisible: true, message: 'Something went wrong.' });
      }
      setNewAppointment(newAppointmentInit);
    } catch (error) {
      console.error('An error occurred while pushing data:', error);
      setModalInfo({ isVisible: true, message: 'An error occurred. Please try again.' });
    }
  }, [newAppointment, selectedEmployee, selectedServiceProvider]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    displayForm.post && handleAddAppointment();
    setDisplayForm(prevState => ({
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

  const handleModalClose = handleCloseModal(setModalInfo);

  return (
    <>
      <InfoModal isVisible={modalInfo.isVisible} onClose={handleModalClose}>
        {modalInfo.appointmentData && (
          <AppointmentModal modalInfo={modalInfo} totalPrice={totalPrice} services={services} />
        )}
      </InfoModal>
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
            onChange={value => setSelectedWeek(value)}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            weekOptions={weekOptions}
          />

          <ArrowButtonRight
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            disabled={selectedWeek === weekOptions.length - 1}
          />
        </SelectContainer>
        <div className="flex px-2">
          <div className="h-calHeight w-calendarSlots overflow-auto border-2 bg-ktBg border-solid border-white mt-3 mb-3 mx-auto">
            <DaysRow>
              {weekDays.map(dayInfo => (
                <div
                  key={dayInfo.day}
                  className="flex justify-center items-center h-slotDayHeight w-slotsWidth mx-0.5 mt-1 min-w-slotsWidth text-orange-200 font-bold border-2 border-stone-500 border-solid bg-gray-800"
                >
                  {dayTranslations[dayInfo.day]} ({dayInfo.date})
                </div>
              ))}
            </DaysRow>

            {timeSlots.map((time, index) => {
              const hour = time.split(':')[0];
              const showRow = hasWorkingHourInHour(hour, weekDays, timeSlots);
              return GenerateSlotsRow({
                weekDays,
                dataLoaded,
                isWorkingHour,
                appointments,
                time,
                handleAppointmentButton,
                setDisplayForm,
                services,
                clients,
                slotDuration,
                showRow,
                index,
              });
            })}
          </div>
        </div>
        <SelectContainer>
          <SelectUser
            selectedUser={selectedServiceProvider || ''}
            onSelectUser={user => {
              setSelectedServiceProvider(user);
            }}
            id="selectedServiceProvider"
          >
            {serviceProviders.map(prov => (
              <option key={prov.id} value={prov.name}>
                {prov.name}
              </option>
            ))}
          </SelectUser>

          <SelectUser
            selectedUser={selectedEmployee || ''}
            onSelectUser={user => setSelectedEmployee(user)}
            id="selectedEmployee"
          >
            {employees.map(employee => (
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
