import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClientProps, ClientFormProps } from '../../helpers/interfaces';
import Backdrop from '../ui/Backdrop';
import CloseBtn from '../ui/buttons/CloseBtn';

const ClientForm: React.FC<ClientFormProps> = ({
  displayForm,
  setDisplayForm,
  newAppointment,
  setNewAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allClients, setAllClients] = useState<ClientProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clients');
        setAllClients(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredClients = allClients.filter(
    client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phoneNumber.includes(searchQuery)
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
    setDisplayForm({ ...displayForm, clientForm: false, backdrop: false });
  };

  return (
    <form
      className="fixed mx-auto z-20"
      style={{ display: displayForm.clientForm ? 'flex' : 'none' }}
      id="clientForm"
    >
      <div className="flex flex-col items-center fixed  w-98dvw lg:w-form lg:max-w-form h-main left-0 md:left-1/2 md:-translate-x-1/2 mx-2 bg-white overflow-y-auto z-10">
        <div className="bg-ktCyan z-11 w-full flex flex-col items-center sticky top-0 mb-4 p-1">
          <CloseBtn onClick={handleFormClose} />
          <h1 className="text-2xl font-bold mb-4 text-white">IZBOR KLIJENTA</h1>
          <input
            id="ClientSearchQuery"
            name="ClientSearchQuery"
            type="text"
            placeholder="Pretraga"
            className="p-2 border rounded-md mb-4"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className="grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-4/6 overflow-auto">
          {filteredClients.map((client, index) => (
            <li
              key={client.id}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                newAppointment.client?.includes(client.id) ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleNameClick(client.id)}
            >
              <h2 className="font-bold text-ktFormItemName mb-1">{`${index + 1}. ${
                client.name
              }`}</h2>
              <p className="mb-1">
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
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
          {`Dalje >>`}
        </button>
      </div>
      <Backdrop onClick={event => handleFormClose(event)} isVisible={displayForm.backdrop} />
    </form>
  );
};

export default ClientForm;
