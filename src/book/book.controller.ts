import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { mystorege } from './mystorege';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: mystorege,
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (['.png', 'jpg', '.gif'].includes(ext)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only images are allowed'), false);
        }
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    return file.path;
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get('list')
  findAll() {
    return this.bookService.findAll();
  }

  @Get('getBook')
  findOne(@Query('name') name: string) {
    return this.bookService.findOne(name);
  }

  @Get('getBookById')
  findById(@Query('id') name: number) {
    return this.bookService.findById(+name);
  }

  @Post('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
