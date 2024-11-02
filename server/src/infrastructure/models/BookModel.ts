import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    ColumnName,
    Table,
    Default,
    BeforeCreate,
    BelongsToMany,
    BeforeBulkCreate
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';
import GenreModel from './GenreModel';
import BookGenreModel from './BookGenreModel';
import { NonAttribute } from 'sequelize';
import OrderItemsModel from './OrderItemModel';

@injectable()
@Table({
    tableName: 'books',
    timestamps: false
})
class BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>> {

    @Attribute(DataTypes.STRING)
    @PrimaryKey
    declare isbn: string

    @Attribute(DataTypes.STRING)
    declare name: string

    @BelongsToMany(() => GenreModel, {
        through: () => BookGenreModel,
        foreignKey: "isbn",
        otherKey: "genre_id"
    })
    declare genre: NonAttribute<GenreModel[]>

    @Attribute(DataTypes.TEXT)
    declare description: string

    @Attribute(DataTypes.ARRAY(DataTypes.STRING))
    declare authors: string[]

    @Attribute(DataTypes.DOUBLE)
    declare price: number  

    @Attribute(DataTypes.INTEGER)
    @ColumnName('total_stock')
    @Default(0)
    declare totalStock: number

    @Attribute(DataTypes.DOUBLE)
    @ColumnName('rating_average')
    declare ratingAverage: number

    @Attribute(DataTypes.INTEGER)
    declare pages: number

    @Attribute(DataTypes.STRING)
    @ColumnName('image_cover')
    declare imageCover: string

    @Attribute(DataTypes.DATE)
    @ColumnName("publication_date")
    declare publicationDate: Date

    @Attribute(DataTypes.STRING)
    declare slug: string

    OrderItemsModel?: OrderItemsModel;

    @BeforeCreate()
    static async slug(bookModel: BookModel) {
        bookModel.slug = bookModel.name.toLowerCase().replace(/\s+/g, '-')
    }

    @BeforeBulkCreate()
    static async slugs(bookModel: BookModel[]) {
        for (const book of bookModel) {
            book.slug = book.name.toLowerCase().replace(/\s+/g, '-');
        }
    }

}

export default BookModel;
