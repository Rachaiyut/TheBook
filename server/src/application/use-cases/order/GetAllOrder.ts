import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";
import { OrderService } from "@application/services/api";
import { IOrderDetailDTO } from "@application/dtos";

@injectable()
class GetAllOrder {


    private _orderService: OrderService   


    constructor(
        @inject(TYPES.OrderService) orderService: OrderService
    ) {
        this._orderService = orderService;

    }


    public async execute(userId: string): Promise<IOrderDetailDTO[]> {
        const result = await this._orderService.getAllOrdersByUser(userId);

        return result
    }

}

export default GetAllOrder 