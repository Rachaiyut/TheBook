//Redux
import { useSelector } from "react-redux";

// UI
import CartItemsList from "./CartItemList";

function OrderSummary() {
    const orderItems = useSelector(state => state.cart.orderItems)
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-white p-6 col-span-2">
            <h2 className="text-xl font-bold mb-6 text-center">My Shopping Cart</h2>

            <CartItemsList orderItems={orderItems} />

            <div className="text-right text-lg font-bold mt-4">
                Total: ${totalPrice.toFixed(2)}
            </div>
        </div>
    )
}

export default OrderSummary;