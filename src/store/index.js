import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api'
import menu from '../components/header/menuSlice'
import cart from '../components/cart/cartSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    menu,
    cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})