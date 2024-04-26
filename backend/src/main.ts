import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // https://docs.nestjs.com/faq/raw-body
  const app = await NestFactory.create(AppModule, { cors: false });

  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3001;
  await app.listen(port);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap app', err);
  process.exit(1);
});
