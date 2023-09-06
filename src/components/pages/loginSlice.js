import { createSlice } from "@reduxjs/toolkit";

const session = JSON.parse(localStorage.getItem("session"));

const initialState = session || {
    token: null,
    role: null
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setSession: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            localStorage.setItem("session", JSON.stringify(action.payload));
        },
        removeSession: state => {
            localStorage.removeItem("session");
            state = initialState;
        }
    }
})

export const {
    setSession,
    removeSession
} = loginSlice.actions

export default loginSlice.reducer