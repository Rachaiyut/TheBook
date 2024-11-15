function ProductImage({ image, altText }) {
    return (
        <img
            src={image}
            alt={altText}
            className="w-2/5 h-60 object-contain"
            onerror="this.onerror=null"
        />
    )
}

export default ProductImage;