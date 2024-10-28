import { Book, Order } from "@domain/entites/index";
import { IOrderDTO } from "@application/dtos/index";
import { OrderModel } from "@infrastructure/models/index";
import { BookMapper } from "./BookMapper";

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
        const orderItems = orderModel.orderItems?.map((orderItem) => BookMapper.toEntityFromModel(orderItem))

        const newOrder = Order.create(
            orderModel.status,
            orderModel.totalAmount,
            orderModel.userId,
        );

        newOrder.setOrderId(orderModel.orderId!);
        newOrder.setOrderItems(orderItems!)

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
