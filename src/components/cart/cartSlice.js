import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
        const { art, currency, price, opt, name, quantity, quantity_in_shop, retail, image1, image2, image3, id } = action.payload;
        state.items.push({
          art, 
          currency, 
          price: opt, 
          name, 
          buy_price: price, 
          quantity: 1,
          total: +opt * 1,
          quantity_in_stock: quantity,
          quantity_in_shop,
          opt,
          retail, 
          image1, image2, image3,
          id
        });
        localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItemToCart: (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(item => item.id != id);
        localStorage.setItem('cart', JSON.stringify(state.items));    
    },
    editItemToCart: (state, action) => {
      const { id } = action.payload;
      const index = state.items.findIndex(item => item.id == id);
      state.items[index] = {
        ...state.items[index], ...action.payload
      };
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart:state => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  },
})

export const { addItemToCart, removeItemToCart, editItemToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;