import { readFileSync } from "fs";

const books: Book[] = JSON.parse(
    readFileSync(`${__dirname}/books.json`, 'utf-8')
)

interface Book {
    isbn: string,
    name: string,
    categories: Array<string>,
    description: string,
    authors: Array<string>,
    price: number,
    totalStock: number,
    ratingAverage: number,
    pages: number,
    imageCover: string,
    publicationDate: string,
}

function listCategories(books: Book[]): Record<number, string> {
    const categoryMap: Record<number, string> = {};
    const categoryIdMap: Record<string, number> = {};
    let nextId = 1;

    for (const element of books) {
        for (const item of element.categories) {
            if (!categoryIdMap[item]) {
                categoryIdMap[item] = nextId;
                categoryMap[nextId] = item;
                nextId++;
            }
        }
    }

    return categoryMap;
}

function convertToArray(categories: Record<number, string>): string[] {
    const result: string[] = []

    for (const value of Object.values(categories)) {
        result.push(value)
    }

    return result
}

const book = listCategories(books)
const result = convertToArray(book)
console.log(result)
