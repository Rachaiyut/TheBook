import { injectable, inject } from "inversify";
import { TYPES } from "@inversify/types";

//DTO
import { ILoginDTO, IRegisterDTO, IUserLoginResponseDTO, IUserRegisterResponseDTO } from "@application/dtos/auth/index";

//Mapper
import { UserMapper } from "@application/mappers/UserMapper";

//Error Handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";

//Service
import { JWTService, PasswordService, } from "@application/services/auth/index";
import { UserService } from "@application/services/api/index";


//Repository
import { UserRepository } from "@infrastructure/repositories/index";

//Entity
import { User } from "@domain/entites/index";


@injectable()
class AuthService {


    private _userService: UserService;
    private _passwordService: PasswordService;
    private _jwtService: JWTService;

    private _userRepository: UserRepository;



    constructor(
        @inject(TYPES.UserService) userService: UserService,
        @inject(TYPES.PasswordService) passwordService: PasswordService,
        @inject(TYPES.JWTService) jwtService: JWTService,
        @inject(TYPES.UserRepository) userRepository: UserRepository,
    ) {
        this._userService = userService;
        this._passwordService = passwordService;
        this._jwtService = jwtService;
        this._userRepository = userRepository;

    }


    public async login(loginDTO: ILoginDTO): Promise<IUserLoginResponseDTO> {

        const user: User | null = await this._userRepository.findUserByEmail(loginDTO.email);

        if (!user) {
            throw ErrorFactory.createError("Conflict", "can not this email")
        }

        const passwordCorrect = await this._passwordService.verifyPassword(loginDTO.password, user.password)

        if (!passwordCorrect) {
            throw ErrorFactory.createError("Login", "Password is not correct");
        }

        const token = this._jwtService.sign(user.userId);

        return UserMapper.toUserResponseDTO(UserMapper.toDto(user), token)
    }


    public async register(registerDTO: IRegisterDTO): Promise<IUserRegisterResponseDTO> {

        const isEmailExist = await this._userRepository.findUserByEmail(registerDTO.email);

        if (isEmailExist) {
            throw ErrorFactory.createError("Conflict", "This Email already used")
        }

        const newUser = await this._userService.createNewUser(registerDTO);

        const token = this._jwtService.sign(newUser.userId)

        return UserMapper.toUserResponseDTO(newUser, token)
    }


}

export default AuthService;