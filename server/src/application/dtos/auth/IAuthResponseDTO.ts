interface IAuthResponseDTO {
    name: string;
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken: string
}

export default IAuthResponseDTO
