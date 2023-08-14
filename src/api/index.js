import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { store } from '../store';
import { setFiltersForRequest } from '../utils/helper';
import { SERVER_URL } from '../keys';

// const getHeader = () => {
//   const token = store.getState(state => state).login.token;
//   // console.log(token);
//   console.log(token);
//   return {
//     'content-type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
// }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, {getState}) => {
      // const token = getState().login.token;
      const token = getState().login.token;
      // console.log(token);

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
   }),
  tagTypes: ['User', 'Filters', 'Cart', 'Currency', 'Added', 'Eddit'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: 'admin/token/',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['User']
    }),
    getStoreItems: builder.query({
      query: (payload) => `/admin/shop_product?${setFiltersForRequest(payload)}`,
      providesTags: ['User', 'Cart', 'Eddit']
    }),
    getStockItems: builder.query({
      query: (payload) => `/admin/product?${setFiltersForRequest(payload)}`,
      providesTags: ['User', 'Eddit']
    }),
    getEndingItems: builder.query({
      query: () => '/admin/product/min_quantity/',
      providesTags: ['Eddit']
    }),
    editStockItem: builder.mutation({
      query: (payload) => ({
        url: `/admin/product/${payload.id}/`,
        method: "PUT",
        body: payload.body
      })
    }),
    createStockItem: builder.mutation({
      query: (payload) => ({
        url: `/admin/product/create/`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Added']
    }),
    createStockItems: builder.mutation({
      query: (payload) => ({
        url: `/admin/product/upload_new_data_ex/`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['Added']
    }),
    getLastAddedItems: builder.query({
      query: () => '/admin/product/last_product/',
      providesTags: ['Added']
    }),
    deleteStockItem: builder.mutation({
      query: (payload) => ({
        url: `/admin/product/${payload}/`,
        method:'DELETE'
      })
    }),
    getFilters: builder.query({
      query: () => 'admin/filters/get/',
      providesTags: ['Filters']
    }),
    createFilter: builder.mutation({
      query: (payload) => ({
        url: '/admin/filters/create/',
        method:'POST',
        body: payload
      }),
      invalidatesTags: ['Filters']
    }),
    deleteFilter: builder.mutation({
      query: (id) => ({
        url: `/admin/filters/rud/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Filters']
    }),
    getTegs: builder.query({
      query: (id) => `admin/teg/get?id=${id}`,
      providesTags: ['Filters']
    }),
    createTeg: builder.mutation({
      query: (payload) => ({
        url: '/admin/teg/create/',
        method:'POST',
        body: payload
      }),
      invalidatesTags: ['Filters']
    }),
    deleteTeg: builder.mutation({
      query: (id) => ({
        url: `/admin/teg/rud/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Filters']
    }),
    saveCart: builder.mutation({
      query: payload => ({
        url: '/admin/save_basket/',
        method:'POST',
        body: payload
      }),
      invalidatesTags: ['Cart']
    }),
    getCurrency: builder.query({
      query: () => '/admin/currency/get/',
      providesTags: ['Currency']
    }),
    createCurrency: builder.mutation({
      query: (payload) => ({
        url: '/admin/currency/create/',
        method:'POST',
        body: payload.body
      }),
      invalidatesTags: ['Currency']
    }),
    editCurrency: builder.mutation({
      query: (payload) => ({
        url: `/admin/currency/rud/${payload.id}/`,
        method:'PUT',
        body: payload.body
      }),
      invalidatesTags: ['Currency']
    }),
    deleteCurrency: builder.mutation({
      query: (payload) => ({
        url: `/admin/currency/rud/${payload}/`,
        method:'DELETE'
      }),
      invalidatesTags: ['Currency']
    })
  }),
})

export const { 
  useLoginMutation, 
  useGetStoreItemsQuery, 
  useGetStockItemsQuery,
  useGetEndingItemsQuery,
  useEditStockItemMutation,
  useCreateStockItemMutation,
  useCreateStockItemsMutation,
  useGetLastAddedItemsQuery,
  useDeleteStockItemMutation,
  useGetFiltersQuery, 
  useCreateFilterMutation,
  useDeleteFilterMutation, 
  useGetTegsQuery,
  useCreateTegMutation,
  useDeleteTegMutation,
  useSaveCartMutation,
  useGetCurrencyQuery,
  useCreateCurrencyMutation,
  useEditCurrencyMutation,
  useDeleteCurrencyMutation
} = api