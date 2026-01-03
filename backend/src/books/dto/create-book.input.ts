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
