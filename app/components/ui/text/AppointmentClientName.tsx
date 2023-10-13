import { AppointmentClientName, ClientProps } from '@/app/helpers/interfaces';

const AppointmentClientName: React.FC<AppointmentClientName> = ({ appointment, clients }) => {
  const clientName = () => {
    const clientId = appointment?.client;
    const client = clients.find((client: ClientProps) => client.id === clientId);

    return client?.name || 'Unknown Client';
  };
  return <div className='text-lg font-semibold text-blue-200'>{clientName()}</div>;
};

export default AppointmentClientName;
