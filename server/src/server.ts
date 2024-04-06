import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { generateSlug } from '@/utils/generate-slug';

const prisma = new PrismaClient({
  log: ['query'],
});

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/', async () => {
  return { message: 'Hello world!' };
});

app.withTypeProvider<ZodTypeProvider>().post(
  '/events',
  {
    schema: {
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid(),
        }),
      },
    },
  },
  async (request, replay) => {
    const { title, details, maximumAttendees } = request.body;

    const slug = generateSlug(title);

    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    if (eventWithSameSlug !== null) {
      throw new Error('Another event with same title already exists');
    }

    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug,
      },
    });

    return replay.status(201).send({ eventId: event.id });
  },
);

app
  .listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT ?? 3333),
  })
  .then(() => {
    console.log(`🚀 HTTP server listening on http://localhost:3333`);
  });
