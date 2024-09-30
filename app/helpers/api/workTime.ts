import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from './common/base';
import { WorkingHoursAPI, UpdateWorkingHoursAPI } from './common/type';

const baseUrl = '/api/workTime';

export function useCreateWorkingHours() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, WorkingHoursAPI>({
    mutationFn: async (workingHours: WorkingHoursAPI) => {
      const url = `${baseUrl}/new`;
      await postData(url, workingHours);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workingHours'], exact: true });
    },
  });
}

export function useUpdateWorkingHours() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, WorkingHoursAPI>({
    mutationFn: async (workingHours: WorkingHoursAPI) => {
      const url = `${baseUrl}/update`;
      await postData(url, workingHours);
    },
    onSuccess: (_, workingHours) => {
      queryClient.invalidateQueries({ queryKey: ['workingHours', workingHours.id], exact: true });
      queryClient.invalidateQueries({ queryKey: ['workingHours'], exact: true });
    },
  });
}

export function useDeleteWorkingHours() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const url = `${baseUrl}/delete`;
      await postData(url, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workingHours'], exact: true });
    },
  });
}

export function useGetWorkingHours(id: number) {
  return useQuery<UpdateWorkingHoursAPI, Error>({
    queryKey: ['workingHours', id],
    queryFn: async () => {
      const url = `${baseUrl}/get`;
      return await getWithParams(url, { id });
    },
    enabled: !!id,
  });
}

export function useGetWorkingHoursByDates(dates: string[]) {
  return useQuery<UpdateWorkingHoursAPI[], Error>({
    queryKey: ['workingHours', ...dates],
    queryFn: async () => {
      const url = `${baseUrl}/getByDates`;
      return await postData(url, { dates });
    },
    enabled: dates.length > 0,
  });
}

export function useGetAllWorkingHours() {
  return useQuery<UpdateWorkingHoursAPI[], Error>({
    queryKey: ['workingHours'],
    queryFn: async () => {
      const url = `${baseUrl}/getAll`;
      return await getWithParams(url);
    },
  });
}
