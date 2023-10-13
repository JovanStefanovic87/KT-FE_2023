import { AppointmentTimeRangeProps } from '@/app/helpers/interfaces';

const AppointmentTimeRange: React.FC<AppointmentTimeRangeProps> = ({ appointment }) => {
  const { time } = appointment;
  const [startHours, startMinutes] = time.split(':').map(Number);
  const totalMinutes = startHours * 60 + startMinutes + (appointment.totalDuration || 0);
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  const formattedTime = (hour: number, minute: number) =>
    `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  return (
    <div className='text-ktAppointmentTime text-xl font-bold'>
      {formattedTime(startHours, startMinutes)}h - {formattedTime(endHours, endMinutes)}h
    </div>
  );
};

export default AppointmentTimeRange;
