import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return ""
    }
  },
});

export const { showNotification, hideNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
