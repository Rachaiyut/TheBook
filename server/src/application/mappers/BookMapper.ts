import { Book } from "@domain/entites/index";
import { IBookDTO } from "@application/dtos";
import { BookModel } from "@infrastructure/models";

export class BookMapper {
    public static toDto(book: Partial<Book>): IBookDTO {
        return {
            isbn: book.isbn!,
            name: book.name!,
            categories: book.categories || [],
            description: book.description || '',
            authors: book.authors || [],
            price: book.price || 0,
            totalStock: book.totalStock || 0,
            ratingAverage: book.ratingAverage || 0,
            pages: book.pages || 0,
            // eslint-disable-next-line no-constant-binary-expression
            imageCover: `http://127.0.0.1:8000/public/${book.imageCover}` || '',
            publicationDate: book.publicationDate!,
            slug: book.slug || ''
        };
    }


    // Convert DTO to Domain Entitys
    public static toEntity(dto: Partial<IBookDTO>): Book {
        return new Book(
            dto.isbn!,
            dto.name!,
            dto.categories!,
            dto.description!,
            dto.authors!,
            dto.price!,
            dto.totalStock!,
            dto.ratingAverage!,
            dto.pages!,
            dto.imageCover!,
            new Date(dto.publicationDate!),
            dto.slug!
        );
    }


    // Convert Sequelize Model to Domain Entity
    public static toEntityFromModel(bookModel: BookModel): Book {

        return new Book(
            bookModel.dataValues.isbn,
            bookModel.dataValues.name,
            bookModel.dataValues.categories,
            bookModel.dataValues.description,
            bookModel.dataValues.authors,
            bookModel.dataValues.price,
            bookModel.dataValues.totalStock,
            bookModel.dataValues.ratingAverage,
            bookModel.dataValues.pages,
            bookModel.dataValues.imageCover,
            new Date(bookModel.dataValues.publicationDate),
            bookModel.dataValues.slug
        );

    }


    // Convert Domain Entity to Sequelize Model for persistence
    public static toPersistenceModel(book: Book): Omit<BookModel, "genre"> {
        return BookModel.build({
            isbn: book.isbn,
            name: book.name,
            categories: book.categories,
            genre: [],
            description: book.description,
            authors: book.authors,
            price: book.price,
            totalStock: book.totalStock,
            ratingAverage: book.ratingAverage,
            pages: book.pages,
            imageCover: book.imageCover,
            publicationDate: book.publicationDate,
            slug: book.slug
        });
    }
}
