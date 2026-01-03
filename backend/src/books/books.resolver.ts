import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
@UseGuards(GqlAuthGuard)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) { }

    @Mutation(() => Book)
    createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
        return this.booksService.create(createBookInput);
    }

    @Query(() => [Book], { name: 'books' })
    findAll() {
        return this.booksService.findAll();
    }

    @Query(() => Book, { name: 'book' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.findOne(id);
    }

    @Mutation(() => Book)
    updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
        return this.booksService.update(updateBookInput.id, updateBookInput);
    }

    @Mutation(() => Boolean)
    removeBook(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.remove(id);
    }
}
