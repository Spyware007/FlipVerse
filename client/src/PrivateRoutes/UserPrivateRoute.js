import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userAuthContext } from "../Contexts";

export const SellerPrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(userAuthContext);
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
export default SellerPrivateRoute;
