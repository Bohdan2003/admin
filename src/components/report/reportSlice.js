import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTable: 'orders'
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setActiveTable: (state, action) => {
            state.activeTable = action.payload;
        }
    },
  })
  
export const { setActiveTable } = reportSlice.actions
  
export default reportSlice.reducer