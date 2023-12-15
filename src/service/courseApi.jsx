import { apiSlice } from './api';

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCourses: builder.query({
      query: () => '/course',
    }),
    fetchCourseById: builder.query({
      query: (id) => `/course/${id}`,
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
      query: ({ id, updatedCourse }) => {
        const formData = new FormData();
        Object.entries(updatedCourse).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: `/course/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
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
  useFetchCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
