import { createHash } from "crypto";

import CryptoService from "./CryptoService";

class HashService extends CryptoService {


    /**
     * Hashes the provided data using the specified algorithm.
     * @param data - The data to hash.
     * @param algorithm - The hashing algorithm (default: 'sha256').
     * @returns The hashed value in hex format.
     */
    public hash(data: string, algorithm: string = 'sha256'): string {
        return createHash(algorithm).update(data).digest('hex');
    }

    
}