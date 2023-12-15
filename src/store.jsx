import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import paymentReducer from './slices/paymentSlice';
import userReducer from './slices/userSlice';
import { apiSlice } from './service/api';
import { authApi } from './service/authApi';
import { courseApi } from './service/courseApi';
import { paymentApi } from './service/paymentApi';
import { userApi } from './service/userApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    payment: paymentReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authApi.middleware,
      courseApi.middleware,
      paymentApi.middleware,
      userApi.middleware
    ),
  devTools: true,
});

export default store;
