import IBookDTO from "../book/IBookDTO";
import IOrderItemsDTO from "../orderItems/IOrderItemsDTO";

interface IOrderDetailDTO {
    orderId: string,
    status: string,
    totalAmount: number,
    userId: string
    orderItems: IOrderItemsDTO[],
    books: Array<Pick<IBookDTO, "isbn" | "name" | "price" | "imageCover">>;
}

export default IOrderDetailDTO; 