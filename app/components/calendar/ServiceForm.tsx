import { useState, useEffect } from 'react';
import { fetchServicesData } from '@/app/helpers/apiHandlers';
import { ServicesProps, CalendarFormsProps } from '@/app/helpers/interfaces';
import { newAppointmentInit } from './initStates';
import CloseIconBtn from '../ui/buttons/CloseIconBtn';
import FormContainer from '../ui/forms/FormContainer';
import ServiceDataList from '../ui/containers/ServiceDataList';
import SearchInput from '../ui/input/SearchInput';
import PrimaryTitle from '../ui/text/PrimaryTitle';
import FormHeader from '../ui/forms/FormHeader';
import PrimaryButton from '../ui/buttons/PrimaryButton';

const ServiceForm: React.FC<CalendarFormsProps> = ({
  displayForm,
  setDisplayForm,
  newAppointment,
  setNewAppointment,
  selected,
  setSelected,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allServices, setAllServices] = useState<ServicesProps[]>([]);
  const isServiceSelected = selected.length !== 0;

  useEffect(() => {
    fetchServicesData(setAllServices);
  }, []);

  const filteredServices = allServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNewAppointment({ ...newAppointment, services: selected as string[] });
    setDisplayForm((prevState) => ({
      ...prevState,
      serviceForm: false,
      backdrop: false,
      post: true,
    }));
    setSelected([]);
  };

  const handleFormClose = (event: React.FormEvent) => {
    event.preventDefault();
    setDisplayForm({ ...displayForm, serviceForm: false });
    setNewAppointment(newAppointmentInit);
    setSelected([]);
  };

  return (
    <FormContainer
      displayForm={displayForm.serviceForm}
      id='serviceForm'
      handleFormClose={handleFormClose}
    >
      <FormHeader>
        <CloseIconBtn onClick={handleFormClose} />
        <PrimaryTitle value='IZBOR USLUGE' />
        <SearchInput
          dataSearchQuery='ServiceSearchQuery'
          value={searchQuery}
          setState={setSearchQuery}
        />
      </FormHeader>
      <ServiceDataList services={filteredServices} selected={selected} setSelected={setSelected} />
      <PrimaryButton
        onClick={handleSubmit}
        isDisabled={!isServiceSelected}
        buttonText='Rezerviši termin >>'
        type='submit'
      />
    </FormContainer>
  );
};

export default ServiceForm;
