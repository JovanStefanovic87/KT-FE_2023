import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ServecesProps, CalendarFormsProps } from '../../helpers/interfaces';
import Backdrop from '../ui/Backdrop';
import CloseBtn from '../ui/buttons/CloseBtn';
import FormItemName from '../ui/text/FormItemName';
import FormItemData from '../ui/text/FormItemData';

const ServiceForm: React.FC<CalendarFormsProps> = ({
  displayForm,
  setDisplayForm,
  newAppointment,
  setNewAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allServices, setAllServices] = useState<ServecesProps[]>([]);
  const [preSelectedServeces, setPreSelectedServeces] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/services');
        setAllServices(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredServices = allServices.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNameClick = (serviceId: string) => {
    const serviceIndex = preSelectedServeces.indexOf(serviceId);

    if (serviceIndex === -1) {
      setPreSelectedServeces([...preSelectedServeces, serviceId]);
    } else {
      const updatedSelectedServices = [...preSelectedServeces];
      updatedSelectedServices.splice(serviceIndex, 1);
      setPreSelectedServeces(updatedSelectedServices);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNewAppointment({ ...newAppointment, services: preSelectedServeces });
    setDisplayForm(prevState => ({
      ...prevState,
      serviceForm: false,
      backdrop: false,
      post: true,
    }));
    setPreSelectedServeces([]);
  };

  const handleFormClose = (event: React.FormEvent) => {
    event.preventDefault();
    setDisplayForm({ ...displayForm, serviceForm: false, backdrop: false });
  };

  return (
    <form
      className="fixed mx-auto z-20"
      style={{ display: displayForm.serviceForm ? 'flex' : 'none' }}
      id="derviceForm"
    >
      <div className="flex flex-col items-center fixed  w-98dvw lg:w-form lg:max-w-form h-main left-0 md:left-1/2 md:-translate-x-1/2 mx-2 bg-white overflow-y-auto z-10">
        <div className="bg-ktCyan z-11 w-full flex flex-col items-center sticky top-0 mb-4 p-1">
          <CloseBtn onClick={handleFormClose} />
          <h1 className="text-2xl font-bold mb-4 text-white">IZBOR USLUGE</h1>
          <input
            id="ServiceSearchQuery"
            name="ServiceSearchQuery"
            type="text"
            placeholder="Pretraga"
            className="p-2 border rounded-md mb-4"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className="grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-4/6 overflow-auto">
          {filteredServices.map((service, index) => (
            <li
              key={service.id}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                preSelectedServeces.includes(service.id) ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleNameClick(service.id)}
            >
              <FormItemName index={index} title={service.name} />
              <FormItemData title="Opis" item={` ${service.description}`} />
              <FormItemData title="Trajanje" item={` ${service.duration} min`} />
              <FormItemData title="Cena" item={` ${service.price} rsd`} />
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
          {`Rezerviši termin`}
        </button>
      </div>
      <Backdrop onClick={handleFormClose} isVisible={displayForm.backdrop} />
    </form>
  );
};

export default ServiceForm;
