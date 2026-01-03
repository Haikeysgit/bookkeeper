/**
 * App Module - Root Application Configuration
 * 
 * This is the central configuration hub that registers all modules:
 * - ConfigModule: Loads environment variables from .env
 * - TypeOrmModule: SQLite database connection
 * - GraphQLModule: Apollo Server for GraphQL API
 * - BooksModule: Book CRUD operations
 * - AuthModule: Auth0 JWT authentication
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    // Load .env file and make variables globally available
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // SQLite database configuration using sql.js (in-browser SQLite)
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'database.sqlite',  // Database file stored in repository
      autoSave: true,               // Auto-persist changes to file
      entities: [Book],
      synchronize: true,            // Auto-create tables (dev only)
    }),

    // GraphQL API configuration with Apollo Server
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),  // Auto-generate schema
      playground: true,  // Enable GraphQL Playground for testing
    }),

    // Feature modules
    BooksModule,
    AuthModule,
  ],
})
export class AppModule { }
