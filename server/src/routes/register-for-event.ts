import { type FastifyInstance } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { BadRequest } from '@/_errors/bad-request';
import { prisma } from '@/lib/prisma';

export async function registerForEvent(app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Register an attendee',
        tags: ['attendees'],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, replay) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            eventId,
            email,
          },
        },
      });

      if (attendeeFromEmail !== null) {
        throw new BadRequest('This e-mail is already registered for this event');
      }

      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (event === null) {
        throw new BadRequest('Event not found');
      }

      const amountOfAttendeesForEvent = await prisma.attendee.count({
        where: {
          eventId,
        },
      });

      if (event?.maximumAttendees !== null && amountOfAttendeesForEvent >= event.maximumAttendees) {
        throw new BadRequest('The maximum number of attendees for this event has been reached');
      }

      const attendee = await prisma.attendee.create({
        data: {
          eventId,
          name,
          email,
        },
      });

      return replay.status(201).send({ attendeeId: attendee.id });
    },
  );
}
