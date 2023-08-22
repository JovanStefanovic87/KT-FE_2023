import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop';

interface ClientFormProps {
  displayForm: {
    form: boolean;
    backdrop: boolean;
  };
  setDisplayForm: React.Dispatch<
    React.SetStateAction<{
      form: boolean;
      backdrop: boolean;
    }>
  >;
}

interface Client {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

const clientsData: Client[] = [
  {
    id: 1,
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phoneNumber: '987-654-3210',
    email: 'jane@example.com',
  },
  {
    id: 3,
    name: 'Alen Stefanovic',
    phoneNumber: '987-654-3210',
    email: 'alen@example.com',
  },
  // Add more clients as needed
  {
    id: 4,
    name: 'Emily Johnson',
    phoneNumber: '555-123-4567',
    email: 'emily@example.com',
  },
  {
    id: 5,
    name: 'Michael Brown',
    phoneNumber: '888-555-7890',
    email: 'michael@example.com',
  },
  {
    id: 6,
    name: 'Olivia Wilson',
    phoneNumber: '777-444-1234',
    email: 'olivia@example.com',
  },
  {
    id: 7,
    name: 'William Davis',
    phoneNumber: '555-777-8888',
    email: 'william@example.com',
  },
  {
    id: 8,
    name: 'Sophia Martinez',
    phoneNumber: '222-333-4444',
    email: 'sophia@example.com',
  },
  {
    id: 9,
    name: 'Liam Garcia',
    phoneNumber: '777-999-1111',
    email: 'liam@example.com',
  },
  {
    id: 10,
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'ava@example.com',
  },
  {
    id: 11,
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'ava@example.com',
  },
  {
    id: 12,
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'ava@example.com',
  },
  {
    id: 13,
    name: 'Ava Rodriguez',
    phoneNumber: '888-222-3333',
    email: 'ava@example.com',
  },
];

const ClientForm: React.FC<ClientFormProps> = ({ displayForm, setDisplayForm }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const filteredClients = clientsData.filter(
    client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phoneNumber.includes(searchQuery)
  );

  const handleNameClick = (name: string) => {
    setSelectedName(name);
  };

  const handleFormClose = () => {
    setDisplayForm({
      form: false,
      backdrop: false,
    });
  };

  return (
    <div className="fixed mx-auto z-10" style={{ display: displayForm.form ? 'flex' : 'none' }}>
      <div className="flex flex-col items-center fixed  w-98dvw lg:w-form lg:max-w-form h-main left-0 md:left-1/2 md:-translate-x-1/2 mx-2 bg-white overflow-y-auto z-10">
        <div className="bg-ktCyan z-11 w-full flex flex-col items-center sticky top-0 mb-4 p-1">
          <h1 className="text-2xl font-bold mb-4 text-white">IZBOR KLIJENTA</h1>
          <input
            type="text"
            placeholder="Pretraga"
            className="p-2 border rounded-md mb-4"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className="grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredClients.map((client, index) => (
            <li
              key={client.id}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                selectedName === client.name ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleNameClick(client.name)}
            >
              <h2 className="font-bold mb-1">{`${index + 1}. ${client.name}`}</h2>
              <p className="mb-1">Phone: {client.phoneNumber}</p>
              <p>Email: {client.email}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-72 p-4">
        {selectedName && (
          <p>
            Selected Name: <strong>{selectedName}</strong>
          </p>
        )}
      </div>
      <Backdrop onClick={handleFormClose} isVisible={displayForm.backdrop} />
    </div>
  );
};

export default ClientForm;
