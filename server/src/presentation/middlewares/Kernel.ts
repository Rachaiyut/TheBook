import { Application } from "express";

import CORS from "./cors/CORS";
import Http from "./http/HttpMiddleware";
import Statics from "./static/Statics";

// Config
import Local from "@shared/Local";

class Kernel {
    public static init(_app: Application): Application {

        // Check if CORS is enabled
        if (Local.config().isCORSEnabled) {
            _app = CORS.mount(_app)
        }

        // Mount basic express apis middlware
        _app = Http.mount(_app)

        // Mount view engine middleware
        _app = Statics.mount(_app);


        return _app

    }
}

export default Kernel