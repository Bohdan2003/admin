import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api';                    
import { redirect } from "react-router-dom";
import menu from '../components/header/menuSlice';
import filters from '../components/filters/filtersSlice';
import cart from '../components/cart/cartSlice';

// const handleErrorsMiddleware = (api) => (next) => async (action) => {
//   if (action?.type.endsWith('rejected') && action?.payload?.status === 401) {
//     console.log("/login");
//     return redirect("/login");
//   }
//   return next(action);
// };

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    menu,
    filters,
    cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      // .concat(handleErrorsMiddleware),
})