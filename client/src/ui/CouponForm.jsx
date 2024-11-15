function CouponForm() {
    return (
        <div className="w-full border p-4 flex ">
            <input
                type="text"
                placeholder="Apply Coupon Code"
                className="w-full border p-2 text-sm outline-none focus:ring-0"
            />
            <button className="px-4 py-2 text-sm text-center bg-green-600 hover:bg-green-700 text-white hover:bg-green-800 transition-colors">
                Apply
            </button>
        </div>
    )
}

export default CouponForm