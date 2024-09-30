import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from './common/base';
import { ClientAPI, UpdateClientAPI } from './common/type';

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ClientAPI>({
    mutationFn: async (client: ClientAPI) => {
      const url = '/api/client/newClient';
      await postData(url, client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: true });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ClientAPI>({
    mutationFn: async (client: ClientAPI) => {
      const url = '/api/client/updateClient';
      await postData(url, client);
    },
    onSuccess: (_, client) => {
      queryClient.invalidateQueries({ queryKey: ['client', client.id], exact: true });
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: true });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const url = '/api/client/deleteClient';
      await postData(url, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: true });
    },
  });
}

export function useGetClient(id: number) {
  return useQuery<UpdateClientAPI, Error>({
    queryKey: ['client', id],
    queryFn: async () => {
      const url = '/api/client/getClient';
      return await getWithParams(url, { id });
    },
    enabled: !!id, // Only fetch if ID is valid
  });
}

export function useGetClients() {
  return useQuery<UpdateClientAPI[], Error>({
    queryKey: ['clients'],
    queryFn: async () => {
      const url = '/api/client/getClients';
      return await getWithParams(url);
    },
  });
}
