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
    AutoIncrement
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';

@injectable()
@Table({
    tableName: 'genres',
    timestamps: false
})
class GenreModel extends Model<InferAttributes<GenreModel>, InferCreationAttributes<GenreModel>> {

    @Attribute(DataTypes.INTEGER)
    @AutoIncrement
    @PrimaryKey
    declare genre_id: number

    @Attribute(DataTypes.STRING)
    declare name: string

}

export default GenreModel;
