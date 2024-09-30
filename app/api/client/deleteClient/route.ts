import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
};

export async function POST(req: Request) {
  try {
    console.log('Deleting client ...');
    const { id }: Body = await req.json();

    const deletedClient = await prisma.client.delete({
      where: {
        id,
      },
    });
    console.log('Client deleted successfully');

    return Response.json(deletedClient);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete client' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
