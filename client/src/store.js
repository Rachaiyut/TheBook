import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book/redux/bookSlice"
import authReducer from "./features/authenticate/redux/authSlice"

const store = configureStore({
    reducer: {
        book: bookReducer,
        auth: authReducer
    },
});

export default store