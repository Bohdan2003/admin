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
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "admin/token/",
        method: "POST",
        body: JSON.stringify(payload)
      })
    }),
    getStoreItems: builder.mutation({
      query: (filters = {}) => ({
        url: "admin/product/",
        method: "POST",
        body: JSON.stringify(filters)
      })
    })
  }),
})

export const { useLoginMutation, useGetStoreItemsMutation } = api