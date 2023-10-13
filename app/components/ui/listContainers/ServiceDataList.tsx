import { ServiceDataListProps } from '@/app/helpers/interfaces';
import FormItemData from '../text/FormItemData';
import FormItemName from '../text/FormItemName';

const ServiceDataList: React.FC<ServiceDataListProps> = ({
  filteredServices,
  selected,
  setSelected,
}) => {
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
    <ul className='grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-4/6 overflow-auto'>
      {filteredServices.map((service, index) => (
        <li
          key={service.id}
          className={`border-2 p-2 rounded-md cursor-pointer ${
            selected.includes(service.id) ? 'bg-blue-100' : ''
          }`}
          onClick={() => handleNameClick(service.id)}
        >
          <FormItemName index={index} title={service.name} />
          <FormItemData title='Opis' item={` ${service.description}`} />
          <FormItemData title='Trajanje' item={` ${service.duration} min`} />
          <FormItemData title='Cena' item={` ${service.price} rsd`} />
        </li>
      ))}
    </ul>
  );
};

export default ServiceDataList;
