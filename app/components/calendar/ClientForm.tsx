import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop';

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

const ClientForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true); // Added state for form visibility
  const [backdrop, setBackdrop] = useState<boolean>(true);

  const filteredClients = clientsData.filter(
    client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phoneNumber.includes(searchQuery)
  );

  const handleNameClick = (name: string) => {
    setSelectedName(name);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setBackdrop(false);
  };

  const formStyle: React.CSSProperties = {
    width: '850px',
    maxWidth: '90vw',
    height: '850px',
    maxHeight: '70vh',
    display: isFormOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)', // Center horizontally using transform
    backgroundColor: 'white',
    zIndex: 10,
  };

  const stickyHeaderStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0, // Stick to the top of the container
    marginBottom: '1rem', // Add margin to create space between header and content
    padding: '1rem', // Add padding for spacing
    justifyContent: 'center',
  };

  return (
    <div className="fixed mx-auto max-w-lg z-10">
      <div className="bg-white h-screen overflow-y-auto z-10" style={formStyle}>
        <div style={stickyHeaderStyle} className="bg-ktCyan z-11 w-full flex flex-col items-center">
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
      <Backdrop onClick={handleFormClose} isVisible={backdrop} />
    </div>
  );
};

export default ClientForm;
