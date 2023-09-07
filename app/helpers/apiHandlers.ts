import { SetStateAction, Dispatch } from 'react';
import { ClientProps, ServecesProps, ServiceProviderProps } from '../helpers/interfaces';

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const fetchCalendarInitData = async (
  setServices: Dispatch<SetStateAction<ServecesProps[]>>,
  setClients: Dispatch<SetStateAction<ClientProps[]>>,
  setServiceProviders: Dispatch<SetStateAction<ServiceProviderProps[]>>,
  setSelectedServiceProvider: Dispatch<SetStateAction<string>>,
  setDataLoaded: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const servicesResponse = await axios.get(`${API_URL}/services`);
    if (servicesResponse.data) {
      setServices(servicesResponse.data);
    }
    const clientsResponse = await axios.get(`${API_URL}/clients`);
    if (clientsResponse.data) {
      setClients(clientsResponse.data);
    }
    const serviceProvidersResponse = await axios.get(`${API_URL}/service_providers`);
    if (serviceProvidersResponse.data) {
      setServiceProviders(serviceProvidersResponse.data);
      if (serviceProvidersResponse.data.length > 0) {
        setSelectedServiceProvider(serviceProvidersResponse.data[0].name);
      }
      setDataLoaded(true);
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return { error: true, message: 'Failed to fetch data' };
  }
};
