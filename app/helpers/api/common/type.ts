export type ServiceAPI = {
  id: number;
  name: string;
  price: number;
  duration: number;
  note: string;
  serviceProviderId: number;
};

export type UpdateServiceAPI = {
  id: number;
  name?: string;
  price?: number;
  duration?: number;
  note?: string;
};

export type EmployeeAPI = {
  id?: number;
  name: string;
  serviceProviderId: number;
};

export type UpdateEmployeeAPI = {
  id?: number;
  name?: string;
  serviceProviderId?: number;
};

export interface ClientAPI {
  id?: number;
  name: string;
  note: string;
  userId?: string | null;
}

export interface UpdateClientAPI extends ClientAPI {
  id: number;
}

export interface WorkingHoursAPI {
  id?: number;
  date: string;
  startTime1: number;
  endTime1: number;
  startTime2: number;
  endTime2: number;
  absenceTypeId: number;
  employeeId: number;
}

export interface UpdateWorkingHoursAPI extends WorkingHoursAPI {
  id: number;
}
