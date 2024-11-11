import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	sql,
} from '@sequelize/core';
import {
	Attribute,
	PrimaryKey,
	ColumnName,
	Table,
	Default,
	BeforeCreate,
	BeforeBulkCreate,
	Unique,
	HasMany
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';

import bcrypt from 'bcrypt';

import { UserRole } from '@domain/interfaces/entities';
import VerificationTokenModel from './VerificationTokenModel';
import { NonAttribute } from 'sequelize';

@injectable()
@Table({
	tableName: 'users',
	timestamps: false
})
class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {

	@Attribute(DataTypes.UUID.V4)
	@Default(sql.uuidV4)
	@ColumnName('user_id')
	@PrimaryKey
	@Unique
	declare userId: string

	@Attribute(DataTypes.TEXT)
	@ColumnName("google_id")
	declare googleId: string

	@Attribute(DataTypes.STRING)
	declare name: string

	@Attribute(DataTypes.STRING)
	declare email: string

	@Attribute(DataTypes.STRING)
	declare password: string

	@Attribute(DataTypes.TIME)
	@ColumnName('password_change_at')
	declare passwordChangeAt: CreationOptional<Date | undefined>

	@Attribute(DataTypes.ARRAY(DataTypes.ENUM('user', 'admin')))
	@Default([UserRole.User])
	declare roles: Array<"user" | "admin">

	@Attribute(DataTypes.STRING)  
	photo?: string;

	@Attribute(DataTypes.BOOLEAN)
	@Default(false)
	declare verify: boolean

	@HasMany(() => VerificationTokenModel, 'userId')
	declare token: NonAttribute<VerificationTokenModel[]>

	@BeforeCreate()
	static async hashPassword(userModel: UserModel) {
		const salt = await bcrypt.genSalt(10);
		userModel.password = await bcrypt.hash(userModel.password, salt)
	}

	@BeforeBulkCreate()
	static async hashPasswords(userModel: UserModel[]) {
		for (const user of userModel) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt)
		}
	}
}

export default UserModel;
