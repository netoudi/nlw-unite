import { prisma } from '../src/lib/prisma';
import { faker } from '@faker-js/faker';

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
  const attendees = Array.from({ length: 100 }).map((_, index) => {
    return {
      id: index + 1,
      eventId: '0880348a-3a6c-4719-a320-cf3a1f4d3238',
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      createdAt: faker.date.recent({ days: 30 }),
    };
  });
  await prisma.attendee.createMany({ data: attendees });
}

seed().then(() => {
  prisma.$disconnect();
});
