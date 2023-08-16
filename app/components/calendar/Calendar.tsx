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
  const weekDays = generateWeekDays(selectedWeek);
  const slotDuration = 60;
  const timeSlots = generateTimeSlots(slotDuration);
  const labelHeight = '7rem';
  const slotDayHeight = '3rem';
  const slotsWidth = 200;
  const headerHeight = 68;
  const borderSize = 2;
  const border2px = `${borderSize}px solid #dfdfdf`;
  const rowsGap = 8;
  const primaryBg = '#303030';
  const appointmentDuration = 180;

  const commonStyle: React.CSSProperties = {
    height: '7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const calendarContainerStyle: React.CSSProperties = {
    height: '72dvh',
    width: slotsWidth * 7.22,
    maxWidth: '95vw',
    overflow: 'auto',
    border: '1px solid white',
    boxShadow: '0 0 1px 2px white',
    margin: '10px auto 20px auto',
    padding: '1px',
  };
  const calendarHeadStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 3,
  };
  const SelectContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '320px',
    overflow: 'hidden',
  };
  const containerBodyRowStyle: React.CSSProperties = {
    margin: '0.5rem 0',
  };
  const dayNamesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
  };
  const dayLabelStyle: React.CSSProperties = {
    ...commonStyle,
    height: slotDayHeight,
    background: primaryBg,
    color: 'white',
    border: border2px,
    minWidth: '204px',
    maxWidth: '204px',
    position: 'sticky',
    top: 0,
  };
  const buttonStyle: React.CSSProperties = {
    ...commonStyle,
    height: labelHeight,
    color: '#fff',
    minWidth: slotsWidth,
    maxWidth: slotsWidth,
  };

  const appointmentContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    minWidth: slotsWidth,
    position: 'relative', // Add relative positioning
  };

  const appointmentInfoStyle: React.CSSProperties = {
    ...buttonStyle,
    color: '#fff',
    backgroundColor: '#555555',
    fontSize: '0.9rem',
    lineHeight: '1.2',
    flexDirection: 'column',
    margin: 0,
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    height: `${rowsGap}px`,
    position: 'absolute', // Add absolute positioning
    top: 0, // Position it at the top
    left: 0, // Position it at the left
    zIndex: 1, // Set a higher z-index to make it overlap other elements
  };

  const reservationButtonStyle: React.CSSProperties = {
    ...commonStyle,
    height: labelHeight,
    color: '#fff',
    background: 'linear-gradient(45deg, #4CAF50, #2E8B57)',
    backgroundSize: '100% 100%',
    backgroundClip: 'text',
  };
  const closedTime: React.CSSProperties = {
    ...reservationButtonStyle,
    background: 'black',
    color: '#6d6d6d',
    cursor: 'not-allowed',
    minWidth: slotsWidth,
    maxWidth: slotsWidth,
  };

  const calculateSlotsForDuration = (duration: string): number => {
    // Parse the duration (e.g., '30 minutes' -> 30)
    const durationInMinutes = parseInt(duration.split(' ')[0], 10);
    // Calculate the number of slots needed for the duration
    return Math.ceil(durationInMinutes / slotDuration);
  };

  const AppointmentLabel: React.FC<AppointmentLabelProps> = ({ appointment }) => {
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
        style={{ ...appointmentInfoStyle, height: `${totalHeight}px` }}
        data-slots-needed={slotsNeeded}
      >
        <div className="time-text">
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
    <div
      className="bg-ktBg flex flex-col py-4 "
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
    >
      {/* <ClientForm /> */}
      <div className="flex flex-col">
        <div style={SelectContainerStyle}>
          <CalendarArrowBtn
            onClick={() => setSelectedWeek(selectedWeek - 1)}
            disabled={selectedWeek === 0}
          >
            <BsArrowLeft className="arrow-icon" />
            <span className="hidden md:inline">Prethodna</span>
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
            <span className="hidden md:inline">Naredna</span>
            <BsArrowRight className="arrow-icon" />
          </CalendarArrowBtn>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={calendarContainerStyle}>
            <div className="grid grid-cols-9 gap-2" style={calendarHeadStyle}>
              <div className="col-span-8" style={dayNamesContainerStyle}>
                {weekDays.map(dayInfo => (
                  <div
                    key={dayInfo.day}
                    className="col-span-1 text-center font-bold"
                    style={dayLabelStyle}
                  >
                    {dayTranslations[dayInfo.day]} ({dayInfo.date})
                  </div>
                ))}
              </div>
            </div>

            {timeSlots.map(time => {
              const hour = time.split(':')[0];
              const showRow = hasWorkingHourInHour(hour);

              return (
                showRow && (
                  <div key={time} className="grid grid-cols-9 gap-2" style={containerBodyRowStyle}>
                    <div className="col-span-8" style={dayNamesContainerStyle}>
                      {weekDays.map(day => (
                        <div className="col-span-1" style={{ border: border2px }} key={day.day}>
                          {isWorkingHour(day.day, time) ? (
                            <div style={appointmentContainerStyle}>
                              {appointments.map(appointment => {
                                if (
                                  appointment.day === day.day &&
                                  appointment.time === time &&
                                  appointment.date === day.date // Check if appointment date matches day date
                                ) {
                                  return (
                                    <AppointmentLabel
                                      key={appointment.id}
                                      appointment={appointment}
                                    />
                                  );
                                }
                                return null;
                              })}
                              {/* Render button or appointment label based on appointment existence */}
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
                                  onClick={() => handleAddAppointment(day.day, time, day.date)}
                                  time={time}
                                  style={{
                                    ...buttonStyle,
                                  }}
                                />
                              )}
                            </div>
                          ) : (
                            <UnworkingHoursLabel />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center" style={SelectContainerStyle}>
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
      </div>
    </div>
  );
};

export default Calendar;
