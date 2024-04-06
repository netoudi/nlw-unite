import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { checkIn } from '@/routes/check-in';
import { createEvent } from '@/routes/create-event';
import { getAttendeeBadge } from '@/routes/get-attendee-badge';
import { getEvent } from '@/routes/get-event';
import { getEventAttendees } from '@/routes/get-event-attendees';
import { registerForEvent } from '@/routes/register-for-event';

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/', async () => {
  return { message: 'Hello world!' };
});

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app
  .listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT ?? 3333),
  })
  .then(() => {
    console.log(`🚀 HTTP server listening on http://localhost:3333`);
  });
