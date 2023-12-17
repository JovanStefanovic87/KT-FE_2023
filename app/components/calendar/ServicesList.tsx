import { ServiceListProps } from '@/app/helpers/interfaces';
import ListItemData from '../ui/text/ListItemData';
import ListItemName from '../ui/text/ListItemName';
import NewAppointmentListContainer from '../ui/containers/NewAppointmentListContainer';
import NewAppointmentFormContainer from '../ui/containers/NewAppointmentFormContainer';

const ServicesList: React.FC<ServiceListProps> = ({ services, selected, setSelected }) => {
  const handleNameClick = (serviceId: string) => {
    const serviceIndex = selected.indexOf(serviceId);

    if (serviceIndex === -1) {
      setSelected([...(selected as string[]), serviceId]);
    } else {
      const updatedSelectedServices = [...(selected as string[])];
      updatedSelectedServices.splice(serviceIndex, 1);
      setSelected(updatedSelectedServices);
    }
  };
  return (
    <NewAppointmentFormContainer>
      {services.map((service, index) => (
        <NewAppointmentListContainer
          list={service}
          selectedName={selected}
          onClick={() => handleNameClick(service.id)}
          key={service.id}
        >
          <ListItemName index={index} title={service.name} />
          <ListItemData title='Opis' item={` ${service.description}`} />
          <ListItemData title='Trajanje' item={` ${service.duration} min`} />
          <ListItemData title='Cena' item={` ${service.price} rsd`} />
        </NewAppointmentListContainer>
      ))}
    </NewAppointmentFormContainer>
  );
};

export default ServicesList;
