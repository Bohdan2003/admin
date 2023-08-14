import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeSection: 'main'
}

const stockSlice = createSlice({
    name:'stock',
    initialState,
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        removeActiveSection: (state) => {
            state.activeSection = 'main';
        }
    }
})

export const {
    setActiveSection,
    removeActiveSection
} = stockSlice.actions

export default stockSlice.reducer