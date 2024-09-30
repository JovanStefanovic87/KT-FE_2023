import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  try {
    const { dates }: { dates: string[] } = await req.json();

    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      return new Response(JSON.stringify({ error: 'Array of dates is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('Fetching working hours for dates:', dates);

    const workingHours = await prisma.workingHours.findMany({
      where: {
        date: {
          in: dates.map((date) => new Date(date)),
        },
      },
    });

    console.log('Working hours fetched successfully');
    return Response.json(workingHours);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch working hours' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
