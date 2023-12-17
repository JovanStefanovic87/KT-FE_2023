'use client';

import React, { useState } from 'react';
import PrimaryBtn from '../ui/buttons/PrimaryBtn';
import SearchInput from '../ui/input/SearchInput';
import ListItemContainer from '../ui/containers/ListItemContainer';
import ListItemName from '../ui/text/ListItemName';
import ListContainer from '../ui/containers/ListContainer';
import ListItemData from '../ui/text/ListItemData';
import ListItemsContainer from '../ui/containers/ListItemsContainer';
import ListHeadContainer from '../ui/containers/ListHeadContainer';

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
    <ListContainer>
      <ListHeadContainer>
        <PrimaryBtn onClick={() => {}} isDisabled={false} buttonText='Novi klijent' />
        <SearchInput dataSearchQuery={searchTerm} value={searchTerm} setState={setSearchTerm} />
      </ListHeadContainer>
      <ListItemsContainer>
        {filteredClients.map((client, index) => (
          <ListItemContainer key={client.id} client={client}>
            <ListItemName index={index} title={client.name} />
            <ListItemData title='Br. telefona' item={client.phoneNumber} />
            <ListItemData title='Email' item={client.email} />
          </ListItemContainer>
        ))}
      </ListItemsContainer>
    </ListContainer>
  );
};

export default ClientList;
