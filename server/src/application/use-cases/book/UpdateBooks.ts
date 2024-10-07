import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IBookDTO } from "@application/dtos";

// Service
import { BookService } from "@application/services/api";


@injectable()
class UpdateBook {

    private _bookService: BookService;

    constructor(
        @inject(TYPES.BookService) bookService: BookService
    ) {
        this._bookService = bookService;
    }

    public async execute(isbn: string, bookDTO: IBookDTO): Promise<IBookDTO> {
        const book = await this._bookService.updateBook(isbn, bookDTO);

        return book;
    }

}

export default UpdateBook;