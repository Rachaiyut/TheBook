import { UserRole } from "@domain/interfaces/entities"

interface IRegisterDTO {
    name: string
    email: string,
    password: string,
    roles: UserRole[]
}

export default IRegisterDTO;