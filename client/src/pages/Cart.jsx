import React, { useState } from 'react';

// Reduc
import { useSelector } from 'react-redux';

// UI
import OrderSummary from '../ui/OrderSummary';
import CheckoutForm from '../ui/CheckoutForm';

function Cart() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const orderItems = useSelector(state => state.cart.orderItems)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="min-w-4xl w-full bg-moonLily">
            <div className="contianer grid grid-cols-3 gap-4">
                <OrderSummary />
                <CheckoutForm />              
            </div>
        </section>
    );
};

export default Cart;
