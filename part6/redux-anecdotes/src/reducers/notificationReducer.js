import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationReducer.actions;

export const showNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, time * 1000);
  };
};

export default notificationReducer.reducer;
