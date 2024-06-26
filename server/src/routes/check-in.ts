import { type FastifyInstance } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { BadRequest } from '@/_errors/bad-request';
import { prisma } from '@/lib/prisma';

export async function checkIn(app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Check-in an attendee',
        tags: ['check-in'],
        params: z.object({
          attendeeId: z.string().transform(Number),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, replay) => {
      const { attendeeId } = request.params;

      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId,
        },
      });

      if (attendeeCheckIn !== null) {
        throw new BadRequest('Attendee already checked in');
      }

      await prisma.checkIn.create({
        data: {
          attendeeId,
        },
      });

      return replay.status(201).send();
    },
  );
}
