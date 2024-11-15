import ProductImage from "./ProductImage"
import ProductInfo from "./Productinfo"

function CartItem({ item }) {
    return (
        <div className="border my-4">
            <div className="grid grid-cols-3 gap-4 p-3">
                {/* Product Image and Info */}
                <div className="flex col-span-2 ">
                    <ProductImage image={item.imageCover} altText={item.name} />
                    <ProductInfo item={item} />
                </div>

                {/* Pricing and Quantity Controls */}
                <div className="w-full items-end justify-items-end space-x-4 ">
                    <p className='text-lg font-bold'>฿{item.price}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem