import { useState, useEffect } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({ title, subtitle, titleFontSize, subtitleFontSize }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <SkeletonTheme
      baseColor={theme.palette.mode === "dark" ? "#333" : "#e0e0e0"}
      highlightColor={theme.palette.mode === "dark" ? "#444" : "#f5f5f5"}
    >
      <Box
        sx={{
          mb: isNonMobile ? "30px" : "1em",
        }}
      >
        <Typography
          variant="h2"
          fontSize={titleFontSize || (isNonMobile ? undefined : "1.5em")}
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {loading ? <Skeleton width={220} /> : title}
        </Typography>
        <Typography
          fontSize={subtitleFontSize || (isNonMobile ? undefined : "1em")}
          variant="h5"
          color={colors.blueAccent[400]}
        >
          {loading ? <Skeleton width={320} /> : subtitle}
        </Typography>
      </Box>
    </SkeletonTheme>
  );
};

export default Header;
