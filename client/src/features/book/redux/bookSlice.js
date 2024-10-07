import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBook } from "../../../services/book/getBooks";

export const fetchBook = createAsyncThunk(
    'book/fetchBook',
    async function () {
        const books = await getBook();
        return books
    }
)

const initialState = {
    status: 'idle',
    books: [],
    error: null
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.books = action.payload.data;
                state.status = 'idle';
            })
            .addCase(fetchBook.rejected, (state) => {
                state.status = 'error';
                state.error = "There was a problem getting the book";
            });
    }
});

export default bookSlice.reducer;
