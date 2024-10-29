import { Book, Order } from "@domain/entites/index";
import { IOrderDTO } from "@application/dtos/index";
import { OrderModel } from "@infrastructure/models/index";
import { BookMapper } from "./BookMapper";
import OrderItemsMapper from "./OrderItemsMapper";

export class OrderMapper {
    // Convert Domain Entity to DTO
    public static toDto(order: Order): Omit<IOrderDTO, "orderItems"> {
        return {
            orderId: order.getOrderId()!,
            status: order.status!,
            totalAmount: order.totalAmount!,
            userId: order.userId!,
        };
    }

    // Convert DTO to Domain Entity
    public static toEntity(dto: Partial<Omit<IOrderDTO, "orderItems">>): Order {
        return Order.create(
            dto.status!,
            dto.totalAmount!,
            dto.userId!,
        );
    }

    // Convert Sequelize Model to Domain Entity
    public static toEntityFromModel(orderModel: OrderModel): Order {

        // Map order items from OrderModel to Book domain entities
        const bookItems = orderModel.orderItems?.map((orderItem) => BookMapper.toEntityFromModel(orderItem))

        // Map items from the junction table (OrderItemsModel) to OrderItem entities
        const orderItemRecords = orderModel.orderItems?.map((orderItem) => orderItem.dataValues.OrderItemsModel)!
        const orderItems = orderItemRecords?.map(item => OrderItemsMapper.toEntityFromModel(item!))

        const newOrder = Order.create(
            orderModel.status,
            orderModel.totalAmount,
            orderModel.userId,
        );

        newOrder.setOrderId(orderModel.orderId!);
        newOrder.setBookItems(bookItems!)
        newOrder.setOrderItem(orderItems)

        console.log(newOrder)
        console.log(newOrder)

        console.log("Order Book")
        console.log(newOrder.getBookItems())

        console.log("Order Item")
        console.log(newOrder.getOrderItem())

        return newOrder;
    }

    // Convert Domain Entity to Sequelize Model for persistence
    public static toPersistenceModel(order: Omit<Order, "orderItems">): OrderModel {
        return OrderModel.build({
            status: order.status,
            totalAmount: order.totalAmount,
            userId: order.userId
        });
    }
}
