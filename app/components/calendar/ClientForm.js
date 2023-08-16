import React, { useState } from 'react';
import Backdrop from '../ui/Backdrop'

const clientsData = [
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


const ClientForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState(null); // Newly added state

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phoneNumber.includes(searchQuery)
  );

  const handleNameClick = name => {
    setSelectedName(name);
  };

  const listContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Wrap items to next row
    justifyContent: 'center',
    gap: '0.5rem', // Add some space between items
    listStyle: 'none', // Remove default list styles
    padding: 2, // Remove default padding
  };

  const formStyle = {
  width: '850px',
  maxWidth: '90vw',
  height: '850px',
  maxHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center horizontally
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)', // Center horizontally using transform
  backgroundColor: 'white',
  zIndex: 10,
  }

  const stickyHeaderStyle = {
    position: 'sticky',
    top: 0, // Stick to the top of the container
    marginBottom: '1rem', // Add margin to create space between header and content
    padding: '1rem', // Add padding for spacing
    justifyContent: 'center',
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="fixed bg-white h-screen overflow-y-auto z-10" style={formStyle}>
        <div style={stickyHeaderStyle} className='bg-ktCyan z-11 w-full flex flex-col items-center'>
          <h1 className="text-2xl font-bold mb-4 text-white">IZBOR KLIJENTA</h1>
          <input
            type="text"
            placeholder="Pretraga"
            className="p-2 border rounded-md mb-4"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <ul style={listContainerStyle}>
          {filteredClients.map((client, index) => (
            <li
              key={client.id}
              className={`border p-2 rounded-md cursor-pointer ${
                selectedName === client.name ? 'bg-blue-100' : ''
              }`}
              style={{ flex: '0 0 calc(33.33% - 1rem)' }} // Set width for each item
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
      <Backdrop/>
    </div>
  );
};

export default ClientForm;
