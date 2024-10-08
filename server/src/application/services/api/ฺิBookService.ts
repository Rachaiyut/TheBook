import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// Interface
import { IQueryParams } from "@domain/interfaces/vendors";

//Entitie
import { Book } from "@domain/entites";

//Repository
import BookRepository from "@infrastructure/repositories/BookRepository";

//DTO
import { IBookDTO } from "@application/dtos";

//Error
import ErrorFactory from "@domain/exceptions/ErrorFactory";

//Mapper
import { BookMapper } from "@application/mappers/BookMapper";

@injectable()
class BookService {


    private _bookRepository: BookRepository


    constructor(
        @inject(TYPES.BookRepository) booRepository: BookRepository
    ) {
        this._bookRepository = booRepository;
    }


    public async creatNewBook(book: IBookDTO): Promise<IBookDTO> {
        const isExistBook = await this.getBook(book.isbn);

        if (isExistBook) {
            throw ErrorFactory.createError("Conflict", "This Book is exist")
        }

        const newBook = new Book(
            book.isbn,
            book.name,
            book.categories,
            book.description,
            book.authors,
            book.price,
            book.totalStock,
            book.ratingAverage,
            book.pages,
            book.imageCover,
            new Date(book.publicationDate),
            book.slug
        );


        const result = await this._bookRepository.create(newBook);

        return BookMapper.toDto(result)
    }


    public async getBook(isbn: string) {
        const book = await this._bookRepository.findBookByISBN(isbn);

        if (!book) {
            ErrorFactory.createError("NotFound", 'This isbn is not found')
        }


        return BookMapper.toDto(book!);
    }


    public async getAllBooks(params: IQueryParams): Promise<IBookDTO[]> {
        const books = await this._bookRepository.getAllBooks(params);

        return books.map((book) => BookMapper.toDto(book));
    }


    public async updateBook(isbn: string, bookDTO: IBookDTO): Promise<IBookDTO> {

        const isExistBook = await this.getBook(isbn);

        if (!isExistBook) {
            throw ErrorFactory.createError("NotFound", 'This isbn is not found');
        }

        const book = await this._bookRepository.updateBookByPK(
            isbn,
            BookMapper.toEntity({
                isbn: isExistBook.isbn,
                name: bookDTO.name ?? isExistBook.name,
                categories: bookDTO.categories ?? isExistBook.categories,
                description: bookDTO.description ?? isExistBook.description,
                authors: bookDTO.authors ?? isExistBook.authors,
                price: bookDTO.price ?? isExistBook.price,
                totalStock: bookDTO.totalStock ?? isExistBook.totalStock,
                ratingAverage: bookDTO.ratingAverage ?? isExistBook.ratingAverage,
                pages: bookDTO.pages ?? isExistBook.pages,
                imageCover: bookDTO.imageCover ?? isExistBook.imageCover,
                publicationDate: bookDTO.publicationDate ?? isExistBook.publicationDate,
            })
        )

        return BookMapper.toDto(book)
    }

    public async getTop5Book(params: IQueryParams): Promise<IBookDTO[]> {
        const top5Books = await this._bookRepository.top5Books(params);

        return top5Books.map((book) => BookMapper.toDto(book));
    }

    public async getNewBooks(params: IQueryParams) {
        const newBooks = await this._bookRepository.newBooks(params);

        return newBooks.map((book) => BookMapper.toDto(book));
    }

}

export default BookService;