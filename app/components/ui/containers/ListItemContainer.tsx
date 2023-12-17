import React from 'react';

interface Client {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface Props {
  client?: Client;
  service?: Service;
  children: React.ReactNode;
}

const ListItemContainer: React.FC<Props> = ({ client, service, children }) => {
  return (
    <li
      key={client?.id || service?.id}
      className={`border-2 p-2 rounded-md cursor-pointer bg-blue-100`}
      onClick={() => {}}
    >
      {children}
    </li>
  );
};

export default ListItemContainer;
