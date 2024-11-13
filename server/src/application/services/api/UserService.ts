import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

import { v4 as uuidv4 } from 'uuid';

//DTO
import { IRegisterDTO, IUserDTO } from "@application/dtos/index";

//Entites
import { User } from "@domain/entites/index";

//Repository
import { UserRepository } from "@infrastructure/repositories/index";

//Error Handling 
import ErrorFactory from "@domain/exceptions/ErrorFactory";
 
//Mapper
import { UserMapper } from "@application/mappers/UserMapper";


@injectable()
class UserService {


    private readonly _userRepository: UserRepository;


    constructor(
        @inject(TYPES.UserRepository) userRepository: UserRepository,
    ) {
        this._userRepository = userRepository;
    }


    public async createNewUser(registerDTO: IRegisterDTO): Promise<IUserDTO> {
        const googleId = registerDTO.googleId ? registerDTO.googleId : "";

        const newUser = new User(
            uuidv4(),
            googleId,
            registerDTO.name,
            registerDTO.email,
            registerDTO.password,
            undefined,
            registerDTO.roles || ['user'],
        )

        const user = await this._userRepository.create(newUser)

        return UserMapper.toDto(user);
    }


    public async getUser(userId: string): Promise<IUserDTO> {
        const user = await this._userRepository.findUserByPK(userId);

        if (!user) {
            throw ErrorFactory.createError("NotFound", "This user id is not found");
        }

        return UserMapper.toDto(user);
    }


    public async getUserByGoogleId(googleId: string): Promise<IUserDTO | null> {
        const user = await this._userRepository.findUserByGoogleId(googleId)

        if (user) {
            return UserMapper.toDto(user)
        } else {
            return null
        }
    }


    public async getAllUsers(limit: number = 10, offset: number = 0): Promise<IUserDTO[]> {
        const allUsers = await this._userRepository.getAllUsers(limit, offset);

        return allUsers.map((user) =>
            UserMapper.toDto({
                userId: user.userId,
                name: user.name,
                email: user.email,
                roles: user.roles,
                photo: user.photo
            })
        );
    }


    public async updateUser(userId: string, userDTO: IUserDTO): Promise<IUserDTO> {
        const userModel = await this._userRepository.findUserByPK(userId);

        if (!userModel) {
            throw ErrorFactory.createError("NotFound", 'This user id is not found');
        }

        const user = await this._userRepository.updateUserByPK(
            userId,
            UserMapper.toEntity({
                userId: userModel.userId,
                googleId: userModel.googleId,
                name: userDTO.name ?? userModel.name,
                email: userDTO.email ?? userModel.email,
                password: userDTO.password ?? userModel.password,
                roles: userDTO.roles ?? userModel.roles[0]
            }));

        return UserMapper.toDto(user)
    }


    public async updateUserVerify(userId: string) {
        const isUserVerifyUpdated = await this._userRepository.updateUserVerify(userId);

        if (!isUserVerifyUpdated) {
            throw ErrorFactory.createError("Unauthorized", "Please verify your account by checking your email for the verification link.")
        }

        return isUserVerifyUpdated;

    }


    public async deleteUser(userId: string): Promise<number> {
        const userModel = await this._userRepository.findUserByPK(userId);

        if (!userModel) {
            throw ErrorFactory.createError("NotFound", 'This user id is not found');
        }

        return await this._userRepository.deleteUserByPK(userId)
    }
}


export default UserService;