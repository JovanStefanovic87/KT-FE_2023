import { prisma } from '@/app/lib/prisma';

type Body = {
  name: string;
  companyId: number;
  serviceProviderTypeId: number;
};

export async function POST(req: Request) {
  try {
    console.log('Creating new service provider...');
    const { name, companyId, serviceProviderTypeId }: Body = await req.json();

    const newServiceProvider = await prisma.serviceProvider.create({
      data: {
        name,
        companyId: companyId,
        serviceProviderTypeId: serviceProviderTypeId,
      },
    });
    console.log('Service provider created successfully');

    return Response.json(newServiceProvider);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create company' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
