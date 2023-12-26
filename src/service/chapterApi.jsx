import { apiSlice } from "./api";

export const chapterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchChapters: builder.query({
      query: () => "/chapter",
    }),
    fetchChapterById: builder.query({
      query: (id) => `/chapter/${id}`,
    }),
    fetchChapterByCourseId: builder.query({
      query: (id) => `/chapter/course/${id}`,
    }),
    createChapter: builder.mutation({
      query: (newChapter) => {
        const formData = new FormData();
        Object.entries(newChapter).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: "/chapter",
          method: "POST",
          body: newChapter,
        };
      },
    }),
    updateChapter: builder.mutation({
      query: ({ id, updatedChapter }) => {
        return {
          url: `/chapter/${id}`,
          method: "PATCH",
          body: updatedChapter,
        };
      },
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/chapter/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchChaptersQuery,
  useFetchChapterByIdQuery,
  useFetchChapterByCourseIdQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApi;
