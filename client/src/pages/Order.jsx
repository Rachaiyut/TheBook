import Table from "../ui/Table";

function Order() {
    return (
        <section className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* <!-- Order Details Section --> */}
                    <div className="col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">Order Details</h2>
                        </div>

                        <div className="p-6">
                            <Table columns="repeat(6, 1fr)">
                                <Table.Header>
                                    <th className="py-4 px-6 text-left">ID</th>
                                    <th className="py-4 px-6 text-left">Cabin</th>
                                    <th className="py-4 px-6 text-left">Capacity</th>
                                    <th className="py-4 px-6 text-left">Price</th>
                                    <th className="py-4 px-6 text-left">Discount</th>
                                    <th className="py-4 px-6 text-left">Action</th>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <td className="py-3 px-4 text-left">1</td>
                                        <td className="py-3 px-4 text-left">Deluxe</td>
                                        <td className="py-3 px-4 text-left">4</td>
                                        <td className="py-3 px-4 text-left">$200</td>
                                        <td className="py-3 px-4 text-left">10%</td>
                                        <td className="py-3 px-4 text-left">Edit</td>
                                    </Table.Row>
                                    {/* <!-- Add more rows as needed --> */}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>

                    {/* <!-- Billing Address Section --> */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">Billing Address</h2>
                        </div>

                        <div className="p-6">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Street Address</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">City</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">State</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">ZIP Code</label>
                                    <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Save Address</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                {/* <!-- Order Summary Section --> */}
                <div className="bg-white shadow-md rounded-lg mt-8 p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
                    <div className="mt-4 flex justify-between border-b border-gray-200 pb-4">
                        <span className="font-medium text-gray-800">Subtotal:</span>
                        <span className="text-gray-600">$200</span>
                    </div>
                    <div className="mt-4 flex justify-between border-b border-gray-200 pb-4">
                        <span className="font-medium text-gray-800">Discount:</span>
                        <span className="text-gray-600">-10%</span>
                    </div>
                    <div className="mt-4 flex justify-between border-b border-gray-200 pb-4">
                        <span className="font-medium text-gray-800">Total:</span>
                        <span className="text-gray-800">$180</span>
                    </div>
                    <button type="button" className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700">Complete Purchase</button>
                </div>

            </div>
        </section>
    );
}

export default Order;
