import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        removeToken: state => {
            localStorage.removeItem("token");
            state.token = null;
        }
    }
})

export const {
    setToken,
    removeToken
} = loginSlice.actions

export default loginSlice.reducer