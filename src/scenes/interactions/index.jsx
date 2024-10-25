import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Tabs, Tab } from "@mui/material";
import ChatHistory from "./ChatHistory";
import CustomerLogs from "./CustomerLogs";
import OfflineMessages from "./OfflineMessages";
import data from "./data.json";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

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
        <div>
          <Typography
            variant="h4"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              padding: ".75em 1em",
              backgroundColor: "#0f3c4c",
              color: "#fff",
              margin: "0 .6em",
            }}
          >
            Interactions Management Dashboard
          </Typography>
          <Card
            style={{
              margin: " 2em 1em",
              backgroundColor: "rgb(37,150,190, .1)",
            }}
          >
            <CardContent>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Chat History" />
                <Tab label="Customer Logs" />
                <Tab label="Offline Messages" />
              </Tabs>

              <Grid container spacing={3} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                  {tabValue === 0 && (
                    <ChatHistory chatHistories={data.chatHistories} />
                  )}
                  {tabValue === 1 && (
                    <CustomerLogs customerLogs={data.customerLogs} />
                  )}
                  {tabValue === 2 && (
                    <OfflineMessages offlineMessages={data.offlineMessages} />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
