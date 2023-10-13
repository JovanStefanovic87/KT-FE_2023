import { ClientsDataListProps } from '@/app/helpers/interfaces';

const ClientsDataList: React.FC<ClientsDataListProps> = ({
  filteredClients,
  newAppointment,
  setNewAppointment,
}) => {
  const handleNameClick = (clientId: string) => {
    setNewAppointment({ ...newAppointment, client: clientId });
  };

  return (
    <ul className='grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-4/6 overflow-auto'>
      {filteredClients.map((client, index) => (
        <li
          key={client.id}
          className={`border-2 p-2 rounded-md cursor-pointer ${
            newAppointment.client?.includes(client.id) ? 'bg-blue-100' : ''
          }`}
          onClick={() => handleNameClick(client.id)}
        >
          <h2 className='font-bold text-ktFormItemName mb-1'>{`${index + 1}. ${client.name}`}</h2>
          <p className='mb-1'>
            <b>
              <em>Phone:</em>
            </b>
            {` ${client.phoneNumber}`}
          </p>
          <p>
            <b>
              <em>Email:</em>
            </b>
            {` ${client.email}`}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ClientsDataList;
