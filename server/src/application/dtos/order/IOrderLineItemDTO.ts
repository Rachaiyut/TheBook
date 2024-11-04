
interface IOrderLineItemDTO {
    bookName: string | null;
    bookPrice: number | null;
    bookImageCover: string | null;
    quantity: number;
    price: number;
}

export default IOrderLineItemDTO