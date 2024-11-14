import { useRef } from "react";
import { createPortal } from "react-dom";

// React Icon
import { FaShoppingCart } from "react-icons/fa";

// Redux
import { useSelector } from "react-redux";

// React Router DOM
import { useNavigate } from "react-router-dom"

// Context
import { OptionalFormProvider } from "../contexts/OptionalFormContext";

// UI
import Modal from "./Modal";

function CartBadge() {
    const orderItems = useSelector(state => state.cart.orderItems)
    const dialogRef = useRef();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const showModal = () => dialogRef.current.show();
    const handleCart = () => navigate("/cart");

    return (
        <>
            <OptionalFormProvider>
                {createPortal(<Modal ref={dialogRef} />, document.body)}
            </OptionalFormProvider>

            <div className="relative pl-2">

                <FaShoppingCart
                    className="w-6 h-6 md:text-xl transition-transform transform hover:-translate-y-1 hover:cursor-pointer"
                    onClick={token ? handleCart : showModal}
                />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {orderItems.length - 1}
                </span>
            </div>
        </>
    )
}

export default CartBadge;  