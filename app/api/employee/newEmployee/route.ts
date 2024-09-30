import { prisma } from '@/app/lib/prisma';

type Body = {
  name: string;
  serviceProviderId: number;
};

export async function POST(req: Request) {
  try {
    console.log('Creating new employee ...');
    const { name, serviceProviderId }: Body = await req.json();

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        serviceProviderId,
      },
    });
    console.log('Employee created successfully');

    return Response.json(newEmployee);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create employee' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
