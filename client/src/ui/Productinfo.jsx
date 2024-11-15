function ProductInfo({ item }) {
    return (
        <div className="flex flex-col gap-2">
            <p className='font-bold text-2xl'>Book Title: {item.name}</p>
            <p className="font-normal">ISBN: {item.isbn}</p>
            <p className='font-light'>Quantity {item.quantity} at ฿{item.price}</p>
            <div className='flex'>
                <button className='font-medium'>Edit</button>
                <span className='mx-3'>|</span>
                <button className='font-medium'>Remove</button>
            </div>
        </div>
    )
}

export default ProductInfo;