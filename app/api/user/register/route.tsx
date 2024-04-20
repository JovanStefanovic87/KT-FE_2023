import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

type RegisterUserBody = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, username, email, password }: RegisterUserBody = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email: email } });
    const userName = await prisma.user.findUnique({ where: { username: username } });

    if (existingUser || userName) {
      return new Response(
        JSON.stringify({
          error: existingUser ? 'Email is already registered' : 'User name already exist',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: 'User registered successfully', userId: newUser.id }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
