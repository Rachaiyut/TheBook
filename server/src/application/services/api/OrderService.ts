import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IOrderDetailDTO, IOrderDTO, IOrderItemsDTO } from "@application/dtos";

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
        await this.createOrdersItems(orderId, order.orderItems);

        return orderId
    }


    public async createOrder(order: IOrderDTO): Promise<string> {
        const orderEntity = OrderMapper.toEntity(order)

        const orderId = await this._orderRepository.create(orderEntity)

        return orderId;
    }


    public async createOrdersItems(orderId: string, orderItems: IOrderItemsDTO[]) {
        const orderItemsEntity = orderItems.map((item) => OrderItemsMapper.toEntity(item))

        await this._orderItemsRepositoty.creteOrderItems(orderId, orderItemsEntity)
    }


    public async getAllOrdersByUser(userId: string): Promise<IOrderDetailDTO[]> { 
        const orderEntity = await this._orderRepository.getAllOrdersByUser(userId);

        return orderEntity.map((order) => OrderMapper.toOrderDetailDTO(order));
    }
 

    public async getOrder(orderId: string): Promise<IOrderDetailDTO> {

        const order = await this._orderRepository.getOrder(orderId);

        if (!order) {
            throw ErrorFactory.createError("NotFound", 'This order id is not found')
        }


        return OrderMapper.toOrderDetailDTO(order)
    }


    public async updateOrderStatus(orderId: string) {
        const orderEntity = await this._orderRepository.getOrder(orderId);

        orderEntity?.updateStatus('paid');

        
    }

}

export default OrderService;