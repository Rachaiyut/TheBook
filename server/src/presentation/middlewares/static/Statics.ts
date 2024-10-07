import * as path from 'path';
import express, { Application } from 'express';


class Statics {
    public static mount(_app: Application): Application {

        // Loads Options
        const options = { maxAge: 31557600000 };

        // Load Statics
        _app.use('/public', express.static(path.join(__dirname, '../../../../public/images/books'), options))

        return _app;
    }
}

export default Statics;