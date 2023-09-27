import { SetStateAction, Dispatch } from 'react';
import {
  ClientProps,
  ServecesProps,
  ServiceProviderProps,
  EmployeeProps,
  AppointmentProps,
  AppointmentInfoType,
  ErrorModalType,
} from '../helpers/interfaces';

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const fetchCalendarInitData = async (
  setServices: Dispatch<SetStateAction<ServecesProps[]>>,
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
    // Initialize an empty array to store the working hours data for all dates.
    const allWorkingHoursDataPromises = [];

    // Loop through the calendarDates array and create a promise for each date.
    for (const date of calendarDates) {
      const workingHoursPromise = axios.get(`${API_URL}/workingHours`, {
        params: {
          employeeId: selectedEmployee,
          date, // Use the current date in the loop iteration
        },
      });

      allWorkingHoursDataPromises.push(workingHoursPromise);
    }

    // Use Promise.all to wait for all promises to resolve.
    const allWorkingHoursDataResponses = await Promise.all(allWorkingHoursDataPromises);

    // Extract the data from the resolved promises and filter out undefined values.
    const allWorkingHoursData = allWorkingHoursDataResponses
      .map((response) => response.data)
      .filter((data) => data); // Filter out undefined values

    // Set the combined working hours data in the state.
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

interface WorkingHoursData {
  date: string;
  day: string;
  morningFrom: string;
  morningTo: string;
  afternoonFrom: string;
  afternoonTo: string;
  absence: string;
}

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
