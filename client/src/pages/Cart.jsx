import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Mock data - you can replace this with data from your backend
const cartItems = [
    {
        id: 1,
        name: 'The Sliding Mr. Bones (Next Stop, Pottersville)',
        price: 19.61,
        quantity: 2,
        imageUrl: 'https://via.placeholder.com/60',
    },
    {
        id: 2,
        name: 'Advanced JavaScript Concepts',
        price: 29.99,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/60',
    },
];

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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // Calculate the total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <section className="min-w-4xl w-full bg-gray-50">
            <div className="contianer grid grid-cols-3 gap-4">
                {/* Order Summary Section */}
                <div className="bg-white p-6 col-span-2">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 text-center text-sm uppercase font-bold border-b border-gray-300">
                                    Product
                                </th>
                                <th className="py-4 px-6 text-center text-sm uppercase font-bold border-b border-gray-300">
                                    Quantity
                                </th>
                                <th className="py-4 px-6 text-center text-sm uppercase font-bold border-b border-gray-300">
                                    Unit Price
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item) => (
                                <tr key={item.isbn} className="hover:bg-gray-100">
                                    <td className="py-4 px-6 border-b border-gray-300 text-center">
                                        <div className="flex">
                                            <img
                                                src={item.imageCover}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="ml-4 my-auto">{item.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-300 text-center">{item.quantity}</td>
                                    <td className="py-4 px-6 border-b border-gray-300 text-center">${item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right font-bold mt-4">
                        Total: ${totalPrice.toFixed(2)}
                    </div>
                </div>

                {/* Checkout Form Section */}
                <div className="bg-white p-6">
                    <div className='w-full'>
                        <h2 className="text-xl font-bold mb-6">Checkout</h2>
                        <form onSubmit={handleSubmit}>
                            <p>Total $69.21</p>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Purchase
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
