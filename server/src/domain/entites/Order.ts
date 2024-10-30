import Book from "./Book";
import OrderItems from "./OrderItems";

class Order {

    private _orderId?: string;
    private _bookItems?: Book[]

    private constructor(
        public status: string, 
        public totalAmount: number,
        public userId: string,
    ) { }

    public static create(
        status: string,
        totalAmount: number,
        userId: string,
    ): Order {
        return new Order(status, totalAmount, userId);
    }

    public setOrderId(orderId: string) {
        this._orderId = orderId;
    }

    public getOrderId() {
        return this._orderId;
    }

    public setBookItems(orderItems: Book[]) {
        this._bookItems = orderItems;
    }

    public getBookItems() {
        return this._bookItems;
    }

    public setOrderItem(order: OrderItems){
        const orderItem = new OrderItems(order.isbn, order.isbn, order.quantity, order.price);
    }


    // Example method to update order status
    public updateStatus(newStatus: string): void {
        this.status = newStatus;
    }

    // Example method to update total amount
    public updateTotalAmount(newAmount: number): void {
        this.totalAmount = newAmount;
    }
}

export default Order;