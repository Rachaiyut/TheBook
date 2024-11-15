import { IoPencil } from "react-icons/io5";

function Wishlist() {
    return (
        <section className="w-full">
            <div className="max-w-4xl mx-auto bg-white shadow-md p-8">

                {/* <!-- Wishlist Header --> */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">My Wishlist</h1>
                        <p>This List is: Private</p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <span><IoPencil /></span>
                        <p>Edit this Wishlist</p>
                    </div>
                </div>

                <hr class="w-full h-px mt-4 mb-6 bg-gray-300 border-0 "></hr>

                {/* <!-- Wishlist Items --> */}
                <div className="py-3">
                    <ul className="">
                        {/* Example Wishlist Item */}
                        <li className="flex items-center justify-between ">
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
        </section>

    )
}

export default Wishlist