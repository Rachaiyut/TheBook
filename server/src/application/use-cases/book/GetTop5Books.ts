import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IBookDTO } from "@application/dtos";

//Service
import { BookService } from "@application/services/api";
import { IQueryParams } from "@domain/interfaces/vendors";

@injectable()
class GetTop5Books {

    private _bookService: BookService

    constructor(
        @inject(TYPES.BookService) bookService: BookService
    ) {
        this._bookService = bookService;
    }

    public async execute(params: IQueryParams): Promise<IBookDTO[]> {
        const books = await this._bookService.getTop5Book(params)

        return books;
    }

}

export default GetTop5Books;