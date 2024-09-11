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
