import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";
import { IOrderDTO } from "@application/dtos";

// Service 
import { OrderService } from "@application/services/api";

@injectable()
class GetOrder {


    private readonly _orderService: OrderService


    constructor(
        @inject(TYPES.OrderService) orderService: OrderService
    ) {
        this._orderService = orderService;
    }


    public async execute(orderId: string): Promise<Omit<IOrderDTO, "orderItems">> {
        const order = await this._orderService.getOrder(orderId);

        return order;
    }

}

export default GetOrder 