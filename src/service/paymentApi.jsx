import { apiSlice } from './api';

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayment: builder.query({
      query: () => '/payment',
    }),
  }),
});

export const { useFetchPaymentQuery } = paymentApi;
