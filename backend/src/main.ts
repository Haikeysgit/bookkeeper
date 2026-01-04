/**
 * Application Entry Point
 * 
 * Bootstraps the NestJS application and configures:
 * - CORS for frontend communication
 * - Server port binding
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from the frontend
  // FRONTEND_URL env var for production, localhost fallbacks for development
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ].filter(Boolean); // Remove undefined values

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,  // Allow cookies and auth headers
  });

  // Start server on configured port (default: 3000)
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}/graphql`);
}

bootstrap();
