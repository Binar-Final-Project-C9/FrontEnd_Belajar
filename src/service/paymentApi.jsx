import { apiSlice } from "./api";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayment: builder.query({
      query: () => "/payment",
    }),
    updatePaymentStatus: builder.mutation({
      query: ({ id, updatedPayment }) => {
        return {
          url: `/payment/${id}`,
          method: "PATCH",
          body: updatedPayment,
        };
      },
    }),
  }),
});

export const { useFetchPaymentQuery, useUpdatePaymentStatusMutation } =
  paymentApi;
