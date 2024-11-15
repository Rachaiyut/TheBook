import { useSelector } from "react-redux";

// UI
import CouponForm from "./CouponForm";

function CheckoutForm() {
    const orderItems = useSelector(state => state.cart.orderItems)
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const items = orderItems.reduce((acc, item) => acc + item.quantity, 0)

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="max-h-fit bg-white p-6">
            <div className="w-full border p-6 mb-5">
                <h2 className="text-xl font-bold mb-6 text-center">Order Summary</h2>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>Subtotal ({items} item)</div>
                        <div className="text-right">฿{totalPrice}</div>
                        <div>Estimate Shipping</div>
                        <div className="text-right">฿5.99</div>
                        <div>Estimate Tax</div>
                        <div className="text-right">฿0.00</div>
                    </div>

                    <hr className="w-full h-px mt-4 mb-6 bg-gray-300 border-0" />

                    <div className="flex justify-between mb-4">
                        <p className="font-semibold">Order Total</p>
                        <p>฿{(totalPrice + 5.99).toFixed(2)}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 hover:bg-green-700 transition-colors"
                        >
                            Purchase
                        </button>
                    </form>
                </div>
            </div>

            <CouponForm />
        </div>
    )
}

export default CheckoutForm;