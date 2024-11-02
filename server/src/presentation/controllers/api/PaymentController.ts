import { Request, Response } from "express";

// Inversify
import { inject } from "inversify";
import { TYPES } from "@inversify/types";
import { controller, httpPost, httpGet } from "inversify-express-utils";

//Use-Cases
import { Checkout } from "@application/use-cases/payment/index";

// Middlwares
import { RolesMiddleware } from "@presentation/middlewares";


@controller('/payment')
class PaymentController {


    private readonly _checkout: Checkout


    constructor(
        @inject(TYPES.Checkout) chcekout: Checkout,
    ) {
        this._checkout = chcekout
    }


    @httpPost("/")
    public async chcekout(req: Request, res: Response) {

        const url = await this._checkout.execute()

        res.status(201).json({
            success: true,
            data: url
        })
    }


}

export default PaymentController;