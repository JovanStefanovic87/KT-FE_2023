import React from 'react';
import { ServecesProps, AppointmentLabelProps } from '../../helpers/interfaces';
import { calculateSlotsForDuration } from '../../helpers/universalFunctions';

const AppointmentLabel: React.FC<AppointmentLabelProps> = ({
  appointment,
  services,
  slotDuration,
}) => {
  const borderSize = 2;
  const rowsGap = 8;

  if (!appointment) return null;

  const appointmentServices = appointment.services.map(serviceId => {
    const serviceData = services.find((s: { id: string }) => s.id === serviceId);
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

  const { time } = appointment;
  const [startHours, startMinutes] = time.split(':').map(Number);
  const totalMinutes = startHours * 60 + startMinutes + totalDuration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes
    .toString()
    .padStart(2, '0')}`;

  const slotsNeeded = calculateSlotsForDuration(totalDuration, slotDuration);
  const singleSlotHeight = 112;
  const spaceBetweenSlots = (slotsNeeded - 1) * (borderSize * 2 + rowsGap / 2);
  const totalHeight = singleSlotHeight * slotsNeeded + spaceBetweenSlots;

  const totalServicesNames = appointmentServices.map((service, index) => (
    <div key={index}>{`${index + 1}: ${service.name}`}</div>
  ));

  return (
    <div
      className="flex flex-col justify-center min-w-slotsWidth max-w-slotsWidth text-white text-sm bg-ktAppointmentBg break-words text-center whitespace-pre-wrap absolute left-0 z-3"
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

export default AppointmentLabel;
