import { type FastifyInstance } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export async function getAttendeeBadge(app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          attendeeId: z.string().transform(Number),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, replay) => {
      const { attendeeId } = request.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      });

      if (attendee === null) {
        throw new Error('Attendee not found');
      }

      const baseURL = `${request.protocol}://${request.hostname}`;

      const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);

      return replay.status(201).send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString(),
        },
      });
    },
  );
}