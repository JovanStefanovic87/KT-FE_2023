import { prisma } from '@/app/lib/prisma';

type Body = {
  id: number;
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
    console.log('Updating working hours ...');
    const {
      id,
      date,
      startTime1,
      endTime1,
      startTime2,
      endTime2,
      absenceTypeId,
      employeeId,
    }: Body = await req.json();

    const updatedWorkingHours = await prisma.workingHours.update({
      where: { id },
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
    console.log('Working hours updated successfully');

    return Response.json(updatedWorkingHours);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to update working hours' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
