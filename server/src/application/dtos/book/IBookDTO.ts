interface IBookDTO {
    isbn: string;
    name: string;
    categories: string[];
    description: string,
    authors: string[],
    price: number,
    totalStock: number,
    ratingAverage: number,
    pages: number,
    imageCover: string,
    publicationDate: Date,
    slug: string
}

export default IBookDTO;