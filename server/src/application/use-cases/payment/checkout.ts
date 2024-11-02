// Inversify
import { inject, injectable } from "inversify";
import { TYPES } from "@inversify/types";

// Outer Service
import StripeService from "@infrastructure/services/Stripe/StripeService";

@injectable()
class Checkout {


    private readonly _stripeService: StripeService


    constructor(@inject(TYPES.StripeService) stripeService: StripeService) {
        this._stripeService = stripeService;
    }

    public async execute() {
        const result = await this._stripeService.chcekout();

        return result;
    }


}

export default Checkout