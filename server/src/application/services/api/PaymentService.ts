import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

// Service
import { OrderService } from "@application/services/api/index";

// Outer Service
import StripeService from "@infrastructure/services/Stripe/StripeService";

// Resitory
import { OrderRepository } from "@infrastructure/repositories";


@injectable()
class PaymentService {


    private readonly _orderService: OrderService;
    private readonly _Striprservice: StripeService;


    constructor(
        @inject(TYPES.OrderService) orderService: OrderService,
        @inject(TYPES.StripeService) StripeService: StripeService,
    ) {
        this._orderService = orderService;
        this._Striprservice = StripeService;
    }


    public async chcekout(orderId: string): Promise<string | null> {

        const orderEntity = await this._orderService.getOrder(orderId)
 
        const url = await this._Striprservice.checkout(orderEntity.orderId, orderEntity.orderItems)

        // Catch and Error
        if (url === null) {

        } 

        return url
    }


    public async webhook(body: any, sig: string){

        const orderId = await this._Striprservice.webhook(body, sig)

        await this.handlePaymentSuccess(orderId);


    }

    public async handlePaymentSuccess(orderId: string) {
        const update = await this._orderService.updateOrderStatus(orderId);


    }

}

export default PaymentService