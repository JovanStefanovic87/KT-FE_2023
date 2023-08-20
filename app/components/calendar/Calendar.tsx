'use client';
import React, { useState } from 'react';
import { format, addDays, addWeeks } from 'date-fns';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { generateWeekOptions, generateTimeSlots } from '../../helpers/universalFunctions';
import { workingHours, initialAppointmentsWeek32, dayTranslations } from '../../helpers/mock';
import { Appointment, AppointmentLabelProps } from '../../helpers/interfaces';
import ClientForm from './ClientForm';
import CalendarArrowBtn from '../ui/buttons/CalendarArrowBtn';
import WeekSelect from '../ui/select/WeekSelect';
import AppointmentButton from '../ui/buttons/AppointmentButton';
import UnworkingHoursLabel from '../ui/labels/UnworkingHoursLabel';
import SelectUser from '../ui/select/SelectUser';
import SlotsRow from './SlotsRow';
import Container from './Container';
import DaysRow from './DaysRow';
import AppointmentContainer from './AppointmentContainer';
import SelectContainer from './SelectContainer';

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
  const [selectedServiceProvider, setSelectedServiceProvider] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const weekOptions = generateWeekOptions();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointmentsWeek32); // Set initial appointments for week 32
  const [clickedSlots, setClickedSlots] = useState<string[]>([]);
  const [displayForm, setDisplayForm] = useState<{
    form: boolean;
    backdrop: boolean;
  }>({
    form: false,
    backdrop: false,
  });
  const [displayBackdrop, setDisplayBackdrop] = useState<boolean>(false);
  const weekDays = generateWeekDays(selectedWeek);
  const slotDuration = 60;
  const timeSlots = generateTimeSlots(slotDuration);

  const calculateSlotsForDuration = (duration: string): number => {
    // Parse the duration (e.g., '30 minutes' -> 30)
    const durationInMinutes = parseInt(duration.split(' ')[0], 10);
    // Calculate the number of slots needed for the duration
    return Math.ceil(durationInMinutes / slotDuration);
  };

  const AppointmentLabel: React.FC<AppointmentLabelProps> = ({ appointment }) => {
    const borderSize = 2;
    const rowsGap = 8;

    if (!appointment) return null;

    const { time, duration, genericName, genericService, date } = appointment;

    // Parse the start time to extract hours and minutes
    const [startHours, startMinutes] = time.split(':').map(Number);

    // Parse the duration to get the duration in minutes
    const durationInMinutes = parseInt(duration.split(' ')[0], 10);

    // Calculate the total minutes of the end time
    const totalMinutes = startHours * 60 + startMinutes + durationInMinutes;

    // Format the total minutes as the end time
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes
      .toString()
      .padStart(2, '0')}`;

    // Calculate the number of slots needed for the appointment duration
    const slotsNeeded = calculateSlotsForDuration(duration);

    // Determine the height of the appointment label for a single slot
    const singleSlotHeight = 112;

    // calculate gap and border size between slots
    const spaceBetweenSlots = (slotsNeeded - 1) * (borderSize * 2 + rowsGap);

    // Calculate the total height needed for the appointment label when it spans multiple slots
    const totalHeight = singleSlotHeight * slotsNeeded + spaceBetweenSlots; // 2px for the gap between slots
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
        <div>{genericName}</div>
        <div>{genericService}</div>
        <div>700 RSD</div>
      </div>
    );
  };

  const handleAddAppointment = (day: string, time: string, date: string) => {
    const appointmentDuration = 180;

    const newAppointment: Appointment = {
      id: `${day}-${time}`,
      day,
      time,
      duration: `${appointmentDuration} minutes`,
      genericName: 'Alen Stefanović',
      genericService: 'Šišanje makazicama',
      date, // Include the date
    };
    setAppointments([...appointments, newAppointment]);
    setClickedSlots([...clickedSlots, newAppointment.id]);
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
      <ClientForm displayForm={displayForm} setDisplayForm={setDisplayForm} />
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
                                onClick={() =>
                                  setDisplayForm({
                                    form: true,
                                    backdrop: true,
                                  })
                                }
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
          >
            <option value="Šovljanski">Šovljanski</option>
            <option value="Brica">Brica</option>
          </SelectUser>

          <SelectUser
            selectedUser={selectedEmployee || ''}
            onSelectUser={user => setSelectedEmployee(user)}
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
