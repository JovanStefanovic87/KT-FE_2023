const { PrismaClient } = require('@prisma/client');

type SeedData = {
  serviceProviderTypes: { name: string }[];
  absenceTypes: { name: string }[];
  serviceOptions: { name: string; description: string }[];
  systemOptions: { name: string; description: string }[];
};

async function seedData() {
  const {
    serviceProviderTypes,
    absenceTypes,
    serviceOptions,
    systemOptions,
  }: SeedData = require('./data');
  const prisma = new PrismaClient();

  const serviceProviderTypeCount = await prisma.ServiceProviderType.count();
  if (serviceProviderTypeCount === 0) {
    console.log('Seeding service provider types...');
    await prisma.ServiceProviderType.createMany({
      data: serviceProviderTypes,
    });
  } else {
    console.log('Service provider types already seeded, skipping...');
  }
  console.log('Progress: 25%');

  const absenceTypeCount = await prisma.AbsenceType.count();
  if (absenceTypeCount === 0) {
    console.log('Seeding absence types...');
    await prisma.AbsenceType.createMany({
      data: absenceTypes,
    });
  } else {
    console.log('Absence types already seeded, skipping...');
  }
  console.log('Progress: 50%');

  const serviceOptionCount = await prisma.ServiceOption.count();
  if (serviceOptionCount === 0) {
    console.log('Seeding service options types...');
    await prisma.ServiceOption.createMany({
      data: serviceOptions,
    });
  } else {
    console.log('Service options already seeded, skipping...');
  }
  console.log('Progress: 75%');

  const systemOptionsCount = await prisma.SystemOption.count();
  if (systemOptionsCount === 0) {
    console.log('Seeding system options...');
    await prisma.SystemOption.createMany({
      data: systemOptions,
    });
  } else {
    console.log('System options already seeded, skipping...');
  }
  console.log('Progress: 100%');

  await prisma.$disconnect();
}

async function main() {
  await seedData();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
