import { SetStateAction, Dispatch } from 'react';
import {
  ClientProps,
  ServicesProps,
  ServiceProviderProps,
  EmployeeProps,
  AppointmentProps,
  AppointmentInfoType,
  ErrorModalType,
  InfoModalType,
} from '../helpers/interfaces';

import axios from 'axios';

interface WorkingHoursData {
  date: string;
  day: string;
  morningFrom: string;
  morningTo: string;
  afternoonFrom: string;
  afternoonTo: string;
  absence: string;
  id?: string;
}

const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const fetchCalendarInitData = async (
  setServices: Dispatch<SetStateAction<ServicesProps[]>>,
  setClients: Dispatch<SetStateAction<ClientProps[]>>,
  setServiceProviders: Dispatch<SetStateAction<ServiceProviderProps[]>>,
  setSelectedServiceProvider: Dispatch<SetStateAction<string>>,
  setDataLoaded: Dispatch<SetStateAction<boolean>>,
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

export const fetchCleintCalendarInitData = async (
  setServices: Dispatch<SetStateAction<ServicesProps[]>>,
  setServiceProviders: Dispatch<SetStateAction<ServiceProviderProps[]>>,
  setSelectedServiceProvider: Dispatch<SetStateAction<string>>,
  setDataLoaded: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const servicesResponse = await axios.get(`${API_URL}/services`);
    if (servicesResponse.data) {
      setServices(servicesResponse.data);
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
  selectedServiceProvider: string,
) => {
  try {
    const employeesResponse = await axios.get(
      `${API_URL}/employees?service_provider=${selectedServiceProvider}`,
    );
    if (employeesResponse.data && employeesResponse.data.length > 0) {
      setEmployees(employeesResponse.data);
      setSelectedEmployee(employeesResponse.data[0].name);
    }
  } catch (error) {}
};

export const fetchEmployeeWorkingHours = async (
  setWorkingHours: Dispatch<SetStateAction<any>>,
  selectedEmployee: string,
  calendarDates: string[],
) => {
  try {
    const allWorkingHoursDataPromises = [];
    for (const date of calendarDates) {
      const workingHoursPromise = axios.get(`${API_URL}/workingHours`, {
        params: {
          employeeId: selectedEmployee,
          date, // Use the current date in the loop iteration
        },
      });

      allWorkingHoursDataPromises.push(workingHoursPromise);
    }
    const allWorkingHoursDataResponses = await Promise.all(allWorkingHoursDataPromises);
    console.log(allWorkingHoursDataResponses);

    const allWorkingHoursData = allWorkingHoursDataResponses
      .map((response) => response.data)
      .filter((data) => data);

    setWorkingHours(allWorkingHoursData.flatMap((innerArray) => innerArray));
  } catch (error) {
    // Handle errors
    console.error('Error fetching working hours:', error);
  }
};

export const addNewAppointment = async (
  newAppointment: AppointmentProps,
  selectedEmployee: string,
  selectedServiceProvider: string,
  setAppointments: Dispatch<SetStateAction<AppointmentProps[]>>,
  setAppontmentInfo: Dispatch<SetStateAction<AppointmentInfoType>>,
  setNewAppointment: Dispatch<SetStateAction<AppointmentProps>>,
  newAppointmentInit: AppointmentProps,
  setErrorModal: Dispatch<SetStateAction<ErrorModalType>>,
) => {
  try {
    newAppointment.employee = selectedEmployee;
    newAppointment.serviceProvider = selectedServiceProvider;

    await axios.post(`${API_URL}/appointments`, newAppointment);
    const response = await axios.get(`${API_URL}/appointments?employee=${selectedEmployee}`);
    if (response.data) {
      setAppointments(response.data);
      setAppontmentInfo({
        isVisible: true,
        appointmentData: newAppointment,
      });
    } else {
      setErrorModal({ isVisible: true, text: 'Something went wrong.' });
    }
    setNewAppointment(newAppointmentInit);
  } catch (error) {
    console.error('An error occurred while pushing data:', error);
    setErrorModal({ isVisible: true, text: 'An error occurred. Please try again.' });
  }
};

export const postEmployeeWorkingHours = async (
  employeeId: string,
  workingHoursData: WorkingHoursData[],
) => {
  try {
    const postPromises = workingHoursData.map((data) => {
      return axios.post(`${API_URL}/workingHours`, {
        employeeId,
        ...data,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(postPromises);

    console.log('Working hours posted successfully');
  } catch (error) {
    console.error('Error posting working hours:', error);
    throw error;
  }
};

export const updateEmployeeWorkingHours = async (
  employeeId: string,
  workingHoursData: WorkingHoursData[],
) => {
  try {
    const updatePromises = workingHoursData.map((data) => {
      return axios.put(`${API_URL}/workingHours/${data.id}`, {
        employeeId,
        ...data,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(updatePromises);

    console.log('Working hours updated successfully');
  } catch (error) {
    console.error('Error updating working hours:', error);
    throw error;
  }
};

export const fetchAppointments = async (
  setAppointments: Dispatch<SetStateAction<AppointmentProps[]>>,
  selectedEmployee: string,
) => {
  try {
    if (selectedEmployee) {
      const response = await axios.get(`${API_URL}/appointments?employee=${selectedEmployee}`);
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

export const handleAppointmentDelete = async (
  appointmentId: string,
  setAppointments: React.Dispatch<React.SetStateAction<any[]>>,
  setShowInfoModal: React.Dispatch<React.SetStateAction<InfoModalType>>,
  setErrorModal: React.Dispatch<React.SetStateAction<InfoModalType>>,
) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments/${appointmentId}`);
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId),
    );

    setShowInfoModal({ isVisible: true, text: 'Termin je uspešno obrisan.' });
  } catch (error) {
    console.error('An error occurred while deleting the appointment:', error);
    setErrorModal({ isVisible: true, text: 'Došlo je do greške, termin nije obrisan.' });
  }
};

export const fetchCleintsData = async (
  setAllClients: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    setAllClients(response.data);
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};

export const fetchServicesData = async (
  setAllServices: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    setAllServices(response.data);
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};
