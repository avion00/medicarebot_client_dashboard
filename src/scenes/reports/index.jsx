import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

import React from "react";
import BotPerformance from "../../components/BotPerformance";
import UserEngagement from "../../components/UserEngagement";
import Reports from "../../components/RPAdashboard";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Reports" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
            gridTemplateRows: "auto auto", // Two rows, auto-sized to fit content
            gap: "1em",
            width: "100%",
            "& > :nth-of-type(3)": {
              // Targets the third component
              gridColumn: "1 / -1", // Spans across both columns
            },
          }}
        >
          <BotPerformance />
          <UserEngagement />
          {/* <BillingReport /> */}
          <Reports />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
