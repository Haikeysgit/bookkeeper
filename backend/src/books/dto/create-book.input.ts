/**
 * Create Book Input - GraphQL Input Type
 * 
 * Defines the required fields for creating a new book.
 * Used by the createBook mutation.
 */

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    category: string;
}
