import express, { Request, Response } from "express";

// Inversify
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost, httpGet } from "inversify-express-utils";

//Use-Cases
import { Checkout, Webhook } from "@application/use-cases/payment/index";

// Middlwares
import { RolesMiddleware } from "@presentation/middlewares";


@controller('/payment')
class PaymentController {


    private readonly _checkout: Checkout;
    private readonly _webhook: Webhook;


    constructor(
        @inject(TYPES.Checkout) chcekout: Checkout,
        @inject(TYPES.Webhook) webhook: Webhook
    ) {
        this._checkout = chcekout;
        this._webhook = webhook;
    }


    @httpPost("/webhook", express.raw({ type: 'application/json' }))
    public async webhook(req: Request, res: Response) {

        const payload = req.body;
        const signature = req.headers['stripe-signature'] as string;

        const result = await this._webhook.execute(payload, signature)

        res.status(200).json({
            success: true,
            data: []
        })
    }


    @httpPost("/:orderId")
    public async chcekout(req: Request<{ orderId: string }>, res: Response) {

        const orderId = req.params.orderId;

        const url = await this._checkout.execute(orderId);

        res.status(201).json({
            success: true,
            data: url
        })
    }

}

export default PaymentController;