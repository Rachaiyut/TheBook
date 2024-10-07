import IRepository from "./IRepository"

interface IBookRepository<T> extends IRepository<T> {
    create(data: Omit<T, 'bookId'>): Promise<T>; 
}

export default IBookRepository;