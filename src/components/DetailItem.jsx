import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";


const DetailItem = ({ label, value, color }) => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px", // Consistent padding
        backgroundColor: colors.primary[500], // Slightly lighter background
        borderRadius: "8px", // Smooth rounded corners
        border: `1px solid rgba(255, 255, 255, 0.1)`, // Subtle border
        gap: 2
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: colors.grey[100],
          fontWeight: "500",
          // border: "1px solid red",
          minWidth: "30%",
        }}
      >
        {label}:
      </Typography>
      {typeof value === "string" ? (
        <Typography
          variant="body1"
          sx={{
            color:
              color === "success"
                ? colors.greenAccent[400]
                : color === "error"
                ? colors.redAccent[400]
                : colors.grey[100],
            fontWeight: "500",
          }}
        >
          {value || "N/A"}
        </Typography>
      ) : (
        value
      )}
    </Box>
  );
};

export default DetailItem;
