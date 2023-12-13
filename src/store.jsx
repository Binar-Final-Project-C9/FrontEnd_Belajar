import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import paymentReducer from './slices/paymentSlice';
import { apiSlice } from './service/api';
import { authApi } from './service/authApi';
import { courseApi } from './service/courseApi';
import { paymentApi } from './service/paymentApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    payment: paymentReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authApi.middleware,
      courseApi.middleware,
      paymentApi.middleware
    ),
  devTools: true,
});

export default store;
