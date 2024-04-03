import fastify from 'fastify';

const app = fastify();

app.get('/', async () => {
  return { message: 'Hello world!' };
});

app
  .listen({
    host: '0.0.0.0',
    port: parseInt(process.env.PORT ?? 3333),
  })
  .then(() => {
    console.log(`🚀 HTTP server listening on http://localhost:3333`);
  });
