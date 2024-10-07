import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Entity
import OrderItems from "@domain/entites/OrderItems";

//Model
import { OrderItemsModel } from "@infrastructure/models/index";

// Error
import ErrorFactory from "@domain/exceptions/ErrorFactory";
 
@injectable()
class OrderItemsRepository {

    private _orderItemsModel: typeof OrderItemsModel;

    constructor(
        @inject(TYPES.OrderItemsModel) orderItemsModel: typeof OrderItemsModel,
    ) {
        this._orderItemsModel = orderItemsModel;
    }

    public async creteOrderItems(orderId: string, orderItems: OrderItems[]): Promise<void> {

        const orderItemsToCreate = orderItems.map(item => ({
            orderId: orderId!,
            isbn: item.isbn!,
            quantity: item.quantity,
            price: item.price
        }));


        const newOrdeItems = await this._orderItemsModel.bulkCreate(orderItemsToCreate);

        if (!newOrdeItems) {
            throw ErrorFactory.createError("Database", "Cannot create order items.")
        }

    }

}

export default OrderItemsRepository;