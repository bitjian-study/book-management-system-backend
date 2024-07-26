import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject(DbService)
  private dbService: DbService;
  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = new Book();
    book.id = randomNum();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;
    books.push(book);
    await this.dbService.write(books);
    return book;
  }

  async findAll() {
    const books: Book[] = (await this.dbService.read()) || [];
    return books;
  }

  async findOne(name: string) {
    const books: Book[] = await this.dbService.read();
    if (!name) return books;
    const book = books.find((book) => book.name === name);
    if (!book) return [];
    return [book];
  }
  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    if (!id) {
      throw new BadRequestException('not find book');
    }
    const book = books.find((book) => book.id === id);
    if (!book) {
      throw new BadRequestException('not find book');
    }
    return book;
  }
  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((book) => book.id === updateBookDto.id);
    if (!book) {
      throw new BadRequestException('not find book');
    }
    book.name = updateBookDto.name;
    book.author = updateBookDto.author;
    book.description = updateBookDto.description;
    book.cover = updateBookDto.cover;
    await this.dbService.write(books);
    return 'update ok';
  }

  async remove(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.splice(index, 1);
      this.dbService.write(books);
      return 'delete ok';
    }
    return `not find ${id} book`;
  }
}
