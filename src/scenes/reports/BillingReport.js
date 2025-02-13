import React from "react";
import data from "./data.json";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const BillingReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { billingData } = data;

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        padding: "1em",
        borderRadius: "8px",
        // boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        // minWidth: "320px",
        // flexGrow: 1,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        px={3}
        py={2}
        color={colors.grey[100]}
      >
        Billing Report
      </Typography>
      <Box
        sx={{
          maxHeight: "365px",
          overflowY: "auto",
          borderRadius: "4px",
          backgroundColor: colors.primary[500],
        }}
      >
        {billingData.map(({ date, amount }, index) => (
          <Box
            key={index}
            sx={{
              padding: " 1.25em",
              borderBottom:
                index !== billingData.length - 1
                  ? `1px solid ${colors.grey[700]}`
                  : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              color={colors.grey[100]}
            >
              {date}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              color={colors.grey[200]}
            >
              ${amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BillingReport;
