import React, { useState } from 'react';

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

const generateWeekDays = (): string[] => {
	const weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
	const buttonHeight = '7rem'; // Set the desired button height here
	const slotDayHeight = '3rem'; // Set the height for slots with day names

	const commonStyle: React.CSSProperties = {
		height: '7rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0.5rem 0',
	};
	const timeLabelStyle: React.CSSProperties = {
		...commonStyle,
		height: slotDayHeight,
		background: 'transparent',
		color: 'white',
		border: '2px solid #a0a0a0',
	};
	const yearLabelStyle: React.CSSProperties = {
		...timeLabelStyle,
		background: 'brown',
	};
	const buttonStyle: React.CSSProperties = {
		...commonStyle,
		height: buttonHeight,
		background: 'linear-gradient(45deg, #4CAF50, #2E8B57)',
		color: '#fff',
	};

	const appointmentInfoStyle: React.CSSProperties = {
		...buttonStyle,
		background: '#f0f0f0', // Light gray background
		color: '#333', // Dark gray text color
		padding: '2px',
		fontSize: '1rem', // Increase font size
		flexDirection: 'column',
	};

	const reservationButtonStyle: React.CSSProperties = {
		...commonStyle,
		height: buttonHeight,
		background: 'gray',
		color: '#fff',
	};
	const closedTime: React.CSSProperties = {
		...reservationButtonStyle,
		background: 'black',
		color: '#6d6d6d',
		pointerEvents: 'not-allowed' as 'not-allowed',
		cursor: 'not-allowed',
	};

	const handleAddAppointment = (day: string, time: string) => {
		const newAppointment: Appointment = {
			id: `${day}-${time}`,
			day,
			time,
			duration: '30 minutes',
			genericName: 'John Doe',
			genericService: 'Service XYZ',
		};
		setAppointments([...appointments, newAppointment]);
		setClickedSlots([...clickedSlots, newAppointment.id]);
	};

	const isWorkingHour = (day: string, time: string) => {
		return time >= (workingHours as any)[day]?.start && time <= (workingHours as any)[day]?.end;
	};

	const hasWorkingHourInHour = (hour: string) => {
		return weekDays.some(day =>
			timeSlots.some(time => isWorkingHour(day, time) && time.startsWith(hour))
		);
	};

	return (
		<div className='p-4' style={{ background: '#303030' }}>
			<h1 className='text-2xl font-bold mb-4'>Kliktermin kalendar</h1>
			<div className='grid grid-cols-9 gap-2'>
				<div className='col-span-1 text-center font-bold' style={yearLabelStyle}>
					{getCurrentYear()}
				</div>
				{weekDays.map(day => (
					<div key={day} className='col-span-1 text-center font-bold' style={timeLabelStyle}>
						{day}
					</div>
				))}
			</div>
			{timeSlots.map(time => {
				const hour = time.split(':')[0];
				return (
					hasWorkingHourInHour(hour) && (
						<div key={time} className='grid grid-cols-9 gap-2'>
							<div
								className='col-span-1 text-center font-bold'
								style={{ ...timeLabelStyle, height: labelHeight }}>
								{time}
							</div>
							{weekDays.map(day => (
								<div key={`${day}-${time}`} className='col-span-1'>
									{isWorkingHour(day, time) && (
										<div className='items-center' style={{ height: labelHeight }}>
											{!clickedSlots.includes(`${day}-${time}`) ? (
												<button
													onClick={() => handleAddAppointment(day, time)}
													className='mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full'
													style={reservationButtonStyle}>
													Rezerviši
												</button>
											) : (
												<div
													className='mt-4 bg-green-500 text-black mb-2 rounded w-full'
													style={appointmentInfoStyle}>
													<div>30 minutes</div>
													<div>John Doe</div>
													<div>Service XYZ</div>
													<div>700 RSD</div>
												</div>
											)}
										</div>
									)}
									{!isWorkingHour(day, time) && (
										<div
											className='text-center font-bold bg-black text-white flex flex-col justify-center'
											style={{ ...closedTime, height: labelHeight }}>
											Zatvoreno
										</div>
									)}
								</div>
							))}
						</div>
					)
				);
			})}
		</div>
	);
};

export default Calendar;
