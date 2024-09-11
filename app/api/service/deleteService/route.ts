import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
};

export async function POST(req: Request) {
  try {
    console.log('Deleting service ...');
    const { id }: Body = await req.json();

    const deletedService = await prisma.service.delete({
      where: {
        id,
      },
    });
    console.log('Service deleted successfully');

    return Response.json(deletedService);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete service' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
