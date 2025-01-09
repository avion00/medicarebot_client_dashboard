import React from "react";
import { Navigate } from "react-router-dom";

const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime; // Check expiration
  } catch {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken && isTokenValid(authToken)) {
    return children;
  }
  return <Navigate to="/logIn" />;
};

export default PrivateRoute;
