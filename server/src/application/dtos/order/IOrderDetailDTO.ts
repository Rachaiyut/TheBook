import IBookDTO from "../book/IBookDTO";
import IOrderItemsDTO from "../orderItems/IOrderItemsDTO";

interface IOrderDTO {
    orderId?: string,
    status: string,
    totalAmount: number,
    userId: string
    orderItems: IOrderItemsDTO[],
    user: string,
    books: Array<Pick<IBookDTO, "isbn" | "name" | "price" | "imageCover">>;
}

export default IOrderDTO; 