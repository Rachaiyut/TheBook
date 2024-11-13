import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IAuthResponseDTO, ILoginDTO, IRegisterDTO, IVerifyDTO } from "@application/dtos/auth/index";

// Entity
import { User } from "@domain/entites/index";

// Mapper
import { UserMapper } from "@application/mappers/UserMapper";

// Service
import { JWTService, PasswordService, } from "@application/services/auth/index";
import { UserService, VerificationTokenService } from "@application/services/api/index";

// Internal Service
import { EncryptionService } from "@infrastructure/services/crypto";

// Repository
import { UserRepository } from "@infrastructure/repositories/index";

// Error Handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";

// Factory
import EmailFactory from "@infrastructure/services/notification/email/factories/EmailFactory";

// Config
import Local from "@shared/Local";




@injectable()
class AuthService {


    private readonly _userService: UserService;
    private readonly _verificationTokenService: VerificationTokenService
    private readonly _passwordService: PasswordService;
    private readonly _jwtService: JWTService;
    private readonly _userRepository: UserRepository;

    private readonly _emailFactory: EmailFactory;
    private readonly _encryptionService: EncryptionService;


    constructor(
        @inject(TYPES.UserService) userService: UserService,
        @inject(TYPES.VerificationTokenService) verificationTokenService: VerificationTokenService,
        @inject(TYPES.PasswordService) passwordService: PasswordService,
        @inject(TYPES.JWTService) jwtService: JWTService,
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.EmailFactory) emailFactory: EmailFactory,
        @inject(TYPES.EncryptionService) encryptionService: EncryptionService,
    ) {
        this._userService = userService;
        this._passwordService = passwordService;
        this._verificationTokenService = verificationTokenService;
        this._jwtService = jwtService;
        this._userRepository = userRepository;

        this._emailFactory = emailFactory;
        this._encryptionService = encryptionService;
    }


    public async login(loginDTO: ILoginDTO): Promise<IAuthResponseDTO> {

        const userEntity = await this._userRepository.findUserByEmail(loginDTO.email);

        const userVerify = await this.findAndVerifyUser(userEntity.googleId, userEntity.userId);

        // Cheach Pasword
        await this._passwordService.verifyPassword(loginDTO.password, userVerify.password);

        const accessToken = this._jwtService.generateAccessToken(userVerify.userId);
        const refreshToken = this._jwtService.genrerefreshToken(userVerify.userId);

        return UserMapper.toUserResponseDTO(UserMapper.toDto(userVerify), accessToken, refreshToken)
    }


    public async register(registerDTO: IRegisterDTO): Promise<IAuthResponseDTO> {

        // Check already have email in database?
        await this._userRepository.chcekUserEmail(registerDTO.email)

        // Create new User
        const newUser = await this._userService.createNewUser(registerDTO);

        // Create new Verify
        const { encryptedData, token } = await this.creatNewUserVerifyToken(newUser.userId);

        // Send Verify to user email
        const registerConfirmation = this._emailFactory.createEmailStrategy("register");
        await registerConfirmation.sendEmail(registerDTO.email, encryptedData, token)

        // Generate tokens
        const accessToken = this._jwtService.generateAccessToken(newUser.userId);
        const refreshToken = this._jwtService.genrerefreshToken(newUser.userId);

        return UserMapper.toUserResponseDTO(newUser, accessToken, refreshToken)
    }


    public async refreshToken(refreshToken: string) {

        if (!refreshToken) {
            throw ErrorFactory.createError("Login", "You are not logged in!");
        }

        const decoded = await this._jwtService.verifyRefreshToken(refreshToken);

        if (!decoded) {
            throw ErrorFactory.createError("Token", "Your session is expired or invalid");
        }

        const user = await this._userService.getUser(decoded.data);

        // Generate tokens
        const newAccessToken = this._jwtService.generateAccessToken(user.userId);
        const newRefreshToken = this._jwtService.genrerefreshToken(user.userId);

        return UserMapper.toUserResponseDTO(user, newAccessToken, newRefreshToken);
    }


    public async findAndVerifyUser(googleId?: string, userId?: string): Promise<User> {
        if (!googleId && !userId) {
            throw new Error('Either googleId or userId must be provided');
        }

        const whereCondition = googleId ? { googleId } : { userId };

        const user = await this._userRepository.findAndVerifyUser(whereCondition);

        return user;
    }


    // Hit wih route verify
    public async userVerify(verifyDTO: IVerifyDTO): Promise<boolean> {
        const { encrypted, token } = verifyDTO;

        // Get data Form database for verify
        const { iv } = await this._verificationTokenService.getVerificationToken(encrypted, token);

        const decrypted = await this._encryptionService.decrypt(encrypted, Local.config().userVerifyCode, iv);

        // Update verify in user table
        const isUserVerifyUpdated = await this._userService.updateUserVerify(decrypted);

        return isUserVerifyUpdated;
    }


    public async creatNewUserVerifyToken(userId: string) {

        // Encrypt data
        const { encryptedData, iv, token } = await this._encryptionService.encrypt(
            userId,
            Local.config().userVerifyCode,
        );

        // Create reference encrypt with user
        await this._verificationTokenService.createNewVerificationToken({
            userId,
            token,
            encrypted: encryptedData,
            iv
        })

        return {
            encryptedData,
            token
        };

    }

}

export default AuthService;  