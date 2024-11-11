import { User } from "@domain/entites/index";
import { IUserDTO } from "@application/dtos/index";
import { UserModel } from "@infrastructure/models/index";
import { UserRole } from "@domain/interfaces/entities";
import { IAuthResponseDTO } from "@application/dtos/auth";

export class UserMapper {
    // Convert Domain Entity to DTO
    public static toDto(user: Partial<User>): IUserDTO {
        return {
            userId: user.userId!,
            googleId: user.googleId!,
            name: user.name!,
            email: user.email!,
            password: user.password!,
            passwordChangeAt: "",
            roles: user.roles!.map((role) => {
                if (role === "user" || role === "admin") {
                    return role;
                }
                throw new Error(`Invalid role: ${role}`);
            }),
            photo: user.photo,
        };
    }

    // Convert DTO to Domain Entitys
    public static toEntity(dto: IUserDTO): User {
        return new User(
            dto.userId,
            dto.googleId,
            dto.name,
            dto.email,
            dto.password,
            undefined,
            dto.roles as UserRole[],
            dto.photo
        );
    }

    // Convert Sequelize Model to Domain Entity
    public static toEntityFromModel(userModel: UserModel): User {

        return new User(
            userModel.dataValues.userId,
            userModel.dataValues.googleId,
            userModel.dataValues.name,
            userModel.dataValues.email,
            userModel.dataValues.password,
            userModel.dataValues.passwordChangeAt,
            userModel.dataValues.roles,
            userModel.dataValues.photo
        );
    }


    // Convert Domain Entity to Sequelize Model for persistence
    public static toPersistenceModel(user: User): UserModel {
        return UserModel.build({
            userId: user.userId,
            googleId: user.googleId,
            name: user.name,
            email: user.email,
            password: user.password,
            passwordChangeAt: user.passwordChangeAt,
            roles: user.roles.map((role) => {
                if (role === "user" || role === "admin") {
                    return role;
                }
                throw new Error(`Invalid role: ${role}`);
            }),
            photo: user.photo,
            verify: false,
            token: []
        });
    }

    // Convert Domain Entity to Specific DTO
    static toUserResponseDTO(user: IUserDTO, accessToken: string, refreshToken: string): IAuthResponseDTO {
        return {
            name: user.name,
            email: user.email,
            roles: user.roles,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }
}
