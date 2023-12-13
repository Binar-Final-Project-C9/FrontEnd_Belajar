import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment(state, action) {
      state.items = action.payload.data.payments;
    },
  },
});

export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
