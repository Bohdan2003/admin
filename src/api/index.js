import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setFiltersForRequest } from '../utils/helper';
import { SERVER_URL } from '../keys';

let storePage = 1;
let stockPage = 1;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().login.token;

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
   }),
  tagTypes: 
  [
    'User', 
    'Filters', 
    'Cart', 
    'Currency', 
    'Added', 
    'Eddit', 
    'Delete', 
    'Event'
  ],
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
      query: (payload) => {
        storePage = payload.page;
        return `/admin/shop_product/?page=${payload.page}&${setFiltersForRequest(payload.filters)}`
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if(storePage == 1) {
          currentCache.results = [...newItems.results];          
        } else {
          currentCache.results.push(...newItems.results);          
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['Cart']
    }),
    getStockItems: builder.query({
      query: (payload) => {
        stockPage = payload.page;
        return  `/admin/product/?page=${payload.page}&${setFiltersForRequest(payload.filters)}`;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if(stockPage == 1) {
          currentCache.results = [...newItems.results];          
        } else {
          currentCache.results.push(...newItems.results);          
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    getEndingItems: builder.query({
      query: () => '/admin/product/min_quantity/',
      providesTags: [
        'Added', 
        'Eddit',
        'Cart'
      ]
    }),   
    getLastAddedItems: builder.query({
      query: () => '/admin/product/last_product/',
      providesTags: ['Cart']
    }),
    editStockItem: builder.mutation({
      query: (payload) => ({
        url: `/admin/product/${payload.id}/`,
        method: "PUT",
        body: payload.body
      }),
      invalidatesTags:['Eddit']
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
    deleteStockItem: builder.mutation({
      query: (payload) => ({
        url: `/admin/product/${payload}/`,
        method:'DELETE'
      }),
      invalidatesTags: ['Delete']
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
      query: payload => ({
        url: '/admin/currency/create/',
        method:'POST',
        body: payload.body
      }),
      invalidatesTags: ['Currency']
    }),
    editCurrency: builder.mutation({
      query: payload => ({
        url: `/admin/currency/rud/${payload.id}/`,
        method:'PUT',
        body: payload.body
      }),
      invalidatesTags: ['Currency']
    }),
    deleteCurrency: builder.mutation({
      query: payload => ({
        url: `/admin/currency/rud/${payload}/`,
        method:'DELETE'
      }),
      invalidatesTags: ['Currency']
    }),
    getReportStatistics: builder.query({
      query: payload => `/admin/report/get_info/?start_date=${payload[0]}&end_date=${payload[1]}&`,
      providesTags: ['Cart']
    }),
    getReportOrders: builder.query({
      query: payload => `/admin/report/get_info/basket/?start_date=${payload.dateRange[0]}&end_date=${payload.dateRange[1]}&search=${payload.search}&`,
      providesTags: ['Cart']
    }),
    getReportProducts: builder.query({
      query: payload => `/admin/report/get_info/product/?start_date=${payload.dateRange[0]}&end_date=${payload.dateRange[1]}&search=${payload.search}&`,
      providesTags: ['Cart']
    }),
    getCalendarEvents: builder.query({
      query: `/admin/report/additional_expenses/`,
      providesTags: ['Event']
    }),
    crateCalendarEvent: builder.mutation({
      query: payload => ({
        url: `/admin/report/additional_expenses/create/`,
        method:'post',
        body: payload
      }),
      invalidatesTags: ['Event']
    }),
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
  useDeleteCurrencyMutation,
  useGetReportStatisticsQuery,
  useGetReportOrdersQuery,
  useGetReportProductsQuery,
  useGetCalendarEventsQuery,
  useCrateCalendarEventMutation
} = api