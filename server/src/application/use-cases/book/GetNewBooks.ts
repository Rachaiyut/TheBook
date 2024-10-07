// Inversify
import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IBookDTO } from "@application/dtos";

// Interface
import { IQueryParams } from "@domain/interfaces/vendors";

// Service
import { BookService } from "@application/services/api";

@injectable()
class GetNewBooks {

    private _bookService: BookService;

    constructor(
        @inject(TYPES.BookService) bookService: BookService
    ) {
        this._bookService = bookService;
    }

    public async execute(params: IQueryParams): Promise<IBookDTO[]> {
        const books = await this._bookService.getNewBooks(params)

        return books;
    }

}

export default GetNewBooks;