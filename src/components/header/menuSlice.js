import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeSection: "store",
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload
    }
  },
})

export const { setActiveSection } = menuSlice.actions

export default menuSlice.reducer