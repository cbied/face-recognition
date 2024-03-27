import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({
  onRouteChange,
  currentRoute,
  handleOpen,
  handleClose,
}) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {currentRoute !== "signIn" ? (
        <ProfileIcon
          onRouteChange={onRouteChange}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      ) : (
        <p></p>
      )}
    </nav>
  );
};

export default Navigation;
