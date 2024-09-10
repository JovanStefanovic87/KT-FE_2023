import { prisma } from '@/app/lib/prisma';

type CreateCompanyBody = {
  name: string;
};

export async function POST(req: Request) {
  try {
    console.log('Creating company...');
    const { name }: CreateCompanyBody = await req.json();

    const newCompany = await prisma.company.create({
      data: {
        name,
      },
    });
    console.log('Company created successfully');
    return Response.json(newCompany);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create company' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
