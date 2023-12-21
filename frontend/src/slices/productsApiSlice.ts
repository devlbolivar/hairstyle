import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query({
      query: (id: string) => ({ url: `${PRODUCTS_URL}/${id}` }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
