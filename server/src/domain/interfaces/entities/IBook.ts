import IGenre from "./IGenre";

export interface IBook {
    isbn: string;
    name: string;
    genre: IGenre[];
    description: string,
    authors: string[],
    totalStock: number,
    ratingAverage: number,
    pages: number,
    imageCover: string,
    publicationDate: Date,
    slug: string
}

export default IBook;