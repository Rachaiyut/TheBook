import { randomBytes, createCipheriv, createDecipheriv, createHash } from "crypto";

import CryptoService from "./CryptoService";

class EncryptionService extends CryptoService {

    /**
     * Encrypts the provided data using AES-256-CBC.
     * @param data - The data to encrypt.
     * @param secretKey - The secret key as a Buffer.
     * @returns An object containing the encrypted data and the initialization vector (IV).
     */
    public encrypt(data: string, secretKey: string): { encryptedData: string, iv: string } {
        // Ensure the key length is 32 bytes for AES-256-CBC
        const key = createHash('sha256').update(secretKey).digest(); // Generates a 32-byte key
        const iv = randomBytes(16); // Generate a random initialization vector
        const cipher = createCipheriv(this.algorithm, key, iv);
        
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return { encryptedData: encrypted, iv: iv.toString('hex') };
      }


    /**
     * Decrypts the provided encrypted data using AES-256-CBC.
     * @param encryptedData - The data to decrypt.
     * @param secretKey - The secret key as a Buffer.
     * @param ivHex - The initialization vector as a hex string.
     * @returns The decrypted data as a string.
     */
    public decrypt(encryptedData: string, secretKey: Buffer, ivHex: string): string {
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = createDecipheriv(this.algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}

export default EncryptionService;