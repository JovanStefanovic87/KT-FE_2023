import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
};

export async function POST(req: Request) {
  try {
    console.log('Deleting working hours ...');
    const { id }: Body = await req.json();

    const deletedWorkingHours = await prisma.workingHours.delete({
      where: {
        id,
      },
    });
    console.log('Working hours deleted successfully');

    return Response.json(deletedWorkingHours);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete working hours' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
