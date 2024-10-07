import IOrderItemsDTO from "../orderItems/IOrderItemsDTO";

interface IOrderDTO {
    orderId?: string,
    status: string,
    totalAmount: number,
    userId: string
    orderItems: IOrderItemsDTO[]
}

export default IOrderDTO; 