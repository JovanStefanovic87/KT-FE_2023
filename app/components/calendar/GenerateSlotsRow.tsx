import React from 'react';
import SlotsRowContainer from './SlotsRowContainer';
import AppointmentContainer from './AppointmentContainer';
import AppointmentLabel from './AppointmentLabel';
import AppointmentButton from '../ui/buttons/AppointmentBtn';
import UnworkingHoursLabel from '../ui/labels/UnworkingHoursLabel';
import SpinnerSmall from '../ui/SpinnerSmall';
import { GenerateSlotsRowProps } from '../../helpers/interfaces';

const GenerateSlotsRow: React.FC<GenerateSlotsRowProps> = ({
  weekDays,
  dataLoaded,
  isWorkingHour,
  appointments,
  time,
  handleAppointmentButton,
  setDisplayForm,
  services,
  clients,
  slotDuration,
  showRow,
  index,
}) => {
  return (
    <div key={index}>
      {showRow && (
        <SlotsRowContainer>
          {weekDays.map(day => (
            <div className="col-span-1 border-2 border-solid border-transparent" key={day.day}>
              {dataLoaded ? (
                isWorkingHour(day.day, time) ? (
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
                )
              ) : (
                <SpinnerSmall />
              )}
            </div>
          ))}
        </SlotsRowContainer>
      )}
    </div>
  );
};

export default GenerateSlotsRow;
