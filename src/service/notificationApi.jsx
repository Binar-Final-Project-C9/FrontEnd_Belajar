import { apiSlice } from "./api";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotification: builder.query({
      query: () => "/notification",
    }),
    fetchNotificationById: builder.query({
      query: (id) => `/notification/${id}`,
    }),
    createNotification: builder.mutation({
      query: (newNotif) => {
        const formData = new FormData();
        Object.entries(newNotif).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: "/notification",
          method: "POST",
          body: newNotif,
        };
      },
    }),
    updateNotification: builder.mutation({
      query: ({ id, updatedNotif }) => {
        const formData = new FormData();
        Object.entries(updatedNotif).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: `/notification/${id}`,
          method: "PATCH",
          body: updatedNotif,
        };
      },
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
    }),
    sendPromoNotification: builder.mutation({
      query: (id) => ({
        url: `notification/send-all/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFetchNotificationQuery,
  useFetchNotificationByIdQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useSendPromoNotificationMutation,
} = notificationApi;
