import { ClientsDataListProps } from '@/app/helpers/interfaces';
import NewAppointmentListContainer from './NewAppointmentListContainer';
import ListItemName from '../text/ListItemName';
import ListItemData from '../text/ListItemData';
import NewAppointmentFormContainer from './NewAppointmentFormContainer';

const ClientsDataList: React.FC<ClientsDataListProps> = ({
  clients,
  newAppointment,
  setNewAppointment,
  selected,
  setSelected,
}) => {
  const handleNameClick = (clientId: string) => {
    const clientIndex = selected.indexOf(clientId);

    if (clientIndex === -1 && selected.length === 1) {
      const updatedSelectedServices = [clientId];
      setSelected(updatedSelectedServices);
      setNewAppointment({ ...newAppointment, client: clientId });
    } else if (clientIndex === -1 && selected.length === 0) {
      setSelected([clientId]);
      setNewAppointment({ ...newAppointment, client: clientId });
    } else {
      const updatedSelectedServices = [...selected];
      updatedSelectedServices.splice(clientIndex, 1);
      setSelected(updatedSelectedServices);
      setNewAppointment({ ...newAppointment, client: clientId });
    }
  };

  return (
    <NewAppointmentFormContainer>
      {clients.map((client, index) => (
        <NewAppointmentListContainer
          list={client}
          selectedName={selected}
          onClick={() => handleNameClick(client.id)}
          key={client.id}
        >
          <ListItemName index={index} title={client.name} />
          <ListItemData title='Phone' item={` ${client.phoneNumber}`} />
          <ListItemData title='Email' item={` ${client.email}`} />
        </NewAppointmentListContainer>
      ))}
    </NewAppointmentFormContainer>
  );
};

export default ClientsDataList;
