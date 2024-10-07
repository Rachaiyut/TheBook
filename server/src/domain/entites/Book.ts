//Interface
import { IBook } from "@domain/interfaces/entities";

class Book implements IBook {
    isbn: string;
    name: string;
    categories: string[];
    description: string;
    authors: string[];
    price: number;
    totalStock: number;
    ratingAverage: number;
    pages: number;
    imageCover: string;
    publicationDate: Date;
    slug: string;

    constructor(
        isbn: string,
        name: string,
        categories: string[],
        description: string,
        authors: string[],
        price: number,
        totalStock: number,
        ratingAverage: number,
        pages: number,
        imageCover: string,
        publicationDate: Date,
        slug: string
    ) {
        this.isbn = isbn;
        this.name = name;
        this.categories = categories;
        this.description = description;
        this.authors = authors;
        this.price = price;
        this.totalStock = totalStock;
        this.ratingAverage = ratingAverage;
        this.pages = pages;
        this.imageCover = imageCover;
        this.publicationDate = publicationDate;
        this.slug = slug;
    }

}

export default Book;