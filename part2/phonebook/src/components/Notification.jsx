const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={type === "error" ? "error" : "correct"}>{message}</div>
  );
};

export default Notification;
