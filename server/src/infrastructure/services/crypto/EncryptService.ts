import { randomBytes, createCipheriv, createDecipheriv, createHash } from "crypto";

import CryptoService from "./CryptoService";

class EncryptionService extends CryptoService {


    private async deriveKey(secretKey: string): Promise<Buffer> {
        return createHash('sha256').update(secretKey).digest();
    }

    public async encrypt(data: string, secretKey: string): Promise<{ encryptedData: string, iv: string, token: string }> {
        const key = await this.deriveKey(secretKey);
        const iv = randomBytes(16);
        const cipher = createCipheriv(this.algorithm, key, iv);

        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const token = randomBytes(16).toString('hex');

        return { encryptedData: encrypted, iv: iv.toString('hex'), token };
    }

    public async decrypt(encryptedData: string, secretKey: string, ivHex: string): Promise<string> {
        const key = await this.deriveKey(secretKey);
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = createDecipheriv(this.algorithm, key, iv);

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }


}

export default EncryptionService;