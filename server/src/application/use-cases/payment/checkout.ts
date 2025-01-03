// Inversify
import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Outer Service
import { PaymentService } from "@application/services/api/index";

@injectable()
class Checkout {


    private readonly _paymentService: PaymentService


    constructor(@inject(TYPES.PaymentService) paymentService: PaymentService) {
        this._paymentService = paymentService;
    }

    public async execute(orderId: string) {
        const result = await this._paymentService.chcekout(orderId);

        return result;
    }


}

export default Checkout