import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../stores/index.ts";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/account/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
