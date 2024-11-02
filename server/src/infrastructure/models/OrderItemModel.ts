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
    ColumnName,
    Table,
    Default,
    NotNull,
    Unique,  
} from '@sequelize/core/decorators-legacy';
import { injectable } from 'inversify';

@injectable()
@Table({
    tableName: "orders_items",
    timestamps: false,
})
class OrderItemsModel extends Model<InferAttributes<OrderItemsModel>, InferCreationAttributes<OrderItemsModel>
> {
    @Attribute(DataTypes.UUID.V4)
    @Default(sql.uuidV4)
    @ColumnName('order_item_id')
    @PrimaryKey
    @Unique
    declare orderItemId?: string;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare quantity: number;

    @Attribute(DataTypes.DOUBLE)
    declare price: number;

    @Attribute(DataTypes.UUID)
    @ColumnName('order_id')
    @NotNull
    declare orderId: string;

    @Attribute(DataTypes.STRING)
    @ColumnName('isbn')
    @NotNull
    declare isbn: string;
}

export default OrderItemsModel;
