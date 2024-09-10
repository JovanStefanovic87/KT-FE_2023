import { postData } from './base';

export async function newCompany(name: string) {
  const url = '/api/company/newcompany';

  postData(url, { name });
}

export async function newServiceProvider(serviceProviderData: any) {
  const url = '/api/company/newServiceProvider';

  postData(url, serviceProviderData);
}
