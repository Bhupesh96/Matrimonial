import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("profileID");

  if (!isLoggedIn) {
    window.dispatchEvent(new CustomEvent("open-login-modal"));
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
