import { Box, Button, /*useTheme*/ } from "@mui/material";
// import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import BotPerformance from "../../components/BotPerformance";
import UserEngagement from "../../components/UserEngagement";
import Reports from "../../components/RPAdashboard";

const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header title="Reports" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: isNonMobile ? "10px 20px" : ".5em",
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
            gridTemplateColumns: isNonMobile
              ? "repeat(2, 1fr)"
              : "repeat(1, 1fr)",
            gridTemplateRows: "auto auto", // Two rows, auto-sized to fit content
            gap: "1em",
            width: "100%",
            "& > :nth-of-type(3)": {
              gridColumn: "1 / -1",
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
