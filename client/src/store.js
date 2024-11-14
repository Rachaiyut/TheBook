import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book/redux/bookSlice"
import authReducer from "./features/authenticate/redux/authSlice"
import cartReducer from "./features/cart/redux/cartSlice"

const store = configureStore({
    reducer: {
        book: bookReducer,
        auth: authReducer,
        cart: cartReducer,
    },
});

export default store