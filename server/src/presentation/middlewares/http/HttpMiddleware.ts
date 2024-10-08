import express, { Application } from "express";

// Config
import Local from "@shared/Local";

class Http {

    public static mount(_app: Application): Application {

        // Enables the request bodt parser
        _app.use(express.json({
            limit: Local.config().maxUploadLimit
        }));

        _app.use(express.urlencoded({
            limit: Local.config().maxUploadLimit,
            parameterLimit: Local.config().maxParameterLimit,
            extended: false
        }))

        // Disable the x-powered-by header in response
        _app.disable('x-powered-by');

        return _app;
    }

}


export default Http;