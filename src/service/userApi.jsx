import { apiSlice } from './api';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useFetchUserQuery } = userApi;
