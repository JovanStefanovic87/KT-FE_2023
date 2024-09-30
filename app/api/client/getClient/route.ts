import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    console.log('Getting all clients ...');

    const clients = await prisma.client.findMany();
    console.log('Clients fetched successfully');

    return Response.json(clients);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch clients' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
