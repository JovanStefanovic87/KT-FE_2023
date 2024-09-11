import { getWithParams, postData } from './base';
import { ServiceAPI, UpdateServiceAPI } from './type';

export async function newService(service: ServiceAPI) {
  const url = '/api/service/newService';

  postData(url, service);
}

export async function updateService(service: ServiceAPI) {
  const url = '/api/service/updateService';

  console.log('Updating service ...data: ', service);
  postData(url, service);
}

export async function deleteService(id: number) {
  const url = '/api/service/deleteService';

  postData(url, { id });
}

export async function getService(id: number): Promise<UpdateServiceAPI> {
  const url = '/api/service/getService';

  return await getWithParams(url, { id });
}
