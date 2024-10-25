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
    ColumnName
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';

@injectable()
@Table({
    tableName: 'book_genres',
    timestamps: false
})
class BookGenreModel extends Model<InferAttributes<BookGenreModel>, InferCreationAttributes<BookGenreModel>> {

    @Attribute(DataTypes.INTEGER)
    @ColumnName('book_genre_id') 
    @AutoIncrement
    @PrimaryKey
    declare bookGenreId?: number

    @Attribute(DataTypes.STRING)
    @ColumnName('isbn')
    declare isbn: string

    @Attribute(DataTypes.INTEGER)
    @ColumnName('genre_id')
    declare genreId: number


}

export default BookGenreModel;
