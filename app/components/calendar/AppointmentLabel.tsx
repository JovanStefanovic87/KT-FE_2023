import { AppointmentLabelProps } from '@/app/helpers/interfaces';
import AppointmentDividingLine from '../ui/dividingLines/AppointmentDividingLine';
import AppointmentTimeRange from '../ui/text/AppointmentTimeRange';
import AppointmentClientName from '../ui/text/AppointmentClientName';
import AppointmentPrice from '../ui/text/AppointmentPrice';
import AppointmentServicesNameContainer from '../ui/listContainers/AppointmentServicesNameContainer';

const calculateSlotsForDuration = (appointmentDuration: number, slotDuration: number): number =>
  Math.ceil(appointmentDuration / slotDuration);

interface ServiceComponentProps {
  service: { name: string };
  index: number;
}

const ServiceComponent: React.FC<ServiceComponentProps> = ({ service, index }) => (
  <div key={index}>{`${index + 1}: ${service.name}`}</div>
);

const AppointmentLabel: React.FC<AppointmentLabelProps> = ({
  appointment,
  services,
  clients,
  slotDuration,
  onDoubleClick,
}) => {
  const borderSize = 2;

  if (!appointment) return null;

  const appointmentServices = appointment.services.map((serviceId) => {
    const serviceData = services.find((s: { id: string }) => s.id === serviceId);
    return serviceData
      ? serviceData
      : { id: serviceId, name: 'Unknown Service', duration: 0, price: 0 };
  });

  const totalDuration = appointmentServices.reduce(
    (total, service) => total + (service.duration || 0),
    0,
  );

  const slotsNeeded = calculateSlotsForDuration(totalDuration, slotDuration);
  const singleSlotHeight = 112;
  const spaceBetweenSlots = (slotsNeeded - 1) * (borderSize * 2);
  const totalHeight = singleSlotHeight * slotsNeeded + spaceBetweenSlots;

  return (
    <div
      className='flex flex-col justify-start min-w-slotsWidth max-w-slotsWidth text-white text-sm bg-ktAppointmentBg break-words text-center whitespace-pre-wrap absolute left-0 z-3 overflow-auto rounded-lg'
      style={{ height: `${totalHeight}px` }}
      data-slots-needed={slotsNeeded}
      onDoubleClick={onDoubleClick}
    >
      <AppointmentTimeRange appointment={appointment} />
      <AppointmentClientName appointment={appointment} clients={clients} />
      <AppointmentServicesNameContainer>
        {appointmentServices.map((service, index) => (
          <ServiceComponent key={index} service={service} index={index} />
        ))}
      </AppointmentServicesNameContainer>
      <AppointmentDividingLine />
      <AppointmentPrice appointmentServices={appointmentServices} />
    </div>
  );
};

export default AppointmentLabel;
