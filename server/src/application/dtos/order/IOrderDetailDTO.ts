interface IOrderDetailDTO {
    orderId: string,
    status: string,
    totalAmount: number,
    orderItems: {
        bookName: string | null;
        bookPrice: number | null;
        bookImageCover: string | null;
        quantity: number;
        price: number;
    }[]
}

export default IOrderDetailDTO; 