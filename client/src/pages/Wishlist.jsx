function Wishlist() {
    return (
        <section className="min-h-screen w-full bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">

                    {/* <!-- Wishlist Header --> */}
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-3xl font-semibold text-gray-800">My Wishlist</h1>
                    </div>

                    {/* <!-- Wishlist Items --> */}
                    <div className="p-6">
                        <ul className="space-y-4">
                            {/* Example Wishlist Item */}
                            <li className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                                <div className="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/80" alt="Item" className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Item Name</h2>
                                        <p className="text-gray-600">Item Description</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2">
                                        Move to Cart
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                                        Remove
                                    </button>
                                </div>
                            </li>
                            {/* Add more items as needed */}
                        </ul>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default Wishlist