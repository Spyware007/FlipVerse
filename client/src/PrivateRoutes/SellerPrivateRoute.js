import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { sellerAuthContext } from "../Contexts";

export const SellerPrivateRoute = ({ children }) => {
  const { isSellerAuthenticated } = useContext(sellerAuthContext);
  if (isSellerAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
export default SellerPrivateRoute;
