import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BooksService, BooksResolver],
})
export class BooksModule { }
