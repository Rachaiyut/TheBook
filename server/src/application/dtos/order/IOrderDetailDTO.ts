import IOrderLineItemDTO from "./IOrderLineItemDTO";

interface IOrderDetailDTO {
    orderId: string,
    status: string,
    totalAmount: number,
    orderItems: IOrderLineItemDTO[]
}

export default IOrderDetailDTO; 