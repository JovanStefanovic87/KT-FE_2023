import { useState, useEffect } from 'react';
import { fetchCleintsData } from '@/app/helpers/apiHandlers';
import { ClientProps, CalendarFormsProps } from '@/app/helpers/interfaces';
import { newAppointmentInit } from './initStates';
import CloseIconBtn from '../ui/buttons/CloseIconBtn';
import SearchInput from '../ui/input/SearchInput';
import FormContainer from '../ui/forms/FormContainer';
import ClientsDataList from '../ui/containers/ClientDataList';
import PrimaryTitle from '../ui/text/PrimaryTitle';
import FormHeader from '../ui/forms/FormHeader';
import PrimaryButton from '../ui/buttons/PrimaryButton';

const ClientForm: React.FC<CalendarFormsProps> = ({
  displayForm,
  setDisplayForm,
  newAppointment,
  setNewAppointment,
  selected,
  setSelected,
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
      <FormHeader>
        <CloseIconBtn onClick={handleFormClose} />
        <PrimaryTitle value='IZBOR KLIJENTA' />
        <SearchInput
          dataSearchQuery='ClientSearchQuery'
          value={searchQuery}
          setState={setSearchQuery}
        />
      </FormHeader>
      <ClientsDataList
        clients={filteredClients}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        selected={selected}
        setSelected={setSelected}
      />
      <PrimaryButton
        onClick={handleSubmit}
        isDisabled={!isClientSelected}
        buttonText='Dalje >>'
        type='submit'
      />
    </FormContainer>
  );
};

export default ClientForm;
