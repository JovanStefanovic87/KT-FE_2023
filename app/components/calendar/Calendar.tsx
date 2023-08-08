import React, { useState } from 'react';
import { format, addDays } from 'date-fns';

interface Appointment {
  id: string;
  day: string;
  time: string;
  duration: string;
  genericName: string;
  genericService: string;
}

interface WorkingHours {
  [day: string]: { start: string; end: string };
}

interface DayTranslations {
  [day: string]: string;
}

const dayTranslations: DayTranslations = {
  Mon: 'Pon', // Monday -> Pon
  Tue: 'Uto', // Tuesday -> Uto
  Wed: 'Sre', // Wednesday -> Sre
  Thu: 'Čet', // Thursday -> Čet
  Fri: 'Pet', // Friday -> Pet
  Sat: 'Sub', // Saturday -> Sub
  Sun: 'Ned', // Sunday -> Ned
};

interface AppointmentLabelProps {
  appointment?: Appointment;
}

  const dayNamesContainerStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
  };

const generateWeekDays = (): { day: string; date: string }[] => {
	const weekDays: { day: string; date: string }[] = [];
	const today = new Date();

	// Get the date for the current Monday (start of the week)
	const startOfWeek = addDays(today, 1 - today.getDay());

	for (let i = 0; i < 7; i++) {
		const currentDate = addDays(startOfWeek, i);
		const day = format(currentDate, 'EEE'); // Format day name (e.g., Mon, Tue, etc.)
		const date = format(currentDate, 'dd/MM'); // Format date (e.g., 01/08, 02/08, etc.)

		weekDays.push({ day, date });
	}

	return weekDays;
};


const getCurrentYear = (): string => {
	return new Date().getFullYear().toString();
};

const workingHours: WorkingHours = {
	Sun: { start: '--:--', end: '--:--' },
	Mon: { start: '09:00', end: '17:00' },
	Tue: { start: '09:00', end: '17:00' },
	Wed: { start: '09:00', end: '17:00' },
	Thu: { start: '09:00', end: '17:00' },
	Fri: { start: '09:00', end: '19:00' },
	Sat: { start: '09:00', end: '12:00' },
  };

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

const Calendar: React.FC = () => {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [clickedSlots, setClickedSlots] = useState<string[]>([]);
	const weekDays = generateWeekDays();
	const timeSlots = generateTimeSlots(60); // Set the time slot interval in minutes here
	const labelHeight = '7rem'; // Set the desired label height here
	const slotDayHeight = '3rem'; // Set the height for slots with day names
	const slotsWidth = '200px';
	const border2px = '2px solid #dfdfdf';
	const primaryBg = '#303030';

	const commonStyle: React.CSSProperties = {
		height: '7rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};
	const calendarContainerStyle: React.CSSProperties = {
		height: '90vh',
		overflow: 'auto',
	};
	const calendarHeadStyle: React.CSSProperties = {
		position: 'sticky',
		top: 0,
		zIndex: 3,
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
		background: 'gray',
		color: 'white',
		border: border2px,
		minWidth: '203px',
		maxWidth: '203px',
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
		justifyContent: 'center', // Center content horizontally
		minWidth: slotsWidth,
	};

	const appointmentInfoStyle: React.CSSProperties = {
		...buttonStyle,
		color: '#fff', // Dark gray text color
		fontSize: '0.9rem', // Adjust the font size as needed
		lineHeight: '1.2', // Adjust line height to add some spacing between lines
		flexDirection: 'column',
		margin: 0,
		textAlign: 'center', // Center text horizontally
		whiteSpace: 'pre-wrap', // Allow wrapping for the appointment text
		overflowWrap: 'break-word', // Break word if it exceeds the label width
		wordBreak: 'break-word', // Break word if it exceeds the label width
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
		pointerEvents: 'none',
		cursor: 'not-allowed',
		minWidth: slotsWidth,
		maxWidth: slotsWidth,
	};

	const AppointmentLabel: React.FC<AppointmentLabelProps> = ({ appointment }) => {
		if (!appointment) return null; // Handle the case when appointment is not available
	  
		const { time, duration, genericName, genericService } = appointment;
	  
		return (
		  <div style={appointmentInfoStyle}>
			<div className='time-text'>{time}</div> {/* Add the start time */}
			<div>{duration}</div>
			<div>{genericName}</div>
			<div>{genericService}</div>
			<div>700 RSD</div>
		  </div>
		);
	  };

	const handleAddAppointment = (day: string, time: string) => {
		const appointmentDate = weekDays.find(dayInfo => dayInfo.day === day);
		if (appointmentDate) {
			const appointmentTime = time.split(':');
			const appointmentDateTime = new Date(
				appointmentDate.date + '/' + getCurrentYear() + ' ' + time
			);
			const newAppointment: Appointment = {
				id: `${day}-${time}`,
				day: appointmentDate.date,
				time: time,
				duration: '30 minutes',
				genericName: 'Alen Stefanović',
				genericService: 'Šišanje makazicama',
			};
			setAppointments([...appointments, newAppointment]);
			setClickedSlots([...clickedSlots, newAppointment.id]);
		}
	};

	const isWorkingHour = (day: string, time: string) => {
		return time >= (workingHours as any)[day]?.start && time <= (workingHours as any)[day]?.end;
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
		<div className='p-4' style={{ background: '#303030' }}>
      <h1 className='text-2xl font-bold mb-4'>Kliktermin kalendar</h1>
      <div style={calendarContainerStyle}>
        <div className='grid grid-cols-9 gap-2' style={calendarHeadStyle}>
          <div className='col-span-8' style={dayNamesContainerStyle}>
            {/* Updated to display translated day names */}
            {weekDays.map(dayInfo => (
              <div
                key={dayInfo.day}
                className='col-span-1 text-center font-bold'
                style={dayLabelStyle}
              >
                {dayTranslations[dayInfo.day]} ({dayInfo.date})
              </div>
            ))}
          </div>
        </div>

				{/* Updated to filter and display rows only for working hours */}
				{timeSlots.map((time, index) => {
					const hour = time.split(':')[0];
					const showRow = hasWorkingHourInHour(hour);

					return (
						showRow && (
							<div key={time} className='grid grid-cols-9 gap-2' style={containerBodyRowStyle}>
								<div className='col-span-8' style={dayNamesContainerStyle}>
									{weekDays.map(day => (
										<div className='col-span-1' style={{ border: border2px }} key={day.day}>
											{isWorkingHour(day.day, time) ? (
												<div style={appointmentContainerStyle}>
													{!clickedSlots.includes(`${day.day}-${time}`) ? (
														<button
															onClick={() => handleAddAppointment(day.day, time)}
															className='bg-blue-500 text-white rounded w-full h-full'
															style={{
																...reservationButtonStyle,
																/* Add any other existing styles you have for the button here */
															}}>
															<div
																style={{
																	display: 'flex',
																	flexDirection: 'column',
																	alignItems: 'center',
																	fontSize: '1rem',
																}}>
																<div>REZERVIŠI TERMIN</div>
																<div>
																	<span className='time-text'>{time}</span>
																</div>
															</div>
														</button>
													) : (
														<AppointmentLabel
															appointment={appointments.find(
																appointment => appointment.id === `${day.day}-${time}`
															)}
														/>
													)}
												</div>
											) : (
												<div
													className='text-center font-bold bg-black text-white flex flex-col justify-center'
													style={{ ...closedTime, height: labelHeight }}>
													Zatvoreno
												</div>
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
	);
};

export default Calendar;
