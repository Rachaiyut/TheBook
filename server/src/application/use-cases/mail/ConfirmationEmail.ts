// import { TYPES } from "@inversify/types";
// import { inject, injectable } from "inversify";

// //Service


// @injectable()
// class ComfirmationEmail {

//     private _orderService: OrderService;

//     constructor(
//         @inject(TYPES.OrderService) orderService: OrderService
//     ) {
//         this._orderService = orderService
//     }

//     public async execute(orderDTO: IOrderDTO): Promise<string> {
//         const result = await this._orderService.create(orderDTO);

//         return result;
//     }


// }

// export default ComfirmationEmail;