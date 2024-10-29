import IOrderItemsDTO from "@application/dtos/orderItems/IOrderItemsDTO";
import OrderItems from "@domain/entites/OrderItems";
import { OrderItemsModel } from "@infrastructure/models/index";

class OrderItemsMapper {
    // Convert Domain Entity to DTO
    public static toDto(orderItem: OrderItems): IOrderItemsDTO {

        return {
            orderItemId: orderItem.getOrderItemId()!,
            isbn: orderItem.isbn,
            orderId: orderItem.orderId,
            quantity: orderItem.quantity,
            price: orderItem.price
        };
    }

    // Convert DTO to Domain Entity
    public static toEntity(dto: IOrderItemsDTO): OrderItems {
        return OrderItems.create(
            dto.isbn,
            dto.orderId,
            dto.quantity,
            dto.price,
        );
    }

    // Convert Sequelize Model to Domain Entity
    public static toEntityFromModel(orderModel: OrderItemsModel): OrderItems {
        return OrderItems.create(
            orderModel.dataValues.isbn,
            orderModel.dataValues.orderId,
            orderModel.dataValues.quantity,
            orderModel.dataValues.price,
        );
    }

    // Convert Domain Entity to Sequelize Model for persistence
    public static toPersistenceModel(orderItems: OrderItems): OrderItemsModel {
        return OrderItemsModel.build({
            isbn: orderItems.isbn,
            orderId: orderItems.orderId,
            quantity: orderItems.quantity,
            price: orderItems.price,
        });
    }
}

export default OrderItemsMapper;
