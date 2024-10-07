import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";
import { OrderService } from "@application/services/api";

@injectable()
class GetAllOrder {

    private _orderService: OrderService

    constructor(
        @inject(TYPES.OrderService) orderService: OrderService
    ) {
        this._orderService = orderService;

    }


    public async execute() {
        await this._orderService.getAllOrders();

    }

}

export default GetAllOrder