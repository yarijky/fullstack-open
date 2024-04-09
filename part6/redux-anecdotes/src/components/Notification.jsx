import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const initialNotification = useSelector((state) => {
    return state.notification;
  });

  useEffect(() => {
    if (initialNotification === "") {
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
  },[dispatch, initialNotification]);

  const style = {
    border: "solid",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
  };

  return (
    initialNotification !== "" && <div style={style}>{initialNotification}</div>
  );
};

export default Notification;
