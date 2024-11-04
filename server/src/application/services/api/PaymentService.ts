import { TYPES } from "@inversify/types";
import { inject, injectable } from "inversify";

// Service
import { OrderService } from "@application/services/api/index";

// Outer Service
import StripeService from "@infrastructure/services/Stripe/StripeService";



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

        const isSuccess = await this.handlePaymentSuccess(orderId!);

        return isSuccess

    }

    public async handlePaymentSuccess(orderId: string) {
        const isUpdateStatusSuccess = await this._orderService.updateOrderStatus(orderId);

        return isUpdateStatusSuccess; 
    }

}

export default PaymentService