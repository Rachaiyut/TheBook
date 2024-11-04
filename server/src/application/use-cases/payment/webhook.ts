// Inversify
import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Outer Service
import { PaymentService } from "@application/services/api/index";

@injectable()
class Webhook {


    private readonly _paymentService: PaymentService


    constructor(@inject(TYPES.PaymentService) paymentService: PaymentService) {
        this._paymentService = paymentService;
    }

    public async execute(payload: any, signature: string) {
        const result = await this._paymentService.webhook(payload, signature);

        return result;
    }


}

export default Webhook