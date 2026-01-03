/**
 * Books Service - Core business logic for book operations
 * 
 * This service handles all CRUD operations for the Book entity
 * and automatically seeds the database with sample data on first run.
 */

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

/** Sample books to populate the database for demo purposes */
const SEED_BOOKS = [
    {
        name: 'The Toxin Audit',
        description: 'Dr. Helena Voss provides a comprehensive field guide to identifying, cataloging, and safely recovering toxic chemicals from industrial waste streams.',
        category: 'Industrial',
    },
    {
        name: 'Industrial Streams',
        description: 'Marcus Chen explores innovative methods for transforming factory byproducts into valuable resources, featuring case studies from leading facilities.',
        category: 'Industrial',
    },
    {
        name: 'From Curb to Commodity',
        description: 'Sarah Kellerman traces the complete lifecycle of municipal waste, from collection to processing, revealing opportunities for value recovery.',
        category: 'Municipal',
    },
    {
        name: 'Zero Waste Cities',
        description: 'James Okafor presents actionable strategies for municipalities aiming to achieve zero waste status, with examples from successful programs.',
        category: 'Municipal',
    },
    {
        name: 'The Decomposition Advantage',
        description: 'Maria Sandoval demonstrates how organic waste can be transformed into premium compost and biogas, creating environmental and economic value.',
        category: 'Organic',
    },
    {
        name: 'Soil Regeneration',
        description: 'Dr. Patrick Greenway explains the science behind using composted organic matter to restore depleted soils and enhance agricultural productivity.',
        category: 'Organic',
    },
];

@Injectable()
export class BooksService implements OnModuleInit {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }

    /** Lifecycle hook - runs when the module initializes */
    async onModuleInit() {
        await this.seedDatabase();
    }

    /** Seeds the database with sample books if empty (first-time setup) */
    private async seedDatabase() {
        const count = await this.booksRepository.count();
        if (count === 0) {
            console.log('Seeding database with waste management books...');
            for (const bookData of SEED_BOOKS) {
                const book = this.booksRepository.create(bookData);
                await this.booksRepository.save(book);
            }
            console.log(`Seeded ${SEED_BOOKS.length} books successfully.`);
        }
    }

    /** Creates a new book and saves it to the database */
    create(createBookInput: CreateBookInput): Promise<Book> {
        const newBook = this.booksRepository.create(createBookInput);
        return this.booksRepository.save(newBook);
    }

    /** Retrieves all books from the database */
    findAll(): Promise<Book[]> {
        return this.booksRepository.find();
    }

    /** Finds a single book by ID, throws NotFoundException if not found */
    async findOne(id: number): Promise<Book> {
        const book = await this.booksRepository.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book #${id} not found`);
        }
        return book;
    }

    /** Updates an existing book with new data */
    async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
        const book = await this.findOne(id);
        const updatedBook = Object.assign(book, updateBookInput);
        return this.booksRepository.save(updatedBook);
    }

    /** Deletes a book by ID, returns true if successful */
    async remove(id: number): Promise<boolean> {
        const result = await this.booksRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
