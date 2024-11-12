import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    sql,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    Default,
    ColumnName,
    Unique
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';


@injectable()
@Table({
    tableName: 'verification_token',
})
class VerificationTokenModel extends Model<InferAttributes<VerificationTokenModel>, InferCreationAttributes<VerificationTokenModel>> {

    @Attribute(DataTypes.UUID.V4)
    @ColumnName('token_id')
    @Default(sql.uuidV4)
    @PrimaryKey
    @Unique
    declare tokenId?: number

    @Attribute(DataTypes.UUID.V4)
    @ColumnName('user_id')
    declare userId: string

    @Attribute(DataTypes.TEXT)
    declare token: string;

    @Attribute(DataTypes.TEXT)
    declare encrypted: string

    @Attribute(DataTypes.TEXT)
    declare iv: string
}

export default VerificationTokenModel;
