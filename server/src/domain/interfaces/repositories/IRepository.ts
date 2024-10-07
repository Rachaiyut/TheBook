
interface IRepository<T> {
    findOne(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    deleteByPK(id: string): Promise<boolean>
}

export default IRepository;