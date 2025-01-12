import React, { useEffect } from "react";
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
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      const payload = JSON.parse(atob(authToken.split(".")[1]));
      const timeUntilExpiry = payload.exp * 1000 - Date.now();

      // Set timeout to clear the token and redirect on expiration
      const timer = setTimeout(() => {
        sessionStorage.removeItem("authToken");
        window.location.href = "/logIn";
      }, timeUntilExpiry);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [authToken]);

  if (authToken && isTokenValid(authToken)) {
    return children;
  }

  return <Navigate to="/logIn" />;
};

export default PrivateRoute;
