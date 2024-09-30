// import { getWithParams, postData } from './base';
// import { ServiceAPI, UpdateServiceAPI } from './type';

// export async function newService(service: ServiceAPI) {
//   const url = '/api/service/newService';

//   postData(url, service);
// }

// export async function updateService(service: ServiceAPI) {
//   const url = '/api/service/updateService';

//   console.log('Updating service ...data: ', service);
//   postData(url, service);
// }

// export async function deleteService(id: number) {
//   const url = '/api/service/deleteService';

//   postData(url, { id });
// }

// export async function getService(id: number): Promise<UpdateServiceAPI> {
//   const url = '/api/service/getService';

//   return await getWithParams(url, { id });
// }

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from './common/base';
import { ServiceAPI, UpdateServiceAPI } from './common/type';

export function useGetService(id: number) {
  return useQuery<UpdateServiceAPI, Error>({
    queryKey: ['service', id],
    queryFn: async () => {
      const url = '/api/service/getService';
      return await getWithParams(url, { id });
    },
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ServiceAPI>({
    mutationFn: async (service: ServiceAPI) => {
      const url = '/api/service/newService';
      await postData(url, service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'], exact: true }); // Invalidate queries related to the services list
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ServiceAPI>({
    mutationFn: async (service: ServiceAPI) => {
      const url = '/api/service/updateService';
      await postData(url, service);
    },
    onSuccess: (_, service) => {
      queryClient.invalidateQueries({ queryKey: ['service', service.id], exact: true }); // Invalidate specific service query
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const url = '/api/service/deleteService';
      await postData(url, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'], exact: true });
    },
  });
}
