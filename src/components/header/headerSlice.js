import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // activeSection: "stock"
    activeSection: "stock"
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload
    }
  },
})

export const { setActiveSection } = headerSlice.actions

export default headerSlice.reducer