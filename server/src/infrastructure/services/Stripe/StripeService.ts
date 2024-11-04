import { Request } from 'express';

import { injectable } from 'inversify';

import Local from '@shared/Local';

import Stripe from 'stripe';
const stripe = new Stripe(Local.config().stripeSecretKey);

// DTO
import IOrderLineItemDTO from '@application/dtos/order/IOrderLineItemDTO';

// Error
import ErrorFactory from '@domain/exceptions/ErrorFactory';


@injectable()
class StripeService {


    constructor() { }


    private getStripeConfig() {
        const stripeSecretKey = Local.config().stripeSecretKey;
        const stripeWebhook = Local.config().stripeWebhook

        return {
            stripeSecretKey,
            stripeWebhook
        };
    }

    public async checkout(orderId: string, orderLineItem: IOrderLineItemDTO[]) {

        const session = await stripe.checkout.sessions.create({
            line_items: orderLineItem.map((item) => ({
                price_data: {
                    currency: 'thb',
                    product_data: {
                        name: item.bookName!,
                        images: [item.bookImageCover!]
                    },
                    unit_amount: item.bookPrice! * 100
                },
                quantity: item.quantity!
            })),
            metadata: {
                orderId
            },
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });


        return session.url;
    }


    public async webhook(payload: any, signature: string) {

        let event;
        const { stripeWebhook } = this.getStripeConfig();

        try {
            event = await stripe.webhooks.constructEventAsync(payload, signature, stripeWebhook);
        } catch (error) {
            throw ErrorFactory.createError("InvalidSignature", "Invalid signature or payload");
        }

        if (!event || !event.type || !event.data) {
            throw ErrorFactory.createError("InvalidEvent", "Webhook event structure is invalid");
        }

        switch (event.type) {
            case 'checkout.session.completed': {

                const orderId = event.data.object.metadata?.orderId;

                if (orderId) {
                    return orderId;
                } else {
                    throw ErrorFactory.createError("NotFound", "Order ID not found in event metadata");
                }
            }
            default:
                throw ErrorFactory.createError("UnsupportedEvent", `Unhandled event type:`);
        }
    }


}

export default StripeService