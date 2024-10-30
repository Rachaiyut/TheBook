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

        const bookEntity = orderModel.orderItems?.map((orderItem) => {

            const bookItem = BookMapper.toEntityFromModel(orderItem)

            const orderItems = OrderItemsMapper.toEntityFromModel(orderItem.dataValues.OrderItemsModel!)
            
            bookItem.setOrderItem(orderItems)

            return bookItem
        })

        const orderEntity = Order.create(
            orderModel.status,
            orderModel.totalAmount,
            orderModel.userId, 
        );

        orderEntity.setOrderId(orderModel.orderId!);
        orderEntity.setBookItems(bookEntity!)
       
        return orderEntity;
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
