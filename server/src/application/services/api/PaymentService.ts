import StripeService from "@infrastructure/services/Stripe/StripeService";
import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

@injectable()
class PaymentService {


    private readonly _Striprservice: StripeService;


    constructor(
        @inject(TYPES.StripeService) StripeService: StripeService
    ) {
        this._Striprservice = StripeService;
    }


    public async chcekout() {

    }

}

export default PaymentService