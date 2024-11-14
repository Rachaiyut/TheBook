import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    status: "pending",
    totalAmount: 0,
    orderItems: [{
        isbn: "",
        name: "",
        imageCover: "",
        quantity: 0,
        price: 0
    }]
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.orderItems.find(item => item.isbn === newItem.isbn);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.orderItems.push({
                    isbn: newItem.isbn,
                    name: newItem.name,
                    imageCover: newItem.imageCover,
                    quantity: newItem.quantity,
                    price: newItem.price
                });
            }

            state.userId = newItem.userId;
            state.totalAmount += newItem.price * newItem.quantity;
        }
    }
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;