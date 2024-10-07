import { IBook } from "../entities/index";

interface IBookService {
    getBook(id: string): Promise<IBook | null>
}

export default IBookService;