import { useState, useEffect } from 'react';
import { fetchCleintsData } from '@/app/helpers/apiHandlers';
import { ClientProps, CalendarFormsProps } from '@/app/helpers/interfaces';
import { newAppointmentInit } from './initStates';
import CloseIconBtn from '../ui/buttons/CloseIconBtn';
import SubmitBtn from '../ui/buttons/SubmitBtn';
import SearchInput from '../ui/input/SearchInput';
import FormContainer from '../ui/forms/FormContainer';
import ClientsDataList from '../ui/listContainers/ClientDataList';
import PrimaryTitle from '../ui/text/PrimaryTitle';

const ClientForm: React.FC<CalendarFormsProps> = ({
  displayForm,
  setDisplayForm,
  newAppointment,
  setNewAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allClients, setAllClients] = useState<ClientProps[]>([]);
  const isClientSelected = newAppointment.client !== '';

  useEffect(() => {
    fetchCleintsData(setAllClients);
  }, []);

  const filteredClients = allClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phoneNumber.includes(searchQuery),
  );

  const handleNameClick = (clientId: string) => {
    setNewAppointment({ ...newAppointment, client: clientId });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setDisplayForm({
      ...displayForm,
      clientForm: false,
      serviceForm: true,
    });
  };

  const handleFormClose = (event: React.FormEvent) => {
    event.preventDefault();
    setDisplayForm({ ...displayForm, clientForm: false });
    setNewAppointment(newAppointmentInit);
  };

  return (
    <FormContainer
      displayForm={displayForm.clientForm}
      id='clientForm'
      handleFormClose={handleFormClose}
    >
      <div className='bg-ktCyan z-11 w-full flex flex-col items-center sticky top-0 mb-4 p-1'>
        <CloseIconBtn onClick={handleFormClose} />
        <PrimaryTitle value='IZBOR KLIJENTA' />
        <SearchInput
          dataSearchQuery='ClientSearchQuery'
          value={searchQuery}
          setState={setSearchQuery}
        />
      </div>
      <ClientsDataList
        filteredClients={filteredClients}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
      />
      <SubmitBtn onClick={handleSubmit} isDisabled={!isClientSelected} buttonText='Dalje >>' />
    </FormContainer>
  );
};

export default ClientForm;
