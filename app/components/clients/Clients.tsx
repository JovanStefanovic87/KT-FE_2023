'use client';

import React, { useState } from 'react';
import PrimaryBtn from '../ui/buttons/PrimaryBtn';
import SearchInput from '../ui/input/SearchInput';
import ListContainer from '../ui/containers/ListContainer';
import FormItemName from '../ui/text/ListItemName';

const clients = [
  { id: 1, name: 'Client 1', phoneNumber: '123-456-7890', email: 'client1@example.com' },
  { id: 2, name: 'Client 2', phoneNumber: '987-654-3210', email: 'client2@example.com' },
  // ... Add more clients as needed
];

// Mockup data for 50 clients
const mockupData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 3,
  name: `Client ${index + 3}`,
  phoneNumber: '555-555-5555',
  email: `client${index + 3}@example.com`,
}));

const ClientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const allClients = [...clients, ...mockupData];
  const filteredClients = allClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNumber.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='container mx-auto mt-8 w-full'>
      <div className='flex justify-between items-center py-4'>
        <PrimaryBtn onClick={() => {}} isDisabled={false} buttonText='Novi klijent' />
        <SearchInput dataSearchQuery={searchTerm} value={searchTerm} setState={setSearchTerm} />
      </div>
      <div className='flex overflow-y-auto h-list list-none'>
        <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredClients.map((client, index) => (
            <ListContainer key={client.id} client={client}>
              <FormItemName index={index} title={client.name} />
              <p className='mb-1'>
                <b>
                  <em>Br. telefona:</em>
                </b>
                {` ${client.phoneNumber}`}
              </p>
              <p>
                <b>
                  <em>Email:</em>
                </b>
                {` ${client.email}`}
              </p>
            </ListContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientList;
