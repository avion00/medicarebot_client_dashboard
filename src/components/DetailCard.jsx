import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const DetailCard = ({ title, icon, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        // backgroundColor: colors.blueAccent[900], // Slightly lighter than the background
        borderRadius: "12px", // Smooth rounded corners
        padding: "20px", // Consistent padding
        
        // boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)", // Subtle shadow
        // border: `1px solid rgba(255, 255, 255, 0.1)`, // Subtle border
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {icon}
        <Typography
          variant="h6"
          sx={{
            color: colors.grey[100],
            fontWeight: "600", 
            fontSize: "1.25rem", 
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default DetailCard;
