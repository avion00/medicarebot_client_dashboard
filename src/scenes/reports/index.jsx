import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import BotPerformance from "./BotPerformance";
import UserEngagement from "./UserEngagement";
import BillingReport from "./BillingReport";
import Reports from "./Reports";

const Report = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  return (
    <Box m="20px">
      <Box>
        <Header
          title="Report and Performance Analytics"
          subtitle="You can View Your Performance and report analytices"
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="30px"
      >
        <Box gridColumn={isNonMobile ? "span 6" : "span 12"} >
          <BotPerformance />
        </Box>
        <Box gridColumn={isNonMobile ? "span 6" : "span 12"} >
          <UserEngagement />
        </Box>
        <Box gridColumn={isNonMobile ? "span 6" : "span 12"} >
          <BillingReport />
        </Box>
        <Box gridColumn={isNonMobile ? "span 6" : "span 12"} >
          <Reports />
        </Box>
      </Box>
    </Box>
  );
};

export default Report; // ✅ Added missing export
