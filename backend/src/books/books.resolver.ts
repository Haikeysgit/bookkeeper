/**
 * Books Resolver - GraphQL API Endpoints for Book Operations
 * 
 * This resolver exposes CRUD operations for books via GraphQL.
 * All endpoints are protected by GqlAuthGuard, requiring a valid
 * Auth0 JWT token for access.
 */

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
@UseGuards(GqlAuthGuard)  // Protect all endpoints - requires valid Auth0 token
export class BooksResolver {
    constructor(private readonly booksService: BooksService) { }

    /** Create a new book */
    @Mutation(() => Book)
    createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
        return this.booksService.create(createBookInput);
    }

    /** Get all books */
    @Query(() => [Book], { name: 'books' })
    findAll() {
        return this.booksService.findAll();
    }

    /** Get a single book by ID */
    @Query(() => Book, { name: 'book' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.findOne(id);
    }

    /** Update an existing book */
    @Mutation(() => Book)
    updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
        return this.booksService.update(updateBookInput.id, updateBookInput);
    }

    /** Delete a book by ID */
    @Mutation(() => Boolean)
    removeBook(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.remove(id);
    }
}
