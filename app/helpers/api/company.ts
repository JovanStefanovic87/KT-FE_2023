import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postData } from './common/base';

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (name: string) => {
      const url = '/api/company/newcompany';
      await postData(url, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'], exact: true });
    },
  });
}

export function useCreateServiceProvider() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, any>({
    mutationFn: async (serviceProviderData: any) => {
      const url = '/api/company/newServiceProvider';
      await postData(url, serviceProviderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceProviders'], exact: true });
    },
  });
}
