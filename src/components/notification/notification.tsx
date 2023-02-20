import { useState } from "react";
import NotificationIcon from "src/assets/svgs/notification";

const Notification = () => {
  const [hasUnreadNotification, setUnreadNotification] =
    useState<boolean>(true);
  return (
    <div
      style={{ cursor: "pointer", position: "relative" }}
      className="notification-icon">
      {hasUnreadNotification && (
        <div
          className="unread-notification"
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            backgroundColor: "#f03738",
            position: "absolute",
            top: -2,
            right: -5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <span
            style={{
              display: "block",
              borderRadius: "50%",
              padding: 3,
              backgroundColor: "white",
            }}></span>
        </div>
      )}
      <NotificationIcon />
    </div>
  );
};
export default Notification;
