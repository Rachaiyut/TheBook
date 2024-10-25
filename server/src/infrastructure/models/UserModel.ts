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
	BeforeCreate
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';

import bcrypt from 'bcrypt';

import { UserRole } from '@domain/interfaces/entities';

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

	@BeforeCreate()
	static async hashPassword(userModel: UserModel) {
		const salt = await bcrypt.genSalt(10);
		userModel.password = await bcrypt.hash(userModel.password, salt)
	}
}

export default UserModel;
