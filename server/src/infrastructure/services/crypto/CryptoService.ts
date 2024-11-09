import { injectable } from "inversify";

@injectable()
abstract class CryptoService {
    protected algorithm: string = 'aes-256-cbc';
}

export default CryptoService