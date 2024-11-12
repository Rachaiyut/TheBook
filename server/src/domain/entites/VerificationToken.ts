class VerificationToken {
    
    private _tokenId?: number;
    private _userId?: string;

    public token: string;
    public encrypted: string;
    public iv: string;

    private constructor(token: string, encrypted: string, iv: string) {
        this.token = token;
        this.encrypted = encrypted;
        this.iv = iv;
    }

    public static create(token: string, encrypted: string, iv: string): VerificationToken {
        return new VerificationToken(token, encrypted, iv);
    }

    public setTokenId(tokenId: number) {
        this._tokenId = tokenId;
    }

    public getTokenId() {
        return this._tokenId;
    }

    public setUserId(userId: string) {
        this._userId = userId;
    }

    public getUserId(){
        return this._userId;
    }
}

export default VerificationToken;
