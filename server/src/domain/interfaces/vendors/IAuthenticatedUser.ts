interface IAuthenticatedUser {
    userId: string;
    name: string;
    email: string;
    roles: string[];
    photo: string | null;
}


export default IAuthenticatedUser;