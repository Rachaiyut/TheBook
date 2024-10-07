export enum UserRole {
    User = 'user',
    Admin = 'admin',
}

export interface IUser {
    userId?: string,
    name: string,
    email: string,
    password?: string,
    passwordChangeAt?: Date,
    roles: Array<"user" | "admin">,
    photo?: string
}

