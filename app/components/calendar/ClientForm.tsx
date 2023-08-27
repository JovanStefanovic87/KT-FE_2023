import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop';
import CloseBtn from '../ui/buttons/CloseBtn';

interface ClientFormProps {
  displayForm: {
    clientForm: boolean;
    serviceForm: boolean;
    backdrop: boolean;
  };
  setDisplayForm: React.Dispatch<
    React.SetStateAction<{
      clientForm: boolean;
      serviceForm: boolean;
      backdrop: boolean;
    }>
  >;
  formData: { client?: string; [key: string]: any };
  setFormData: React.Dispatch<
    React.SetStateAction<{ client: string; service: string[]; sent: boolean }>
  >;
}

const ClientForm: React.FC<ClientFormProps> = ({
  displayForm,
  setDisplayForm,
  formData,
  setFormData,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClients = clientsData.filter(
    client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phoneNumber.includes(searchQuery)
  );

  const handleNameClick = (clientId: string) => {
    setFormData(prevData => ({
      ...prevData,
      client: clientId,
    }));
  };

  const handleNextClick = (event: React.FormEvent) => {
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
          <CloseBtn onClick={event => handleFormClose(event)} />
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
                formData.client?.includes(client.id) ? 'bg-blue-100' : ''
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
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleNextClick}
        >
          {`Dalje >>`}
        </button>
      </div>
      <Backdrop onClick={event => handleFormClose(event)} isVisible={displayForm.backdrop} />
    </form>
  );
};

export default ClientForm;

interface Client {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const clientsData: Client[] = [
  {
    id: '01',
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'john@example.com',
  },
  {
    id: '02',
    name: 'Jane Smith',
    phoneNumber: '987-654-3210',
    email: 'jane@example.com',
  },
  {
    id: '03',
    name: 'Alen Stefanovic',
    phoneNumber: '987-654-3210',
    email: 'alen@example.com',
  },
  {
    id: '04',
    name: 'Emily Johnson',
    phoneNumber: '555-123-4567',
    email: 'emily@example.com',
  },
  {
    id: '05',
    name: 'Michael Brown',
    phoneNumber: '888-555-7890',
    email: 'michael@example.com',
  },
  {
    id: '06',
    name: 'Olivia Wilson',
    phoneNumber: '777-444-1234',
    email: 'olivia@example.com',
  },
  {
    id: '07',
    name: 'William Davis',
    phoneNumber: '555-777-8888',
    email: 'william@example.com',
  },
  {
    id: '08',
    name: 'Sophia Martinez',
    phoneNumber: '222-333-4444',
    email: 'sophia@example.com',
  },
  {
    id: '09',
    name: 'Liam Garcia',
    phoneNumber: '777-999-1111',
    email: 'liam@example.com',
  },
  {
    id: '10',
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'avsa@example.com',
  },
  {
    id: '11',
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'avda@example.com',
  },
  {
    id: '12',
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'avaa@example.com',
  },
  {
    id: '13',
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'ava@example.com',
  },
];
