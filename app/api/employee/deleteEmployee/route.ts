import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
};

export async function POST(req: Request) {
  try {
    console.log('Deleting employee ...');
    const { id }: Body = await req.json();

    const deletedEmployee = await prisma.employee.delete({
      where: {
        id,
      },
    });
    console.log('Employee deleted successfully');

    return Response.json(deletedEmployee);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete employee' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
