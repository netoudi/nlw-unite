import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvent } from '@/routes/create-event';

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/', async () => {
  return { message: 'Hello world!' };
});

app.register(createEvent);

app
  .listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT ?? 3333),
  })
  .then(() => {
    console.log(`🚀 HTTP server listening on http://localhost:3333`);
  });
