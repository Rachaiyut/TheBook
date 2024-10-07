class OrderItems {

    private _orderItemId?: string;
    public isbn: string;
    public orderId: string;
    public quantity: number;
    public price: number;


    constructor(
        isbn: string,
        orderId: string,
        quantity: number,
        price: number
    ) {
        this.isbn = isbn;
        this.orderId = orderId;
        this.quantity = quantity;
        this.price = price
    }

    public static create(
        isbn: string,
        orderId: string,
        quantity: number,
        price: number
    ): OrderItems {
        return new OrderItems(isbn, orderId, quantity, price)
    }

    public setOrderItemId(orderItemId: string) {
        this._orderItemId = orderItemId;
    }

    public getOrderItemId() {
        return this._orderItemId;
    }

}


export default OrderItems;