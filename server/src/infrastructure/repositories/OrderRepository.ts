import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

//Entites
import { Order } from "@domain/entites/index";
import { OrderMapper } from "@application/mappers/OrderMapper";

// Models
import { OrderModel } from "@infrastructure/models/index";

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


    public async getAll() {
        const result = await this._orderModel.findAll({
            include: [
                {
                    association: 'orderItems',
                    required: true
                }
            ]
        })

        const order = result.map((item) => item.dataValues)
        console.log(order)

        const orderItems = result.map((item) => item.dataValues.orderItems?.map(item => item.dataValues))

        console.log(orderItems)

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