import { apiSlice } from "./api";

export const chapterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchChapters: builder.query({
      query: () => "/course/chapter",
    }),
    fetchChapterById: builder.query({
      query: (id) => `/course/chapter/${id}`,
    }),
    createChapter: builder.mutation({
      query: (newChapter) => {
        const formData = new FormData();
        Object.entries(newChapter).forEach(([key, value]) => {
          formData.append(key, value);
        });
        console.log("Data Sebelum Dikirim:", newChapter);
        return {
          url: "/course/chapter",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newChapter),
          // validateStatus: (response, result) =>
          //   response.status === 200 && !result.isError,
        };
      },
    }),
    updateChapter: builder.mutation({
      query: ({ id, updatedChapter }) => {
        const formData = new FormData();
        Object.entries(updatedChapter).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: `/course/chapter/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/course/chapter/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchChaptersQuery,
  useFetchChapterByIdQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApi;
