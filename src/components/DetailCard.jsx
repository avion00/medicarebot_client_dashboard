import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const DetailCard = ({ title, icon, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[500],
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        // border: '1px solid red'
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ color: colors.grey[100], fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ marginTop: "8px" }}>{children}</Box>
    </Box>
  );
};

export default DetailCard;
