import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../keys'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');

      return headers;
    },
   }),
  tagTypes: ['User', 'Filters'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: 'admin/token/',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['User']
    }),
    getStoreItems: builder.mutation({
      query: (payload) => {
        const filters = {};
        if(payload.search !== '') filters.search = payload.search;
        if(payload.category !== '') filters.category = payload.category;
        
        filters.tegs = []
        let index = 0;        
        for(let item of payload.tegs){
          if(item?.length == 0 || item == null) continue;
          filters.tegs[index] = [];

          item.forEach(item => {
              if(item?.name ) filters.tegs[index].push(item.name)       
          })
          index++;
        }

        return {
          url: "admin/shop_product/",
          method: "POST",
          body: filters
        }
      },
      providesTags: ['User']
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
  }),
})

export const { 
  useLoginMutation, 
  useGetStoreItemsMutation, 
  useGetFiltersQuery, 
  useCreateFilterMutation,
  useDeleteFilterMutation, 
  useGetTegsQuery,
  useCreateTegMutation,
  useDeleteTegMutation 
} = api