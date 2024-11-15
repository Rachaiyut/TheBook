import { useSelector } from "react-redux";
import CartItem from "./CartItem";

function CartItemsList({ orderItems }) {

    return (
        <>
            {orderItems?.map((item) => (
                <CartItem key={item.isbn} item={item} />
            ))}
        </>
    )
}

export default CartItemsList;