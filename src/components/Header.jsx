import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = ({ title, subtitle, titleFontSize, subtitleFontSize }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  return (
    <Box
      sx={{
        mb: isNonMobile ? "30px" : "1em",
      }}
    >
      <Typography
        variant="h2"
        fontSize={titleFontSize || (isNonMobile ? undefined : "1.5em")} // Use prop or default
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        fontSize={subtitleFontSize || (isNonMobile ? undefined : "1em")} // Use prop or default
        variant="h5"
        color={colors.blueAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
