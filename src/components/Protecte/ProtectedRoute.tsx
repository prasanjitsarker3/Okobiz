import React from "react";
import { Navigate } from "react-router-dom";
import { userInfo } from "../UtlisFunction/authentication";

const ProtectedRoute = ({ children }) => {
  const user = userInfo();
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
