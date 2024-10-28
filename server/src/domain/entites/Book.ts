//Interface
import { IBook } from "@domain/interfaces/entities";
import Genre from "./Genre";
import OrderItems from "./OrderItems";

class Book implements IBook {
    isbn: string;
    name: string;
    genre: Genre[];
    description: string;
    authors: string[];
    price: number;
    totalStock: number;
    ratingAverage: number;
    pages: number;
    imageCover: string;
    publicationDate: Date;
    slug: string;
    private _orderItem?: OrderItems

    constructor(
        isbn: string,
        name: string,
        genre: Genre[],
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
        this.genre = genre;
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

    public setOrderItem(orderItem: OrderItems) {
        this._orderItem = orderItem;
    }


    public getOrderItem() {
        return this._orderItem;
    }

}

export default Book;