import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store:{
        page: 1
    },
    stock:{
        page: 1
    },
    stockAdd:{
        page: 1
    },
    reportOrders:{
        page: 1
    },
    reportProducts:{
        page: 1
    },
}

export const infiniteScrollSlice = createSlice({
    name: "infiniteScroll",
    initialState,
    reducers: {
        incrementPage: (state, action) => {
            state[action.payload].page += 1
        },
        resetPage: (state, action) => {
            state[action.payload].page = 1;
        }
    }
})

export const { 
    incrementPage,
    resetPage
 } = infiniteScrollSlice.actions

export default infiniteScrollSlice.reducer