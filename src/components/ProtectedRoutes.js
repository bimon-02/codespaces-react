// ProtectedRoutes.js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // Replace with your authentication logic
  let auth = { token: false };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
