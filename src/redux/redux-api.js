import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = '"https://dummyjson.com/"';
export const BaseReduxApi = createApi({
  reducerPath: "baseReduxApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => `products` }),
  }),
});

export const { getProductsByQuery } = BaseReduxApi;
