import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    sql,
    NonAttribute,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    ColumnName,
    Table,
    Default,
    BelongsTo,
    NotNull,
    BelongsToMany,
} from '@sequelize/core/decorators-legacy';

import { injectable } from 'inversify';
import UserModel from './UserModel';

import { OrderItemsModel, BookModel } from '@infrastructure/models/index';

@injectable()
@Table({
    tableName: "orders",
    timestamps: false,
})
class OrderModel extends Model {

    @Attribute(DataTypes.UUID.V4)
    @Default(sql.uuidV4)
    @ColumnName('order_id')
    @PrimaryKey
    declare orderId?: string

    @Attribute(DataTypes.STRING)
    declare status: string

    @Attribute(DataTypes.INTEGER)
    @ColumnName('total_amount')
    declare totalAmount: number

    //UserModel
    @BelongsTo(() => UserModel, 'userId')
    declare user?: NonAttribute<UserModel>

    //OrderItemsModel
    @BelongsToMany(() => BookModel, {
        through: () => OrderItemsModel,
        foreignKey: 'order_id',
        otherKey: 'isbn',
    })
    declare orderItems?: BookModel[]

    //FK
    @Attribute(DataTypes.UUID.V4)
    @ColumnName('user_id')
    @NotNull
    declare userId: string

}

export default OrderModel;