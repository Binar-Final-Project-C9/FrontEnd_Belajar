import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: {},
  promoNotificationStatus: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.items = action.payload.data.notif;
    },
    addNotification(state, action) {
      state.items.push(action.payload.data.newNotif);
    },
    setNotificationById(state, action) {
      state.item = action.payload.data.notif;
    },
    updateNotification(state, action) {
      const { id, updatedNotif } = action.payload;
      const notificationIndex = state.items.findIndex(
        (notification) => notification.id === id
      );
      if (notificationIndex !== -1) {
        state.items[notificationIndex] = {
          ...state.items[notificationIndex],
          ...updatedNotif,
        };
      }
    },
    removeNotification(state, action) {
      const notificationId = action.payload;
      state.items = state.items.filter(
        (notification) => notification.id !== notificationId
      );
    },
    sendPromoNotificationSuccess(state) {
      state.promoNotificationStatus = "success";
    },
    sendPromoNotificationFailure(state) {
      state.promoNotificationStatus = "failure";
    },
    resetPromoNotificationStatus(state) {
      state.promoNotificationStatus = null;
    },
  },
});

export const {
  setNotification,
  setNotificationById,
  addNotification,
  updateNotification,
  removeNotification,
  sendPromoNotificationSuccess,
  sendPromoNotificationFailure,
  resetPromoNotificationStatus,
} = notificationSlice.actions;
export default notificationSlice.reducer;
