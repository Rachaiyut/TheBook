interface IResponse<T> {
    success: boolean
    message?: string | unknown;
    data?: T | T[];
    error?: {
        code: number,
        message: string
    }
}

export default IResponse;

