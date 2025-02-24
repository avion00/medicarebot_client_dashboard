import React from "react";
import { Box, CircularProgress } from "@mui/material";

const GlobalLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.default", // Use theme background color
      }}
    >
      <CircularProgress color="primary" size={60} />{" "}
      {/* Add a loading spinner */}
    </Box>
  );
};

export default GlobalLoading;
