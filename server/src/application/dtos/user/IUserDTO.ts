interface IUserDTO {
    userId: string,
    googleId: string,
    name: string,
    email: string,
    password: string,
    passwordChangeAt?: string,
    roles: Array<"user" | "admin">,
    photo?: string;
}

export default IUserDTO;