import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// Sequelize
import { Op } from '@sequelize/core';

//Model
import { BookModel } from "@infrastructure/models/index";

//Entite
import Book from "@domain/entites/Book";

//Mapper
import { BookMapper } from "@application/mappers/BookMapper";

//Error Handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";
import { IQueryParams } from "@domain/interfaces/vendors";

@injectable()
class BookRepository {


    private _bookModel: typeof BookModel;


    constructor(
        @inject(TYPES.BookModel) bookModel: typeof BookModel
    ) {
        this._bookModel = bookModel;
    }


    public async create(book: Book): Promise<Book> {
        const bookModel = BookMapper.toPersistenceModel(book);

        const newUser = await this._bookModel.create(bookModel.dataValues);

        return BookMapper.toEntityFromModel(newUser)
    }


    public async findBookByISBN(isbn: string): Promise<Book | null> {
        const isBookExist = await this._bookModel.findOne(
            {
                where: { isbn: isbn }
            }
        );

        return isBookExist ? BookMapper.toEntityFromModel(isBookExist) : null;
    }


    public async updateBookByPK(isbn: string, book: Book): Promise<Book> {
        const bookModel = BookMapper.toPersistenceModel(book);

        const [updateRows, [updateBook]] = await this._bookModel.update(bookModel.dataValues, {
            where: { isbn },
            returning: true
        });

        if (updateRows === 0) {
            throw ErrorFactory.createError("NotFound", "Failed to update")
        }

        return BookMapper.toEntityFromModel(updateBook);
    }


    public async getAllBooks(limit: number = 10, offset: number = 0): Promise<Book[]> {
        const books = await this._bookModel.findAll({ limit, offset });

        return books.map((book) => BookMapper.toEntityFromModel(book))
    }

    public async top5Books(queryParams: IQueryParams): Promise<Book[]> {
        const now = new Date();
        const firstDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        const lastDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));


        const top5Books = await this._bookModel.findAll({
            where: {
                [Op.and]: {
                    ratingAverage: {
                        [Op.gte]: queryParams.minRating
                    },
                    publicationDate: {
                        [Op.gte]: `${firstDay}`,
                        [Op.lte]: `${lastDay}`
                    }
                }
            },
            limit: queryParams.limit
        })

        return top5Books.map((book) => BookMapper.toEntityFromModel(book))
    }

}

export default BookRepository;