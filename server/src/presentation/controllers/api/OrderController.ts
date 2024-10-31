import { Request, Response } from "express";

// Inversify
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost, httpGet } from "inversify-express-utils";

//Use-Cases
import { CreateOrder, GetAllOrder, GetOrder } from "@application/use-cases/order";


@controller("/orders")
class OrderController {


    private readonly _creatOrder: CreateOrder
    private readonly _getAllOrder: GetAllOrder
    private readonly _getOrder: GetOrder


    constructor(
        @inject(TYPES.CreateOrder) createOrder: CreateOrder,
        @inject(TYPES.GetAllOrder) getAllOrder: GetAllOrder,
        @inject(TYPES.GetOrder) getOrder: GetOrder
    ) {
        this._creatOrder = createOrder;
        this._getAllOrder = getAllOrder;
        this._getOrder = getOrder
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


    @httpGet('/:userId')
    public async getAllOrderByUser(req: Request<{ userId: string }>, res: Response) {
        const userId = req.params.userId;

        const allOrder = await this._getAllOrder.execute(userId);

        res.status(201).json({
            success: true,
            data: allOrder
        })
    }


    @httpGet('/orderId')
    public async getOrder(req: Request<{ orderId: string }>, res: Response) {
        const orderId = req.params.orderId

        const order = await this._getOrder.execute(orderId);

        res.status(200).json({
            success: true,
            code: 200,
            data: order,
            errors: [],
            meta: {}
        })

    }

}

export default OrderController;