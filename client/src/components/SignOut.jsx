import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { LogOutOutline } from "react-ionicons";



export const SignOut = () => {
  const { handleLogout } = useContext(UserContext);

  return (
    <LogOutOutline
        color={"#f0ad4e"}
        height="32px"
        width="32px"
        onClick={handleLogout}
    />
  );
};
