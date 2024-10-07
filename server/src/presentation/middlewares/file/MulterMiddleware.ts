// src/config/multer.config.ts
import fs from 'fs';
import path from 'path';

import { Request, RequestHandler } from 'express';
import multer, { FileFilterCallback, StorageEngine } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

class MulterMiddleware {
    private upload: multer.Multer;

    constructor() {
        this.upload = this.init();
    }

    public init() {
        return multer({
            storage: this.createStorage(),
            fileFilter: this.fileFilter.bind(this),
        });
    }

    private createStorage(): StorageEngine {
        return multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
                const uploadPath = path.join(__dirname, '../../../../public/images/books');
                this.createDirectoryIfNotExists(uploadPath);
                console.log('Upload path:', uploadPath);
                cb(null, uploadPath);
            },
            filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
                cb(null, Date.now() + path.extname(file.originalname));
            },
        });
    }

    private fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    private createDirectoryIfNotExists(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    public single(field: string): RequestHandler {
        return this.upload.single(field);
    }

    public fields(obj: Array<{ name: string, maxCount: number }>) {
        if (!this.upload) {
            throw new Error('Multer instance is not initialized');
        }
        return this.upload.fields(obj);
    }

}

export default new MulterMiddleware();