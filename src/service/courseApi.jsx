import { apiSlice } from './api';

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCourses: builder.query({
      query: () => '/course',
    }),
    createCourse: builder.mutation({
      query: (newCourse) => {
        const formData = new FormData();
        Object.entries(newCourse).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: '/course',
          method: 'POST',
          body: formData,
        };
      },
    }),
    updateCourse: builder.mutation({
      query: ({ id, updateCourse }) => ({
        url: `/course/${id}`,
        method: 'PUT',
        body: updateCourse,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
