import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
        const { id } = action.payload
        state.items.push(action.payload)
        localStorage.setItem('cart', JSON.stringify(state.items))

        document.querySelector(`#store__row-${id} .store__btn-delete`).classList.remove("store__btn-delete--hidden")
        document.querySelector(`#store__row-${id} .store__btn-add`).classList.add("store__btn-add--hidden")
    },
    removeItemToCart: (state, action) => {
        const id = action.payload
        state.items = state.items.filter(item => item.id != id)
        localStorage.setItem('cart', JSON.stringify(state.items))

        document.querySelector(`#store__row-${id} .store__btn-delete`).classList.add("store__btn-delete--hidden")
        document.querySelector(`#store__row-${id} .store__btn-add`).classList.remove("store__btn-add--hidden")
        
    }
  },
})

export const { addItemToCart, removeItemToCart } = cartSlice.actions

export default cartSlice.reducer