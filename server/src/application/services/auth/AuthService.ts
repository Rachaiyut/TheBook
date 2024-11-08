import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IAuthResponseDTO, ILoginDTO, IRegisterDTO } from "@application/dtos/auth/index";

// Mapper
import { UserMapper } from "@application/mappers/UserMapper";

// Error Handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";

// Service
import { JWTService, PasswordService, } from "@application/services/auth/index";
import { UserService } from "@application/services/api/index";

// Outer Service
import EmailService from "@application/services/api/EmailService";

// Repository
import { UserRepository } from "@infrastructure/repositories/index";

// Entity
import { User } from "@domain/entites/index";

// Factory
import EmailFactory from "@infrastructure/services/notification/email/factories/EmailFactory";



@injectable()
class AuthService {


    private readonly _userService: UserService;
    private readonly _passwordService: PasswordService;
    private readonly _jwtService: JWTService;
    private readonly _userRepository: UserRepository;

    private readonly _emailFactory: EmailFactory;


    constructor(
        @inject(TYPES.UserService) userService: UserService,
        @inject(TYPES.PasswordService) passwordService: PasswordService,
        @inject(TYPES.JWTService) jwtService: JWTService,
        @inject(TYPES.UserRepository) userRepository: UserRepository,
        @inject(TYPES.EmailFactory) emailFactory: EmailFactory
    ) {
        this._userService = userService;
        this._passwordService = passwordService;
        this._jwtService = jwtService;
        this._userRepository = userRepository;

        this._emailFactory = emailFactory;
    }


    public async login(loginDTO: ILoginDTO): Promise<IAuthResponseDTO> {

        const user: User | null = await this._userRepository.findUserByEmail(loginDTO.email);

        if (!user) {
            throw ErrorFactory.createError("Conflict", "can not this email")
        }

        const passwordCorrect = await this._passwordService.verifyPassword(loginDTO.password, user.password)

        if (!passwordCorrect) {
            throw ErrorFactory.createError("Login", "Password is not correct");
        }


        const loginConfirmation = this._emailFactory.createEmailStrategy("login");
        await loginConfirmation.sendEmail("charut55@gmail.com", user.userId)

        const accessToken = this._jwtService.generateAccessToken(user.userId);
        const refreshToken = this._jwtService.genrerefreshToken(user.userId);

        return UserMapper.toUserResponseDTO(UserMapper.toDto(user), accessToken, refreshToken)
    }


    public async register(registerDTO: IRegisterDTO): Promise<IAuthResponseDTO> {

        const isEmailExist = await this._userRepository.findUserByEmail(registerDTO.email);

        if (isEmailExist) {
            throw ErrorFactory.createError("Conflict", "This Email already used")
        }

        const newUser = await this._userService.createNewUser(registerDTO);

        const accessToken = this._jwtService.generateAccessToken(newUser.userId)
        const refreshToken = this._jwtService.genrerefreshToken(newUser.userId);

        return UserMapper.toUserResponseDTO(newUser, accessToken, refreshToken)
    }


    public async refreshToken(refreshToken: string) {

        if (!refreshToken) {
            throw ErrorFactory.createError("Login", "You are not logged in!")
        }

        const decoded = await this._jwtService.verifyRefreshToken(refreshToken);

        if (!decoded) {
            throw ErrorFactory.createError("Token", "Your session is expired or invalid");
        }

        const user = await this._userService.getUser(decoded.data)


        const newAccessToken = this._jwtService.generateAccessToken(user.userId);
        const newRefreshToken = this._jwtService.genrerefreshToken(user.userId);

        return UserMapper.toUserResponseDTO(user, newAccessToken, newRefreshToken)
    }

}

export default AuthService;