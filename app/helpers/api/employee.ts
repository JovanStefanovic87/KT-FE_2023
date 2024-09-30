import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from './common/base';
import { EmployeeAPI, UpdateEmployeeAPI } from './common/type';

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, EmployeeAPI>({
    mutationFn: async (employee: EmployeeAPI) => {
      const url = '/api/employee/newEmployee';
      await postData(url, employee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'], exact: true });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, EmployeeAPI>({
    mutationFn: async (employee: EmployeeAPI) => {
      const url = '/api/employee/updateEmployee';
      await postData(url, employee);
    },
    onSuccess: (_, employee) => {
      queryClient.invalidateQueries({ queryKey: ['employee', employee.id], exact: true });
      queryClient.invalidateQueries({ queryKey: ['employees'], exact: true });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const url = '/api/employee/deleteEmployee';
      await postData(url, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'], exact: true });
    },
  });
}

export function useGetEmployee(id: number) {
  return useQuery<UpdateEmployeeAPI, Error>({
    queryKey: ['employee', id],
    queryFn: async () => {
      const url = '/api/employee/getEmployee';
      return await getWithParams(url, { id });
    },
    enabled: !!id, // Only fetch if ID is valid
  });
}

export function useGetEmployees() {
  return useQuery<UpdateEmployeeAPI[], Error>({
    queryKey: ['employees'],
    queryFn: async () => {
      const url = '/api/employee/getEmployees';
      return await getWithParams(url);
    },
  });
}
