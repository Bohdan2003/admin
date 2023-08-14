import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api';                    
// import { redirect } from "react-router-dom";
import login from '../components/pages/loginSlice';
import header from '../components/header/headerSlice';
import filters from '../components/filters/filtersSlice';
import cart from '../components/cart/cartSlice';
import stock from '../components/stock/stockSlice';

// const handleErrorsMiddleware = (api) => (next) => async (action) => {
//   if (action?.type.endsWith('rejected') && action?.payload?.status === 401) {
//     console.log("/login");
//     return redirect("/login");
//   }
//   return next(action);
// };

export const store = configureStore({
  reducer: {
    login,
    header,
    filters,
    cart,
    stock,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      // .concat(handleErrorsMiddleware),
})