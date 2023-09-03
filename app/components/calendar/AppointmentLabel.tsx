import React from 'react';
import { AppointmentLabelProps, ClientProps } from '../../helpers/interfaces';
import { calculateSlotsForDuration } from '../../helpers/universalFunctions';

const AppointmentLabel: React.FC<AppointmentLabelProps> = ({
  appointment,
  services,
  clients,
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

  const clientName = () => {
    const clientId = appointment.client;
    const client = clients.find((client: ClientProps) => client.id === clientId);
    return client?.name || 'Unknown Client';
  };

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
  const spaceBetweenSlots = (slotsNeeded - 1) * (borderSize * 2);
  const totalHeight = singleSlotHeight * slotsNeeded + spaceBetweenSlots;

  const totalServicesNames = appointmentServices.map((service, index) => (
    <div key={index}>{`${index + 1}: ${service.name}`}</div>
  ));

  return (
    <div
      className="flex flex-col justify-start min-w-slotsWidth max-w-slotsWidth text-white text-sm bg-ktAppointmentBg break-words text-center whitespace-pre-wrap absolute left-0 z-3 overflow-auto rounded-lg"
      style={{ height: `${totalHeight}px` }}
      data-slots-needed={slotsNeeded}
    >
      <div className="text-ktAppointmentTime text-xl font-bold">
        {time}h - {formattedEndTime}h
      </div>
      <div className="text-lg font-semibold text-blue-200">{clientName()}</div>
      <ul className="list-disc">{totalServicesNames}</ul>
      <hr className="border-t my-0.5 border-gray-300 w-2/3 mx-auto" />
      <div className="text-base font-bold">{`${totalPrices} RSD`}</div>
    </div>
  );
};

export default AppointmentLabel;
