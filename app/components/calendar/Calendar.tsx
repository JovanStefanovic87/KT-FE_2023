'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { format, addDays, addWeeks } from 'date-fns';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { generateWeekOptions, generateTimeSlots } from '../../helpers/universalFunctions';
import { workingHours, dayTranslations } from '../../helpers/mock';
import {
  Appointment,
  NewAppointment,
  AppointmentLabelProps,
  ServecesProps,
} from '../../helpers/interfaces';
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

const generateWeekDays = (selectedWeekIndex: number): { day: string; date: string }[] => {
  const weekDays: { day: string; date: string }[] = [];
  const today = new Date();

  // Calculate the day offset for Monday as the first day of the week
  const dayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const startOfWeek = addDays(today, -dayOffset); // Adjust the offset here
  const currentWeekStart = addWeeks(startOfWeek, selectedWeekIndex);

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(currentWeekStart, i);
    const day = format(currentDate, 'EEE');
    const date = format(currentDate, 'dd.MM.yy');

    if (workingHours[day].start !== '--:--' && workingHours[day].end !== '--:--') {
      weekDays.push({ day, date });
    }
  }

  return weekDays;
};

const Calendar: React.FC = () => {
  const firstRun = useRef(true);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [services, setServices] = useState<ServecesProps[]>([]);
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    id: '',
    date: '',
    day: '',
    time: '',
    client: '',
    services: [],
  });
  const weekOptions = generateWeekOptions();
  const [displayForm, setDisplayForm] = useState<{
    clientForm: boolean;
    serviceForm: boolean;
    backdrop: boolean;
    post: boolean;
  }>({
    clientForm: false,
    serviceForm: false,
    backdrop: false,
    post: false,
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const weekDays = generateWeekDays(selectedWeek);
  const slotDuration = 60;
  const timeSlots = generateTimeSlots(slotDuration);

  useEffect(() => {
    // Function to fetch appointments from the server
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/services');
        if (response.data) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    // Call the fetch function
    fetchServices();
  }, []);

  useEffect(() => {
    // Function to fetch appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/appointments');
        if (response.data) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    // Call the fetch function
    fetchAppointments();
  }, []);

  const handleAddAppointment = useCallback(async () => {
    try {
      await axios.post('http://localhost:8000/appointments', newAppointment);

      // Fetch the appointments again to get the updated list
      const response = await axios.get('http://localhost:8000/appointments');
      if (response.data) {
        setAppointments(response.data);
      }

      setNewAppointment({
        id: '',
        date: '',
        day: '',
        time: '',
        client: '',
        services: [],
      });
    } catch (error) {
      console.error('An error occurred while pushing data:', error);
    }
  }, [newAppointment]);

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

  const calculateSlotsForDuration = (duration: number): number => {
    // Parse the duration (e.g., '30 minutes' -> 30)
    const durationInMinutes = duration;
    // Calculate the number of slots needed for the duration
    return Math.ceil(durationInMinutes / slotDuration);
  };

  const AppointmentLabel: React.FC<AppointmentLabelProps> = ({ appointment }) => {
    const borderSize = 2;
    const rowsGap = 8;

    if (!appointment) return null;

    const appointmentServices = appointment.services.map(serviceId => {
      const serviceData = services.find(s => s.id === serviceId);
      return serviceData
        ? serviceData
        : { id: serviceId, name: 'Unknown Service', duration: 0, price: 0 };
    });

    const totalDuration = appointmentServices.reduce(
      (total, service) => total + (service.duration || 0),
      0
    );
    const totalPrices = appointmentServices.reduce(
      (total, service) => total + (service.price || 0),
      0
    );

    const { id, time } = appointment;
    const [startHours, startMinutes] = time.split(':').map(Number);
    const totalMinutes = startHours * 60 + startMinutes + totalDuration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes
      .toString()
      .padStart(2, '0')}`;

    const slotsNeeded = calculateSlotsForDuration(totalDuration);
    const singleSlotHeight = 112;
    const spaceBetweenSlots = (slotsNeeded - 1) * (borderSize * 2 + rowsGap / 2);
    const totalHeight = singleSlotHeight * slotsNeeded + spaceBetweenSlots;

    const totalServicesNames = appointmentServices.map((service, index) => (
      <div key={index}>{`${index + 1}: ${service.name}`}</div>
    ));

    return (
      <div
        className="flex flex-col justify-center min-w-slotsWidth max-w-slotsWidth text-white text-sm bg-ktAppointmentBg break-words text-center whitespace-pre-wrap absolute left-0 z-10"
        style={{ height: `${totalHeight}px` }}
        data-slots-needed={slotsNeeded}
      >
        <div className="text-ktAppointmentTime text-xl font-bold">
          {time}h - {formattedEndTime}h
        </div>
        {/* <div>{date}</div> */}
        {/*  <div>{clientName}</div> */}
        <div>{totalServicesNames}</div>
        <div>{`${totalPrices} RSD`}</div>
      </div>
    );
  };

  const handleAppointmentButton = (day: string, time: string, date: string) => {
    setNewAppointment({
      ...newAppointment,
      id: `${day}${time}${date}`,
      day,
      time,
      date,
    });
  };

  const isWorkingHour = (day: string, time: string) => {
    const dayWorkingHours = workingHours[day];

    const appointmentTime = parseInt(time.replace(':', ''), 10);
    const startTime = parseInt(dayWorkingHours.start.replace(':', ''), 10);
    const endTime = parseInt(dayWorkingHours.end.replace(':', ''), 10);

    return appointmentTime >= startTime && appointmentTime <= endTime;
  };

  const hasWorkingHourInHour = (hour: string) => {
    return weekDays.some(dayInfo =>
      timeSlots.some(time => {
        const dayWorkingHours = workingHours[dayInfo.day];
        return dayWorkingHours && isWorkingHour(dayInfo.day, time) && time.startsWith(hour);
      })
    );
  };

  return (
    <>
      <ClientForm
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
      />
      <ServiceForm
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
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
                  className="flex justify-center items-center h-slotDayHeight w-slotsWidth mx-0.5 mt-1 min-w-slotsWidth text-white font-bold border-2 border-white border-solid bg-gray-800"
                >
                  {dayTranslations[dayInfo.day]} ({dayInfo.date})
                </div>
              ))}
            </DaysRow>

            {timeSlots.map(time => {
              const hour = time.split(':')[0];
              const showRow = hasWorkingHourInHour(hour);

              return (
                showRow && (
                  <SlotsRow key={time}>
                    {weekDays.map(day => (
                      <div className="col-span-1 border-2 border-solid border-white" key={day.day}>
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
            onSelectUser={user => setSelectedServiceProvider(user)}
            id="selectedServiceProvider"
          >
            <option value="Šovljanski">Šovljanski</option>
            <option value="Brica">Brica</option>
          </SelectUser>

          <SelectUser
            selectedUser={selectedEmployee || ''}
            onSelectUser={user => setSelectedEmployee(user)}
            id="selectedEmployee"
          >
            <option value="Stevan Poljaković">Stevan Poljaković</option>
            <option value="Milica">Milica</option>
          </SelectUser>
        </SelectContainer>
      </Container>
    </>
  );
};

export default Calendar;
