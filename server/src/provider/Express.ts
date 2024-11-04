import express, { Request, Response, NextFunction } from "express";

// Config
import Local from "@shared/Local";

// Kernel
import Bootstrap from '@presentation/middlewares/Kernel'

//Inversify Config
import { injectable } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import DIContainer from "../inversify/inversify.config";

//Handling Error
import BaseError from "@domain/exceptions/BaseError";

//Controllers
import "@presentation/controllers/auth/index"
import "@presentation/controllers/api/index"

@injectable()
class Express {


    public server: InversifyExpressServer

    constructor() {
        const router = express.Router({
            caseSensitive: false,
            mergeParams: false,
            strict: false
        });

        this.server = new InversifyExpressServer(DIContainer.getContainer(), router, { rootPath: "/api/v1" });


        this.mountMiddlewares();
        this.errorHandling();

    }


    private mountMiddlewares() {
        this.server.setConfig((app) => {

            Bootstrap.init(app)

        })
    }


    public init() {
        const port = Local.config().port
        const express = this.server.build()

        express.listen(port, () => {
            return console.log("Server :: Running @ 'http://localhost:8000'")
        }).on('error', (_error) => {
            return console.log('Error', _error)
        })
    }


    private errorHandling() {
        this.server.setErrorConfig((app) => {

            app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
                console.log(err)
                res.status(err.statusCode | 404).json({
                    success: false,
                    message: err.message, // Human Readble
                    data: null,
                    errors: [
                        {
                            "code": err.statusCode,
                            "message": err.message
                        }
                    ]
                });
            });

        });
    }
}

export default Express;