/**
 * Book Entity - Database Model
 * 
 * Defines the Book table structure for SQLite database.
 * Also serves as the GraphQL object type for API responses.
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()  // Exposes this class as a GraphQL type
@Entity()      // Maps this class to a database table
export class Book {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({ default: 'General' })
    category: string;
}
