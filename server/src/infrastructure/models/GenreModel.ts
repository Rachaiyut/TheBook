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
    tableName: 'genres',
    timestamps: false
})
class GenreModel extends Model<InferAttributes<GenreModel>, InferCreationAttributes<GenreModel>> {

    @Attribute(DataTypes.INTEGER)
    @ColumnName('genre_id')
    @AutoIncrement
    @PrimaryKey
    @Unique
    declare genreId: number

    @Attribute(DataTypes.STRING)
    declare name: string
}

export default GenreModel;
