import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";
import { OrderService } from "@application/services/api";
import { IOrderDetailDTO, IOrderDTO } from "@application/dtos";

@injectable()
class UpdateOrder {


    private _orderService: OrderService


    constructor(
        @inject(TYPES.OrderService) orderService: OrderService
    ) {
        this._orderService = orderService;

    }


    public async execute(orderId: string, orderDTO: Omit<IOrderDTO, "orderItems">) {
        const result = await this._orderService.updateOrder(orderId, orderDTO);

        return result
    }

}

export default UpdateOrder 