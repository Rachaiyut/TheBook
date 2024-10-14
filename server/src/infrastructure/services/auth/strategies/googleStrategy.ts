import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Passport
import { PassportStatic } from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Config
import Local from "@shared/Local";

// Service
import { AuthService } from "@application/services/auth";
import { UserService } from "@application/services/api";

// Entity
import { UserRole } from "@domain/interfaces/entities";

@injectable()
class GoogleStragy {


    private readonly _userService: UserService;
    private readonly _authService: AuthService;


    constructor(
        @inject(TYPES.AuthService) authService: AuthService,
        @inject(TYPES.UserService) userService: UserService
    ) {
        this._authService = authService;
        this._userService = userService;
    }


    private getGoogleConfig() {
        const googleId = Local.config().googleId;
        const googleSecret = Local.config().googleSecret;
        const googleCallback = Local.config().googleCallback;

        return { googleId, googleSecret, googleCallback }
    }


    public initGoogleStrategy(_passport: PassportStatic) {
        const { googleId, googleSecret, googleCallback } = this.getGoogleConfig();

        _passport.use(new GoogleStrategy({
            clientID: googleId,
            clientSecret: googleSecret,
            callbackURL: googleCallback
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await this._userService.getUserByGoogleId(profile.id);
                let newUser

                console.log(profile)

                // This will invoke if user is not exist
                if (!user) {
                    newUser = await this._authService.register({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile._json.email!,
                        password: "",
                        roles: [UserRole.User]
                    })

                    done(null, newUser)
                } else {
                    const existUser = await this._authService.login({
                        email: user.email,
                        password: ""
                    })

                    done(null, existUser)
                }

            } catch (error) {
                console.log(error)
                return done(error, false);
            }
        }));
    }

}

export default GoogleStragy
