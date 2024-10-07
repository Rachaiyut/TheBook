import IRepository from "./IRepository"

interface IUserRepository<T> extends IRepository<T> {
    create(data: Omit<T, 'userId'>): Promise<T>; 
}

export default IUserRepository;