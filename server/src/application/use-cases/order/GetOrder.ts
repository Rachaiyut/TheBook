import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// DTO
import { IOrderDetailDTO } from "@application/dtos";

// Service
import { OrderService } from "@application/services/api/index";

@injectable()
class GetAllOrder {


    private _orderService: OrderService   


    constructor(
        @inject(TYPES.OrderService) orderService: OrderService
    ) {
        this._orderService = orderService;

    }

    public async execute(orderId: string): Promise<IOrderDetailDTO> {
        const result = await this._orderService.getOrder(orderId);

        return result
    }

}

export default GetAllOrder 