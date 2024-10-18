import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import registerUser from "../../../services/auth/register";
import loginUser from "../../../services/auth/login";

export const registerRedux = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {

            const { data } = await registerUser({ name, email, password })

            localStorage.setItem('token', data.data.token)

            return data

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const loginRedux = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {

            const { data } = await loginUser({ email, password })

            localStorage.setItem('token', data.data.token)

            return data

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null


const initialState = {
    loading: false,
    userInfo: {
        name: "",
        email: "",
        roles: ""
    },
    token,
    error: null,
    success: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');

            state.loading = false
            state.userInfo = {
                name: "",
                email: "",
                roles: ""
            }
            state.token = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerRedux.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerRedux.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.data
                state.token = action.payload.data.token
                state.success = true;
            })
            .addCase(registerRedux.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginRedux.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(loginRedux.fulfilled, (state, action) => {
                state.loading = false
                state.userInfo.email = action.payload.data.email;
                state.userInfo.name = action.payload.data.name;
                state.userInfo.role = action.payload.data.roles;
                state.token = action.payload.data.token
            })
            .addCase(loginRedux.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer;