import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    console.log('Getting all employees ...');

    const employees = await prisma.employee.findMany();
    console.log('Employees fetched successfully');

    return Response.json(employees);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch employees' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
