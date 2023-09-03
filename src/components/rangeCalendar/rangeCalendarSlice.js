import { createSlice } from "@reduxjs/toolkit";
import { convertDate } from "../../utils/helper";

const currentDate = new Date();
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

const initialState = {
    dateRange: 
        [
            convertDate(firstDayOfMonth), 
            convertDate(lastDayOfMonth)
        ]
}

export const rangeCalendarSlice = createSlice({
    name:'rangeCalendar',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload
        }
    }
})

export const { setDateRange } = rangeCalendarSlice.actions;

export default rangeCalendarSlice.reducer;