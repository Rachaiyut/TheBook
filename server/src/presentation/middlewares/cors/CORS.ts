import { Application } from "express";

import cors from 'cors';

// Config
import Local from "@shared/Local";

class Cors {

    public mount(_app: Application) {

        const options = {
            origin: ["http://localhost:5173", Local.config().url],
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', "PATCH", 'DELETE']
        };

        _app.use(cors(options));

        return _app;
    }

}

export default new Cors;