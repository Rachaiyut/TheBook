import { injectable, inject } from "inversify";

import { TYPES } from "../inversify/types";

import Express from "@provider/Express";
import Database from "@provider/Database";


@injectable()
class App {

    private readonly _express: Express;

    constructor(@inject(TYPES.Express) express: Express) {
        this._express = express;
    }

    public loadDatabase() {

        Database.init();
    }

    public loadServer() {
        this._express.init();
    }
}

export default App;