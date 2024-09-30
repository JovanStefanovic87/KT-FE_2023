import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    console.log('Getting all services ...');

    const services = await prisma.service.findMany();
    console.log('Services fetched successfully');

    return Response.json(services);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
