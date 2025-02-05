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
        marginBottom: "12px",
      }}
    >
      <Typography variant="subtitle1" sx={{ color: colors.grey[200] }}>
        {label}:
      </Typography>
      {typeof value === "string" ? (
        <Typography
          variant="body1"
          sx={{
            color:
              color === "success"
                ? "#4caf50"
                : color === "error"
                ? "#f44336"
                : colors.grey[100],
            fontWeight: 500, // Numeric value for medium weight
          }}
        >
          {value || "N/A"}
        </Typography>
      ) : (
        value // Handle non-string value properly
      )}
    </Box>
  );
};

export default DetailItem;
