import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
};

export async function GET(req: Request) {
  try {
    console.log('Getting service ...');

    // Extract query parameters from the URL
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get('id') || '0', 10); // Default to 0 if id is not provided

    if (!id) {
      return new Response(JSON.stringify({ error: 'Invalid or missing ID' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      return new Response(JSON.stringify({ error: 'Service not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('Service fetched successfully');
    return new Response(JSON.stringify(service), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch service' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
