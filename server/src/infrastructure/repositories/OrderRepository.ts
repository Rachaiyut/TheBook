import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

//Entites
import { Order } from "@domain/entites/index";
import { OrderMapper } from "@application/mappers/OrderMapper";

// Models
import { BookModel, OrderModel } from "@infrastructure/models/index";

// Error
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class OrderRepository {


    private _orderModel: typeof OrderModel;


    constructor(
        @inject(TYPES.OrderModel) orderModel: typeof OrderModel,
    ) {
        this._orderModel = orderModel;
    }


    public async create(order: Omit<Order, "orderItems">): Promise<string> {
        const orderModel = OrderMapper.toPersistenceModel(order)

        const newOrder = await OrderModel.create({
            userId: orderModel.userId,
            status: orderModel.status,
            totalAmount: orderModel.totalAmount,
        });

        if (!newOrder.dataValues) {
            throw ErrorFactory.createError("NotFound", "Failed to create the order.")
        }

        return OrderMapper.toEntityFromModel(newOrder).getOrderId()!;
    }


    public async getAll(userId: string): Promise<Order[]> {
        const orders = await this._orderModel.findAll({
            where: { userId },
            include: [
                {
                    association: 'orderItems',
                    attributes: ['isbn', 'name', 'price', 'imageCover'],
                    through: {
                        attributes: {
                            exclude: ['userId']
                        }
                    }
                },
            ]
        })

        console.log(orders)


        return orders.map((order) => OrderMapper.toEntityFromModel(order))
    }


    public async getOrder(orderId: string) {

        const isOrderExist = await this._orderModel.findOne(
            {
                where: { orderId }
            }
        )

        return isOrderExist ? OrderMapper.toEntityFromModel(isOrderExist) : null
    }
}

export default OrderRepository;