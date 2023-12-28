import { apiSlice } from "./api";

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (newModule) => {
        console.log(newModule);
        const formData = new FormData();
        Object.entries(newModule).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: `/module`,
          method: "POST",
          body: formData,
        };
      },
    }),
    updateModule: builder.mutation({
      query: ({ id, updatedModule }) => {
        const formData = new FormData();
        Object.entries(updatedModule).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: `/module/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/module/${id}`,
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
