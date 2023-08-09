import React, { useState } from 'react';
import { format, addDays, addMinutes } from 'date-fns';

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

const generateWeekDays = (): { day: string; date: string }[] => {
	const weekDays: { day: string; date: string }[] = [];
	const today = new Date();
	const startOfWeek = addDays(today, 1 - today.getDay());

	for (let i = 0; i < 7; i++) {
		const currentDate = addDays(startOfWeek, i);
		const day = format(currentDate, 'EEE');

		if (workingHours[day].start !== '--:--' && workingHours[day].end !== '--:--') {
			const date = format(currentDate, 'dd/MM');
			weekDays.push({ day, date });
		}
	}

	return weekDays;
};

const getCurrentYear = (): string => {
	const today = new Date();
	return today.getFullYear().toString();
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
	const timeSlots = generateTimeSlots(60);
	const labelHeight = '7rem';
	const slotDayHeight = '3rem';
	const slotsWidth = '200px';
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
		return Math.ceil(durationInMinutes / 60);
	};

	const AppointmentLabel: React.FC<AppointmentLabelProps> = ({ appointment }) => {
		if (!appointment) return null; // Handle the case when appointment is not available

		const { time, duration, genericName, genericService } = appointment;

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
				data-slots-needed={slotsNeeded}>
				<div className='time-text'>
					{time}h - {formattedEndTime}h
				</div>{' '}
				{/* Add the start time */}
				{/* <div>{duration}</div> */}
				<div>{genericName}</div>
				<div>{genericService}</div>
				<div>700 RSD</div>
			</div>
		);
	};

	const handleAddAppointment = (day: string, time: string) => {
		const currentYear = getCurrentYear();
		const appointmentDateTime = new Date(`${day}/${currentYear} ${time}`);

		if (!isWorkingHour(day, time)) {
			alert('Cannot make an appointment during unworking hours.');
			return;
		}

		const appointmentEndDateTime = addMinutes(appointmentDateTime, appointmentDuration);
		const workingEndDateTime = new Date(`${day}/${currentYear} ${workingHours[day].end}`);
		const unworkingHour = new Date(workingEndDateTime.getTime() + 65 * 1000 * 60);

		if (appointmentEndDateTime.getTime() > unworkingHour.getTime()) {
			alert('Termin nije moguće zakazati zato što se završava nakon kraja radnog vremena.');
			return;
		}

		const overlaps = appointments.some(appointment => {
			const existingAppointmentStart = new Date(
				`${appointment.day}/${currentYear} ${appointment.time}`
			);
			const existingAppointmentEnd = addMinutes(
				existingAppointmentStart,
				calculateSlotsForDuration(appointment.duration) * 60
			);

			return (
				appointment.day === day &&
				((appointmentDateTime >= existingAppointmentStart &&
					appointmentDateTime < existingAppointmentEnd) ||
					(appointmentEndDateTime > existingAppointmentStart &&
						appointmentEndDateTime <= existingAppointmentEnd) ||
					(appointmentDateTime <= existingAppointmentStart &&
						appointmentEndDateTime >= existingAppointmentEnd))
			);
		});

		if (overlaps) {
			alert('Termin nije moguće zakazati zato što se preklapa sa narednim terminom.');
			return;
		}

		const newAppointment: Appointment = {
			id: `${day}-${time}`,
			day,
			time,
			duration: `${appointmentDuration} minutes`,
			genericName: 'Alen Stefanović',
			genericService: 'Šišanje makazicama',
		};
		setAppointments([...appointments, newAppointment]);
		setClickedSlots([...clickedSlots, newAppointment.id]);
	};

	const isWorkingHour = (day: string, time: string) => {
		const dayWorkingHours = workingHours[day];
		if (dayWorkingHours.start === '--:--' || dayWorkingHours.end === '--:--') {
			// Unworking hours are defined as '--:--', so anything not in that format is working time
			return true;
		}

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
		<div className='p-4' style={{ background: '#303030' }}>
			<h1 className='text-2xl font-bold mb-4'>Kliktermin kalendar</h1>
			<div style={calendarContainerStyle}>
				<div className='grid grid-cols-9 gap-2' style={calendarHeadStyle}>
					<div className='col-span-8' style={dayNamesContainerStyle}>
						{weekDays.map(dayInfo => (
							<div
								key={dayInfo.day}
								className='col-span-1 text-center font-bold'
								style={dayLabelStyle}>
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
							<div key={time} className='grid grid-cols-9 gap-2' style={containerBodyRowStyle}>
								<div className='col-span-8' style={dayNamesContainerStyle}>
									{weekDays.map(day => (
										<div className='col-span-1' style={{ border: border2px }} key={day.day}>
											{isWorkingHour(day.day, time) ? (
												<div style={appointmentContainerStyle}>
													{!clickedSlots.includes(`${day.day}-${time}`) ? (
														<button
															onClick={() => handleAddAppointment(day.day, time)}
															className='bg-green-700 text-white rounded w-full h-full'
															style={{
																...buttonStyle,
																/* Add any other existing styles you have for the button here */
															}}>
															<div
																style={{
																	display: 'flex',
																	flexDirection: 'column',
																	alignItems: 'center',
																	fontSize: '1rem',
																}}>
																<div>
																	<span className='time-text'>{time}</span>
																</div>
																<div>REZERVIŠI TERMIN</div>
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
