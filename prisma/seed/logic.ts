const { PrismaClient } = require('@prisma/client');

async function seedServiceProviderTypes() {
  const { serviceProviderTypes }: { serviceProviderTypes: { name: string }[] } = require('./data');
  console.log('Seeding service provider types...');
  console.log('Success 100%');

  const prisma = new PrismaClient();

  await prisma.ServiceProviderType.createMany({
    data: serviceProviderTypes,
  });

  await prisma.$disconnect();
}

async function main() {
  await seedServiceProviderTypes();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
