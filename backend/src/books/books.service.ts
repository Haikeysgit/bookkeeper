import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

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
    {
        name: 'Circuit Reclamation',
        description: 'Li Wei Zhang details cutting-edge techniques for extracting precious metals and rare earth elements from discarded electronics safely.',
        category: 'E-Waste',
    },
    {
        name: 'The Digital Afterlife',
        description: 'Rebecca Thornton examines the environmental challenges posed by electronic waste and proposes sustainable solutions for the technology industry.',
        category: 'E-Waste',
    },
    {
        name: 'Contaminated Sites',
        description: 'Dr. Ahmed Rahman offers expert guidance on assessing and remediating contaminated land, from initial assessment through to final certification.',
        category: 'Hazardous',
    },
    {
        name: 'The Cleanup Protocol',
        description: 'Jennifer Morrison provides a complete protocol for the safe handling, transport, and disposal of hazardous materials in compliance with standards.',
        category: 'Hazardous',
    },
];

@Injectable()
export class BooksService implements OnModuleInit {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }

    async onModuleInit() {
        await this.seedDatabase();
    }

    private async seedDatabase() {
        const count = await this.booksRepository.count();
        if (count === 0) {
            console.log('📚 Seeding database with waste management books...');
            for (const bookData of SEED_BOOKS) {
                const book = this.booksRepository.create(bookData);
                await this.booksRepository.save(book);
            }
            console.log(`✅ Seeded ${SEED_BOOKS.length} books successfully!`);
        }
    }

    create(createBookInput: CreateBookInput): Promise<Book> {
        const newBook = this.booksRepository.create(createBookInput);
        return this.booksRepository.save(newBook);
    }

    findAll(): Promise<Book[]> {
        return this.booksRepository.find();
    }

    async findOne(id: number): Promise<Book> {
        const book = await this.booksRepository.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book #${id} not found`);
        }
        return book;
    }

    async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
        const book = await this.findOne(id);
        const updatedBook = Object.assign(book, updateBookInput);
        return this.booksRepository.save(updatedBook);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.booksRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
