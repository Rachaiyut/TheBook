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
import { Order } from "@domain/entites";


@injectable()
class OrderService {


    private readonly _orderRepository: OrderRepository;
    private readonly _orderItemsRepositoty: OrderItemsRepository;

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

        const orderEntity = await this._orderRepository.getOrder(orderId);

        if (!orderEntity) {
            throw ErrorFactory.createError("NotFound", 'This order id is not found')
        }


        return OrderMapper.toOrderDetailDTO(orderEntity)
    }


    public async updateOrder(orderId: string, orderDTO: Omit<IOrderDTO, "orderItems">): Promise<Omit<IOrderDTO, "orderItems">> {
        
        let orderEntity: Order;

        // Check if order exists
        const isOrderExist = await this.getOrder(orderId);

        if (!isOrderExist) {
            throw ErrorFactory.createError("NotFound", "This orde id is not found");
        }

        orderEntity = OrderMapper.toEntity(orderDTO);
        orderEntity.setOrderId(isOrderExist.orderId) // Set orderId

        const order = await this._orderRepository.updateOrderByPk(orderId, orderEntity)

        return OrderMapper.toDto(order)

    }


    public async updateOrderStatus(orderId: string): Promise<Omit<IOrderDTO, "orderItems">> {
        const orderEntity = await this._orderRepository.getOrder(orderId);

        if (!orderEntity) {
            throw ErrorFactory.createError("NotFound", 'This order id is not found')
        }

        orderEntity.updateStatus('paid');

        const orderDTO  = OrderMapper.toDto(orderEntity)

        const isStatusUpdated = await this.updateOrder(orderId, orderDTO)

        return isStatusUpdated;

    }

}

export default OrderService;