import { prisma } from '@/app/lib/prisma';

type Body = {
  date: string;
  startTime1: number;
  endTime1: number;
  startTime2: number;
  endTime2: number;
  absenceTypeId: number;
  employeeId: number;
};

export async function POST(req: Request) {
  try {
    console.log('Creating new working hours ...');
    const { date, startTime1, endTime1, startTime2, endTime2, absenceTypeId, employeeId }: Body =
      await req.json();

    const newWorkingHours = await prisma.workingHours.create({
      data: {
        date: new Date(date),
        startTime1,
        endTime1,
        startTime2,
        endTime2,
        absenceTypeId,
        employeeId,
      },
    });
    console.log('Working hours created successfully');

    return Response.json(newWorkingHours);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create working hours' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
