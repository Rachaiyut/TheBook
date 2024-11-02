import { injectable } from 'inversify';

import Stripe from 'stripe';

import Local from '@shared/Local';


const stripe = new Stripe('');

@injectable()
class StripeService {


    constructor() { }


    public async chcekout() {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'thb',
                        product_data: {
                            name: 'T-shirt',
                            images: ["http://127.0.0.1:8000/public/eye.png"]
                        },
                        unit_amount: 2000,
                        tax_behavior: 'exclusive',
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: 'thb',
                        product_data: {
                            name: 'Toy',
                            images: ["http://127.0.0.1:8000/public/eye.png"]
                        },
                        unit_amount: 2000,
                        tax_behavior: 'exclusive',
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        })

        return session.url;
    }

}

export default StripeService