import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IBookDTO } from "@application/dtos";

// Service
import { BookService } from "@application/services/api/index";

@injectable()
class CreateBook {

    
    private _bookService: BookService; 


    constructor(
        @inject(TYPES.BookService) bookService: BookService
    ) {
        this._bookService = bookService;
    }


    public async execute(bookDTO: IBookDTO): Promise<IBookDTO> {
        const book = await this._bookService.creatNewBook(bookDTO);

        return book;
    }

}

export default CreateBook;