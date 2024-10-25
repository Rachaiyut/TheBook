// Express
import { Request, Response } from "express";

//Inversify
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpGet, httpPatch, httpPost } from "inversify-express-utils";

//Use-Cases
import {
    CreateBook,
    GetAllBooks,
    GetBook,
    UpdateBook,
    GetTop5Books,
    GetNewBooks
} from "@application/use-cases/book/index";

// Interface
import { IBookDTO } from "@application/dtos/index";
import { IQueryParams } from "@domain/interfaces/vendors";

// Middleware
import { MulterMiddleware } from "@presentation/middlewares/index";


const upload = MulterMiddleware;

@controller("/books")
class BookController {

    private readonly _createBook: CreateBook;
    private readonly _getAllBooks: GetAllBooks;
    private readonly _updateBook: UpdateBook;
    private readonly _getBook: GetBook;
    private readonly _getTop5Books: GetTop5Books
    private readonly _getNewBooks: GetNewBooks;

    constructor(
        @inject(TYPES.CreateBook) createBook: CreateBook,
        @inject(TYPES.GetAllBooks) getAllBooks: GetAllBooks,
        @inject(TYPES.UpdateBook) updateBook: UpdateBook,
        @inject(TYPES.GetBook) getBook: GetBook,
        @inject(TYPES.GetTop5Books) getTop5Books: GetTop5Books,
        @inject(TYPES.GetNewBooks) getNewBooks: GetNewBooks
    ) {
        this._createBook = createBook;
        this._getAllBooks = getAllBooks;
        this._updateBook = updateBook;
        this._getBook = getBook;
        this._getTop5Books = getTop5Books;
        this._getNewBooks = getNewBooks;
    }

    @httpPost(
        '/',
        upload.single("imageCover")
    )
    public async create(req: Request<unknown, IBookDTO>, res: Response) {
        const imageCover = req.file!;
        const body = {
            isbn: req.body.isbn,
            name: req.body.name,
            genre: req.body.genre,
            description: req.body.description,
            authors: req.body.authors,
            totalStock: req.body.totalStock,
            ratingAverage: req.body.ratingAverage,
            pages: req.body.pages,
            imageCover: `${imageCover.path}`,
            publicationDate: req.body.publicationDate
        } as IBookDTO


        const book = await this._createBook.execute(body);

        res.status(201).json({
            success: true,
            code: 201,
            data: book,
            errors: [],
            meta: {}
        })
    }


    @httpGet(
        '/:isbn'
    )
    public async getBook(req: Request<{ isbn: string }>, res: Response) {
        const isbn = req.params.isbn;

        const books = await this._getBook.execute(isbn);

        res.status(200).json({
            success: true,
            code: 200,
            data: books,
            errors: [],
            meta: {}
        })
    }


    @httpGet(
        '/'
    )
    public async getAllBooks(req: Request<unknown, unknown, unknown, IQueryParams>, res: Response) {
        const params = req.query;

        const books = await this._getAllBooks.execute(params);

        res.status(200).json({
            success: true,
            code: 200,
            data: books,
            errors: [],
            meta: {
                total: books.length
            }
        })
    }


    @httpPatch('/:isbn')
    public async updateBook(req: Request<{ isbn: string }>, res: Response) {
        const isbn = req.params.isbn;
        const body = req.body;

        const book = await this._updateBook.execute(isbn, body)

        res.status(200).json({
            success: true,
            code: 200,
            message: "Updated seccessfully",
            data: book,
            errors: [],
            meta: {}
        })

    }

    @httpGet('/top5/month')
    public async getTop5BooksThisMonth(req: Request<unknown, unknown, unknown, IQueryParams>, res: Response) {
        const param = req.query;

        const top5Books = await this._getTop5Books.execute(param);

        res.status(200).json({
            success: true,
            code: 200,
            data: top5Books,
            errors: [],
            meta: {
                total: top5Books.length
            }
        })
    }

    @httpGet('/new/month')
    public async getNewBooksThisMonth(req: Request<unknown, unknown, unknown, IQueryParams>, res: Response) {
        const param = req.query;

        const newBooks = await this._getNewBooks.execute(param);

        res.status(200).json({
            success: true,
            code: 200,
            data: newBooks,
            errors: [],
            meta: {
                total: newBooks.length
            }
        })


    }

}

export default BookController;