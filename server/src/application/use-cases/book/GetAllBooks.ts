import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IBookDTO } from "@application/dtos";

//Service
import { BookService } from "@application/services/api";

@injectable()
class GetAllBooks {

    private _bookService: BookService

    constructor(
        @inject(TYPES.BookService) bookService: BookService
    ) {
        this._bookService = bookService;
    }

    public async execute(): Promise<IBookDTO[]> {
        const books = await this._bookService.getAllBooks();

        return books
    }

}

export default GetAllBooks;