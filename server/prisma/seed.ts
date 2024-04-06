import { prisma } from '../src/lib/prisma';

async function seed(): Promise<void> {
  await prisma.event.create({
    data: {
      id: '0880348a-3a6c-4719-a320-cf3a1f4d3238',
      title: 'Unit Summit',
      slug: 'unit-summit',
      details: 'An event for developers passionate about code!',
      maximumAttendees: 100,
    },
  });
}

seed().then(() => {
  prisma.$disconnect();
});
