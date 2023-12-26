import { apiSlice } from "./api";

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: ({ id, newModule }) => {
        const formData = new FormData();
        Object.entries(newModule).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: `/course/${id}`,
          method: "POST",
          body: newModule,
        };
      },
    }),
    updateModule: builder.mutation({
      query: ({ id, updatedModule }) => {
        return {
          url: `/chapter/${id}`,
          method: "PATCH",
          body: updatedModule,
        };
      },
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
