import { prisma } from '@/app/lib/prisma';

type Body = {
  name: string;
  note: string;
  userId?: string | null;
};

export async function POST(req: Request) {
  try {
    console.log('Creating new client ...');
    const { name, note, userId }: Body = await req.json();

    const newClient = await prisma.client.create({
      data: {
        name,
        note,
        userId,
      },
    });
    console.log('Client created successfully');

    return Response.json(newClient);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create client' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
