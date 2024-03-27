import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ onRouteChange, currentRoute }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {currentRoute !== "signIn" ? (
        <ProfileIcon onRouteChange={onRouteChange} />
      ) : (
        <p></p>
      )}
    </nav>
  );
};

export default Navigation;
