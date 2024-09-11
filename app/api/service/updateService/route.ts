import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
  name: string;
  price: number;
  duration: number;
  note: string;
};

export async function POST(req: Request) {
  try {
    console.log('Updating service ...');
    const { id, name, price, duration, note }: Body = await req.json();

    const updatedService = await prisma.service.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        duration,
        note,
      },
    });
    console.log('Service updated successfully');

    return Response.json(updatedService);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to update service' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
