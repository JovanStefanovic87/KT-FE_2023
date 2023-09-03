/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import 'animate.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import {
  generateWeekOptions,
  generateTimeSlots,
  generateWeekDays,
  isWorkingHour,
  hasWorkingHourInHour,
  handleCloseModal,
  totalPrice,
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
import ClientForm from './ClientForm';
import CalendarArrowBtn from '../ui/buttons/CalendarArrowBtn';
import WeekSelect from '../ui/select/WeekSelect';
import AppointmentButton from '../ui/buttons/AppointmentBtn';
import UnworkingHoursLabel from '../ui/labels/UnworkingHoursLabel';
import SelectUser from '../ui/select/SelectUser';
import SlotsRow from './SlotsRow';
import Container from './Container';
import DaysRow from './DaysRow';
import AppointmentContainer from './AppointmentContainer';
import SelectContainer from './SelectContainer';
import ServiceForm from './ServiceForm';
import AppointmentLabel from './AppointmentLabel';
import InfoModal from '../ui/modals/InfoModal';

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
  const [isLoading, setIsLoading] = useState(false);
  const weekDays = generateWeekDays(selectedWeek);
  const slotDuration = 60; //Will come from server
  const timeSlots = generateTimeSlots(slotDuration);

  useEffect(() => {
    let isMounted = true;
    const fetchServicesAndClients = async () => {
      setIsLoading(true);
      try {
        const servicesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/services`
        );
        if (servicesResponse.data) {
          setServices(servicesResponse.data);
        }
        const clientsResponse = await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/clients`);
        if (clientsResponse.data) {
          setClients(clientsResponse.data);
        }
        const serviceProvidersResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/service_providers`
        );
        if (serviceProvidersResponse.data) {
          setServiceProviders(serviceProvidersResponse.data);
          if (serviceProvidersResponse.data.length > 0) {
            setSelectedServiceProvider(serviceProvidersResponse.data[0].name);
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
        return { error: true, message: 'Failed to fetch data' };
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchServicesAndClients();

    return () => {
      isMounted = false;
    };
  }, []);
  console.log(process.env.NEXT_PUBLIC_DATABASE_URL);

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
      setIsLoading(true);
      try {
        const employeesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/employees?service_provider=${selectedServiceProvider}`
        );
        if (employeesResponse.data && employeesResponse.data.length > 0) {
          setEmployees(employeesResponse.data);

          // Set selectedEmployee to the first employee in the array
          setSelectedEmployee(employeesResponse.data[0].name); // Assuming 'name' is the property containing employee names
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch employees when selectedServiceProvider changes
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
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-4">
              {' '}
              Uspešno ste zakazali termin
            </h2>
            <p className="text-sm md:text-base mb-2">
              Termin: {`${modalInfo.appointmentData.date} u ${modalInfo.appointmentData.time}h`}
            </p>{' '}
            <p className="text-sm md:text-base mb-2">
              Usluge: {modalInfo.appointmentData.services.join(', ')}
            </p>{' '}
            <p className="text-sm md:text-base mb-2">
              Salon: {modalInfo.appointmentData.serviceProvider}
            </p>{' '}
            <p className="text-sm md:text-base mb-2">
              Radnik: {modalInfo.appointmentData.employee}
            </p>{' '}
            <p className="text-lg md:text-xl font-bold text-green-600 mb-2">
              Ukupna cena: {`${totalPrice(modalInfo.appointmentData.services, services)} RSD`}
            </p>{' '}
          </div>
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
          <CalendarArrowBtn
            onClick={() => setSelectedWeek(selectedWeek - 1)}
            disabled={selectedWeek === 0}
          >
            <BsArrowLeft className="arrow-icon" />
            <span className="hidden lg:inline">Prethodna</span>
          </CalendarArrowBtn>

          <WeekSelect value={selectedWeek} onChange={value => setSelectedWeek(value)}>
            {weekOptions.map((week, index) => (
              <option key={index} value={index}>
                {week.label}
              </option>
            ))}
          </WeekSelect>

          <CalendarArrowBtn
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            disabled={selectedWeek === weekOptions.length - 1}
          >
            <span className="hidden lg:inline">Naredna</span>
            <BsArrowRight className="arrow-icon" />
          </CalendarArrowBtn>
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

            {timeSlots.map(time => {
              const hour = time.split(':')[0];
              const showRow = hasWorkingHourInHour(hour, weekDays, timeSlots);

              return (
                showRow && (
                  <SlotsRow key={time}>
                    {weekDays.map(day => (
                      <div
                        className="col-span-1 border-2 border-solid border-transparent"
                        key={day.day}
                      >
                        {isWorkingHour(day.day, time) ? (
                          <AppointmentContainer>
                            {appointments.find(
                              appointment =>
                                appointment.day === day.day &&
                                appointment.time === time &&
                                appointment.date === day.date
                            ) ? (
                              <AppointmentLabel
                                appointment={appointments.find(
                                  appointment =>
                                    appointment.day === day.day &&
                                    appointment.time === time &&
                                    appointment.date === day.date
                                )}
                                services={services}
                                clients={clients}
                                slotDuration={slotDuration}
                              />
                            ) : (
                              <AppointmentButton
                                onClick={() => {
                                  setDisplayForm({
                                    clientForm: true,
                                    serviceForm: false,
                                    backdrop: true,
                                    post: false,
                                  });
                                  handleAppointmentButton(day.day, time, day.date);
                                }}
                                time={time}
                              />
                            )}
                          </AppointmentContainer>
                        ) : (
                          <UnworkingHoursLabel />
                        )}
                      </div>
                    ))}
                  </SlotsRow>
                )
              );
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
