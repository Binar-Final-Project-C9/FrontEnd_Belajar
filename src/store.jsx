import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import paymentReducer from "./slices/paymentSlice";
import userReducer from "./slices/userSlice";
import chapterReducer from "./slices/chapterSlice";
import moduleReducer from "./slices/moduleSlice";
import notificationReducer from "./slices/notificationSlice";
import { apiSlice } from "./service/api";
import { authApi } from "./service/authApi";
import { courseApi } from "./service/courseApi";
import { paymentApi } from "./service/paymentApi";
import { userApi } from "./service/userApi";
import { chapterApi } from "./service/chapterApi";
import { moduleApi } from "./service/moduleApi";
import { notificationApi } from "./service/notificationApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    payment: paymentReducer,
    user: userReducer,
    chapter: chapterReducer,
    module: moduleReducer,
    notification: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [moduleApi.reducerPath]: moduleApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authApi.middleware,
      courseApi.middleware,
      paymentApi.middleware,
      userApi.middleware,
      chapterApi.middleware,
      moduleApi.middleware,
      notificationApi.middleware
    ),
  devTools: true,
});

export default store;
