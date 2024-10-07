import { useState } from "react";

function Dropdown() {
    const [selectedProduct, setSelectedProduct] = useState('Select Products');

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    }

    return (
        <select
            className="w-40 px-2 py-1 text-xs"
            value={selectedProduct}
            onChange={handleProductChange}
        >
            <option>Select Products</option>
            <option value="Books">Books</option>
            <option value="Magazines">Magazines</option>
        </select>
    )
}

export default Dropdown;