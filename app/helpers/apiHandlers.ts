import { SetStateAction, Dispatch } from 'react';
import {
  ClientProps,
  ServecesProps,
  ServiceProviderProps,
  EmployeeProps,
  AppointmentProps,
  ModalInfoType,
} from '../helpers/interfaces';

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

export const fetchEmployeesData = async (
  setEmployees: Dispatch<SetStateAction<EmployeeProps[]>>,
  setSelectedEmployee: Dispatch<SetStateAction<string>>,
  selectedServiceProvider: string
) => {
  try {
    const employeesResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/employees?service_provider=${selectedServiceProvider}`
    );
    if (employeesResponse.data && employeesResponse.data.length > 0) {
      setEmployees(employeesResponse.data);

      // Set selectedEmployee to the first employee in the array
      setSelectedEmployee(employeesResponse.data[0].name); // Assuming 'name' is the property containing employee names
    }
  } catch (error) {}
};

export const addNewAppointment = async (
  newAppointment: AppointmentProps,
  selectedEmployee: string,
  selectedServiceProvider: string,
  setAppointments: Dispatch<SetStateAction<AppointmentProps[]>>,
  setModalInfo: Dispatch<SetStateAction<ModalInfoType>>,
  setNewAppointment: Dispatch<SetStateAction<AppointmentProps>>,
  newAppointmentInit: AppointmentProps
) => {
  try {
    newAppointment.employee = selectedEmployee;
    newAppointment.serviceProvider = selectedServiceProvider;

    await axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments`, newAppointment);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments?employee=${selectedEmployee}`
    );
    if (response.data) {
      setAppointments(response.data);
      setModalInfo({
        isVisible: true,
        message: 'Appointment successfully made.',
        appointmentData: newAppointment,
      });
    } else {
      setModalInfo({ isVisible: true, message: 'Something went wrong.' });
    }
    setNewAppointment(newAppointmentInit);
  } catch (error) {
    console.error('An error occurred while pushing data:', error);
    setModalInfo({ isVisible: true, message: 'An error occurred. Please try again.' });
  }
};

export const fetchAppointments = async (
  setAppointments: Dispatch<SetStateAction<AppointmentProps[]>>,
  selectedEmployee: string
) => {
  try {
    if (selectedEmployee) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments?employee=${selectedEmployee}`
      );
      if (response.data) {
        setAppointments(response.data);
      }
    } else {
      setAppointments([]);
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};
