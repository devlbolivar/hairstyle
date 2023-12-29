import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => `${ORDERS_URL}/myorders`,
    }),
    // getOrders: builder.query({
    //   query: ({ pageNumber, keyword }) =>
    //     `${ORDERS_URL}?pageNumber=${pageNumber}&keyword=${keyword}`,
    // }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => `${PAYPAL_URL}`,
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
  useGetOrdersQuery,
} = orderSlice;
