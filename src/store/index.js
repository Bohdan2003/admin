import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api';                    
// import { redirect } from "react-router-dom";
import login from '../components/pages/loginSlice';
import header from '../components/header/headerSlice';
import filters from '../components/filters/filtersSlice';
import cart from '../components/cart/cartSlice';
import stock from '../components/stock/stockSlice';
import rangeCalendar from '../components/rangeCalendar/rangeCalendarSlice';
import report from '../components/report/reportSlice';
import infiniteScroll from '../components/infiniteScroll/infiniteScrollSlice';

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
    rangeCalendar,
    report,
    infiniteScroll,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      // .concat(handleErrorsMiddleware),
})