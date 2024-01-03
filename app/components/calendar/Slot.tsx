import { SlotProps } from '../../helpers/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import AppointmentContainer from '../ui/containers/AppointmentContainer';
import AppointmentLabel from '../ui/labels/AppointmentLabel';
import AppointmentButton from '../ui/buttons/AppointmentBtn';
import UnworkingHoursLabel from '../ui/labels/UnworkingHoursLabel';
import AbsenceHoursLabel from '../ui/labels/AbsenceHoursLabel';
import {
  isWorkingHour,
  isAbsenceWeek,
  capitalizeFirstLetter,
} from '@/app/helpers/universalFunctions';
import AppointmentBtnDayView from '../ui/buttons/AppointmentBtnDayView';

const Slot: React.FC<SlotProps> = ({
  time,
  workingHours,
  appointments,
  handleAppointmentButton,
  setDisplayForm,
  services,
  clients,
  slotDuration,
  setShowConfirmation,
  weekDays,
}) => {
  const calendarMode = useSelector((state: RootState) => state.calendarMode);
  const isWeekMode = calendarMode.mode === 'week';
  const appointmentLabel = (day: any) => {
    return (
      <AppointmentLabel
        appointment={appointments.find(
          (appointment) =>
            appointment.day === day.day &&
            appointment.time === time &&
            appointment.date === day.date,
        )}
        time={time}
        services={services}
        clients={clients}
        slotDuration={slotDuration}
        onDoubleClick={() => {
          const appointment = appointments.find(
            (appointment) =>
              appointment.day === day.day &&
              appointment.time === time &&
              appointment.date === day.date,
          );
          if (appointment) {
            setShowConfirmation((prevShowConfirmation: any) => ({
              ...prevShowConfirmation,
              isVisible: true,
              appointmentId: appointment.id,
            }));
          }
        }}
      />
    );
  };
  return (
    <>
      {weekDays.map((day) => {
        const workingHour = workingHours.find((wh: any) => wh.date === day.date);
        const isAbsence = workingHour?.absence !== 'nema odsustva';
        // Check if it's an absence week
        if (isAbsenceWeek(workingHours)) {
          const absenceHours = [];
          // Generate AbsenceHoursLabel for hours between 08:00 and 16:00
          for (let hour = 8; hour <= 16; hour++) {
            const formattedHour = hour.toString().padStart(2, '0') + ':00';
            absenceHours.push(
              <div
                className='col-span-1 border-2 border-solid border-transparent'
                key={formattedHour}
              >
                <AbsenceHoursLabel
                  time={formattedHour}
                  absence={capitalizeFirstLetter(workingHour?.absence)}
                />
              </div>,
            );
          }
          return <div key={day.day}>{absenceHours}</div>;
        }

        const renderAppointmentButton = (day: any, time: string, isWeekMode: boolean) => {
          const onClickHandler = () => {
            setDisplayForm({
              clientForm: true,
              serviceForm: false,
              backdrop: true,
              post: false,
            });
            handleAppointmentButton(day.day, time, day.date);
          };

          return isWeekMode ? (
            <AppointmentButton onClick={onClickHandler} time={time} />
          ) : (
            <AppointmentBtnDayView onClick={onClickHandler} time={time} />
          );
        };

        return (
          <div className={`border-2 border-solid border-transparent z-1 w-full`} key={day.day}>
            {workingHours &&
            workingHours.length > 0 &&
            isWorkingHour(day.day, time, workingHours) ? (
              <AppointmentContainer>
                {appointments.find(
                  (appointment) =>
                    appointment.day === day.day &&
                    appointment.time === time &&
                    appointment.date === day.date,
                ) ? (
                  appointmentLabel(day)
                ) : isAbsence ? (
                  <AbsenceHoursLabel
                    time={time}
                    absence={capitalizeFirstLetter(workingHour?.absence)}
                  />
                ) : (
                  renderAppointmentButton(day, time, isWeekMode)
                )}
              </AppointmentContainer>
            ) : (
              <UnworkingHoursLabel time={time} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default Slot;
