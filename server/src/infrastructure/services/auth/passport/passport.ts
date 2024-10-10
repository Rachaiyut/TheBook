import { UserService } from "@application/services/api/index";
import { TYPES } from "@inversify/types";
import { Application } from "express";
import { inject, injectable } from "inversify";

// Passport
import passport from "passport";
import GoogleStragy from "../strategies/googleStrategy";


@injectable()
class Passport {


    private readonly _userService: UserService
    private readonly _googleStragy: GoogleStragy


    constructor(
        @inject(TYPES.UserService) userService: UserService,
        @inject(TYPES.GoogleStragy) googleStragy: GoogleStragy
    ) {
        this.serializeUser();
        this.deserializeUser();

        this._userService = userService;
        this._googleStragy = googleStragy
    }


    public mountPackage(_app: Application): Application {
        _app = _app.use(passport.initialize());
        _app = _app.use(passport.session());

        this.mountStragies();

        return _app;
    }


    public mountStragies() {
        this._googleStragy.initGoogleStrategy(passport)
    }


    public serializeUser() {
        passport.serializeUser((user, done) => {
            done(null, user);
        });
    }


    public deserializeUser() {
        passport.deserializeUser(async (id, done) => {
            try {
                const user = await this._userService.getUser(id as string)
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        });
    }
}

export default Passport
