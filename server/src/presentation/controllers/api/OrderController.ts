import { Request, Response } from "express";

// Inversify
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost, httpGet } from "inversify-express-utils";

//Use-Cases
import { CreateOrder, GetAllOrder } from "@application/use-cases/order";


@controller("/orders")
class OrderController {

    private _creatOrder: CreateOrder
    private _getAllOrder: GetAllOrder

    constructor(
        @inject(TYPES.CreateOrder) createOrder: CreateOrder,
        @inject(TYPES.GetAllOrder) getAllOrder: GetAllOrder
    ) {
        this._creatOrder = createOrder;
        this._getAllOrder = getAllOrder;
    }


    @httpPost("/")
    public async createOrder(req: Request, res: Response) {
        const body = req.body;

        const order = await this._creatOrder.execute(body);

        res.status(201).json({
            success: true,
            data: order
        })
    }

    @httpGet('/')
    public async fidnAllOrder(req: Request, res: Response) {

        await this._getAllOrder.execute();

        res.status(201).json({
            success: true,
        })
    }

}

export default OrderController;