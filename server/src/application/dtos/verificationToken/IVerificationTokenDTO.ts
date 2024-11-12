interface IVerificationTokenDTO {
    tokenI?: string,
    userId: string,
    token: string,
    encrypted: string,
    iv: string
}

export default IVerificationTokenDTO; 