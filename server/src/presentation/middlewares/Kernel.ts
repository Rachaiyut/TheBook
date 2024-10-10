import 'reflect-metadata';
import DIContainer from '@inversify/inversify.config';
import { injectable } from 'inversify';

import { Application } from "express";

import session from 'express-session';
import CORS from "./cors/CORS";
import Http from "./http/HttpMiddleware";
import Statics from "./static/Statics";

// Config
import Local from "@shared/Local";
import Passport from '@infrastructure/services/auth/passport/passport';
import { TYPES } from '@inversify/types';

@injectable()
class Kernel {
    public static init(_app: Application): Application {
        const PassportConfig = DIContainer.getContainer().get<Passport>(TYPES.Passport);


        // Check if CORS is enabled
        if (Local.config().isCORSEnabled) {
            _app = CORS.mount(_app)
        }


        // Mount basic express apis middlware
        _app = Http.mount(_app)


        // Mount view engine middleware
        _app = Statics.mount(_app);

        _app = _app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'sesion secret',
        }))

        // Mount Passport
        _app = PassportConfig.mountPackage(_app)

        return _app

    }
}

export default Kernel