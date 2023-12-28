import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment(state, action) {
      state.items = action.payload.data.payments;
    },
    updatePaymentStatus: (state, action) => {
      const { id, updatedPayment } = action.payload;
      const existingPaymentIndex = state.items.findIndex(
        (payment) => payment.id === id
      );
      if (existingPaymentIndex !== -1) {
        state.items[existingPaymentIndex] = {
          ...state.items[existingPaymentIndex],
          ...updatedPayment,
        };
      }
    },
  },
});

export const { setPayment, updatePaymentStatus } = paymentSlice.actions;

export default paymentSlice.reducer;
