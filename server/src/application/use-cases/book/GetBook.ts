import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IBookDTO } from "@application/dtos";

//Service
import { BookService } from "@application/services/api";

@injectable()
class GetBook {

    private _bookService: BookService

    constructor(
        @inject(TYPES.BookService) bookService: BookService
    ) {
        this._bookService = bookService;
    }

    public async execute(isbn: string): Promise<IBookDTO> {
        const books = await this._bookService.getBook(isbn);

        return books
    }

}

export default GetBook;