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


    private readonly _userModel: typeof UserModel;


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


    public async findUserByEmail(email: string): Promise<User> {
        const user = await this._userModel.findOne(
            {
                where: { email }
            }
        );

        if (!user) {
            throw ErrorFactory.createError("NotFound", "This Email is not Found")
        }

        return UserMapper.toEntityFromModel(user)

    }

    public async findAndVerifyUser(criteria: { googleId?: string; userId?: string }): Promise<User> {
        const userModel = await this._userModel.findOne({
            where: criteria,
        });

        if (!userModel) {
            throw ErrorFactory.createError("NotFound", "User are not logged in")
        }

        if (userModel.dataValues.verify === false) {
            throw ErrorFactory.createError("Unauthorized", "User are not verify")
        }

        return UserMapper.toEntityFromModel(userModel)
    }


    public async chcekUserEmail(email: string): Promise<User | null> {
        const isUserExist = await this._userModel.findOne(
            {
                where: { email }
            }
        )

        if (isUserExist) {
            throw ErrorFactory.createError("NotFound", "This Email is already used")
        }

        return null
    }


    public async findUserByPK(userId: string): Promise<User | null> {
        const user = await this._userModel.findByPk(userId);

        if (user) {
            return UserMapper.toEntityFromModel(user);
        } else {
            return null;
        }

    }


    public async findUserByGoogleId(googleId: string): Promise<User | null> {
        const user = await this._userModel.findOne({
            where: { googleId }
        });

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


    public async updateUserVerify(userId: string): Promise<boolean> {
        const [updateRows, [updateUser]] = await this._userModel.update({ verify: true }, {
            where: { userId },
            returning: true
        })

        if (updateRows === 0) {
            throw ErrorFactory.createError("NotFound", "Failed to update")
        }

        if (updateUser.verify === true) {
            return true;
        } else {
            return false;
        }
    }

    public async deleteUserByPK(userId: string): Promise<number> {
        const result = await this._userModel.destroy({ where: { userId } });

        return result;
    }

}

export default UserRepository 