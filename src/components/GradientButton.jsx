import { Button, Box, useMediaQuery } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";

const GradientButton = ({ text, icon, onClick, sx, fullWidth = false }) => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        // 🔥 Skeleton loads both icon & text
        <Box display="flex" alignItems="center" gap="8px">
          {/* <Skeleton circle width={24} height={24} /> */}
          <Skeleton width={fullWidth ? "100%" : 150} height={"44px"} />
        </Box>
      ) : (
        <Button
          onClick={onClick}
          sx={{
            background: "linear-gradient(45deg, #062994, #0E72E1)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            width: fullWidth ? "100%" : "auto",
            mb: isNonMobile ? "0em" : "1em",
            transition: "all 0.5s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            "&:hover": { opacity: ".7" },
            ...sx,
          }}
        >
          {icon}
          {text}
        </Button>
      )}
    </Box>
  );
};

export default GradientButton;
