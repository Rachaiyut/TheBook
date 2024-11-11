import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    AutoIncrement,
    ColumnName,
    Unique
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';

@injectable()
@Table({
    tableName: 'verification_token',
})
class VerificationTokenModel extends Model<InferAttributes<VerificationTokenModel>, InferCreationAttributes<VerificationTokenModel>> {

    @Attribute(DataTypes.INTEGER)
    @ColumnName('token_id')
    @AutoIncrement
    @PrimaryKey
    @Unique
    declare tokenId: number

    @Attribute(DataTypes.UUID.V4)
    @ColumnName('user_id')
    declare userId: string

    @Attribute(DataTypes.TEXT)
    declare token: string;

    @Attribute(DataTypes.TEXT)
    declare iv: string
}

export default VerificationTokenModel;
