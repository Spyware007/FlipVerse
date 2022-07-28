import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userAuthContext } from "../Contexts";

export const SellerPrivateRoute = ({ children }) => {
  const { isUserAuthenticated } = useContext(userAuthContext);
  if (isUserAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
export default SellerPrivateRoute;
