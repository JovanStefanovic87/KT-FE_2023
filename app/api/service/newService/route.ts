import { prisma } from '@/app/lib/prisma';

type Body = {
  name: string;
  price: number;
  duration: number;
  note: string;
  serviceProviderId: number;
};

export async function POST(req: Request) {
  try {
    console.log('Creating new service ...');
    const { name, price, duration, note, serviceProviderId }: Body = await req.json();

    const newService = await prisma.service.create({
      data: {
        name,
        price,
        duration,
        note,
        serviceProviderId,
      },
    });
    console.log('Service created successfully');

    return Response.json(newService);
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
