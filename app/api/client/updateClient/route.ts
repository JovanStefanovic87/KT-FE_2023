import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
  name: string;
  note: string;
  userId?: string | null;
};

export async function POST(req: Request) {
  try {
    console.log('Updating client ...');
    const { id, name, note, userId }: Body = await req.json();

    const updatedClient = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        note,
        userId,
      },
    });
    console.log('Client updated successfully');

    return Response.json(updatedClient);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to update client' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
