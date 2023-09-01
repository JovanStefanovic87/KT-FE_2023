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
} from '../../helpers/universalFunctions';
import { dayTranslations } from '../../helpers/mock';
import {
  AppointmentProps,
  ServecesProps,
  CalendarFormsInitProps,
  ModalInfoType,
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
  const [selectedServiceProvider, setSelectedServiceProvider] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [services, setServices] = useState<ServecesProps[]>([]);
  const [newAppointment, setNewAppointment] = useState<AppointmentProps>(newAppointmentInit);
  const weekOptions = generateWeekOptions();
  const [displayForm, setDisplayForm] = useState<CalendarFormsInitProps>(displayFormInit);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [modalInfo, setModalInfo] = useState<ModalInfoType>({ isVisible: false, message: '' });
  const weekDays = generateWeekDays(selectedWeek);
  const slotDuration = 60; //Will come from server
  const timeSlots = generateTimeSlots(slotDuration);

  useEffect(() => {
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
    fetchServices();
  }, []);

  useEffect(() => {
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
    fetchAppointments();
  }, []);

  const handleAddAppointment = useCallback(async () => {
    try {
      await axios.post('http://localhost:8000/appointments', newAppointment);
      const response = await axios.get('http://localhost:8000/appointments');
      if (response.data) {
        setAppointments(response.data);
        setModalInfo({ isVisible: true, message: 'Appointment successfully made.' });
      } else {
        setModalInfo({ isVisible: true, message: 'Something went wrong.' });
      }
      setNewAppointment(newAppointmentInit);
    } catch (error) {
      console.error('An error occurred while pushing data:', error);
      setModalInfo({ isVisible: true, message: 'An error occurred. Please try again.' });
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

  const handleAppointmentButton = (day: string, time: string, date: string) => {
    setNewAppointment({
      ...newAppointment,
      id: `${day}${time}${date}`,
      day,
      time,
      date,
    });
  };

  const handleModalClose = handleCloseModal(setModalInfo);

  return (
    <>
      <InfoModal
        isVisible={modalInfo.isVisible}
        message={modalInfo.message}
        onClose={handleModalClose}
      />
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
              const showRow = hasWorkingHourInHour(hour, weekDays, timeSlots);

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
                                services={services} // Pass the services prop
                                slotDuration={slotDuration} // Pass the slotDuration prop
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
