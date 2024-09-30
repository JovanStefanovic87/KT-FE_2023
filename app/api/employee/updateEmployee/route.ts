import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
  name: string;
  serviceProviderId: number;
};

export async function POST(req: Request) {
  try {
    console.log('Updating employee ...');
    const { id, name, serviceProviderId }: Body = await req.json();

    const updatedEmployee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
        serviceProviderId,
      },
    });
    console.log('Employee updated successfully');

    return Response.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to update employee' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
