/**
 * Update Book Input - GraphQL Input Type
 * 
 * Extends CreateBookInput with optional fields for partial updates.
 * The id field is required to identify which book to update.
 */

import { CreateBookInput } from './create-book.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field(() => Int)
    id: number;
}
