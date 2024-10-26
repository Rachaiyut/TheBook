import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IOrderDTO, IOrderItemsDTO } from "@application/dtos";

// Repositories
import { OrderRepository, OrderItemsRepository } from "@infrastructure/repositories/index";

// Mappers
import { OrderMapper } from "@application/mappers/OrderMapper";
import OrderItemsMapper from "@application/mappers/OrderItemsMapper";

// Error handling
import ErrorFactory from "@domain/exceptions/ErrorFactory";


@injectable()
class OrderService {

    private _orderRepository: OrderRepository;
    private _orderItemsRepositoty: OrderItemsRepository;

    constructor(
        @inject(TYPES.OrderRepository) orderRepository: OrderRepository,
        @inject(TYPES.OrderItemsRepository) orderItemsRepository: OrderItemsRepository
    ) {
        this._orderRepository = orderRepository;
        this._orderItemsRepositoty = orderItemsRepository;
    }


    public async create(order: IOrderDTO): Promise<string> {

        const orderId = await this.createOrder(order);
        await this.createOrderItems(orderId, order.orderItems);

        return orderId
    }


    public async createOrder(order: IOrderDTO): Promise<string> {
        const orderEntity = OrderMapper.toEntity(order)

        const orderId = await this._orderRepository.create(orderEntity)

        return orderId;
    }


    public async createOrderItems(orderId: string, orderItems: IOrderItemsDTO[]) {
        const orderItemsEntity = orderItems.map((item) => OrderItemsMapper.toEntity(item))

        await this._orderItemsRepositoty.creteOrderItems(orderId, orderItemsEntity)

    }


    public async getAllOrders() {
        await this._orderRepository.getAll();
    }


    public async getOrder(orderId: string) {

        const order = await this._orderRepository.getOrder(orderId);

        if (!order) {
            throw ErrorFactory.createError("NotFound", 'This order id is not found')
        }


        return OrderMapper.toDto(order)
    }

}

export default OrderService;