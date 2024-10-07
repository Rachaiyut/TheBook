import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

//Entities
import { User } from "@domain/entites/index";

//Model
import { UserModel } from "@infrastructure/models/index";

//Error
import { UserMapper } from "@application/mappers/UserMapper";
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class UserRepository {

    private _userModel: typeof UserModel;

    constructor(
        @inject(TYPES.UserModel) userModel: typeof UserModel
    ) {
        this._userModel = userModel;
    }


    public async create(user: User): Promise<User> {
        const userModel = UserMapper.toPersistenceModel(user);

        const newUser = await this._userModel.create(userModel.dataValues);

        return UserMapper.toEntityFromModel(newUser)
    }

    public async getAllUsers(limit: number, offset: number): Promise<User[]> {
        const allUsers = await UserModel.findAll({ limit, offset });

        return allUsers.map((users) => UserMapper.toEntityFromModel(users));
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const isUserExist = await this._userModel.findOne(
            {
                where: { email }
            }
        );

        return isUserExist ? UserMapper.toEntityFromModel(isUserExist) : null;

    }

    public async findUserByPK(userId: string): Promise<User | null> {
        const user = await this._userModel.findByPk(userId);

        if (user) {
            return UserMapper.toEntityFromModel(user);
        } else {
            return null;
        }

    }

    public async updateUserByPK(userId: string, user: User): Promise<User> {
        const userModel = UserMapper.toPersistenceModel(user);

        const [updateRows, [updateUser]] = await this._userModel.update(userModel.dataValues, {
            where: { userId },
            returning: true
        });

        if (updateRows === 0) {
            throw ErrorFactory.createError("NotFound", "Failed to update")
        }

        return UserMapper.toEntityFromModel(updateUser);
    }

    public async deleteUserByPK(userId: string): Promise<number> {
        const result = await this._userModel.destroy({ where: { userId } });

        return result;
    }

}

export default UserRepository 