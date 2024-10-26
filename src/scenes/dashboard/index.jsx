import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RecentActivities from "../../components/RecentActivities";
import CustomizeGraph from "../../components/CustomizeGraph";
import BotPerformanceData from "../../data/botPerformanceData.json";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bots, setBots] = useState([]);
  const [selectedBotId, setSelectedBotId] = useState(1);
  const [selectedBotData, setSelectedBotData] = useState({});
  const [customizing, setCustomizing] = useState(false);

  useEffect(() => {
    setBots(BotPerformanceData.bots || []);
  }, []);

  // Update the selected bot's data when a new bot is selected
  useEffect(() => {
    const selectedBot = bots.find((bot) => bot.id === selectedBotId);
    if (selectedBot) {
      setSelectedBotData(selectedBot);
    }
  }, [selectedBotId, bots]);

  const handleBotSelectionChange = (event) => {
    setSelectedBotId(event.target.value);
  };

  const toggleCustomizeView = () => {
    setCustomizing(!customizing);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={toggleCustomizeView}
          >
            {customizing ? (
              <ArrowBackIcon sx={{ mr: "10px" }} />
            ) : (
              <TuneIcon sx={{ mr: "10px" }} />
            )}
            {customizing
              ? "Back to Dashboard"
              : `Customize ${selectedBotData?.name}'s Graph`}
          </Button>
        </Box>
      </Box>
      <Box mt="1em">
        <FormControl
          fullWidth
          sx={{
            marginBottom: "1em",
            transition: "all .3s ease",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.grey[600],
              },
              "&:hover fieldset": {
                borderColor: colors.greenAccent[700],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[700],
                borderWidth: "1px",
              },
              "&.MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[300],
              },
            },
          }}
        >
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: colors.greenAccent[400],
              fontWeight: "bold",
              backgroundColor: colors.primary[400],
              fontSize: "15px",
              margin: ".1em",
              padding: "0 .5em",
              "&.Mui-focused": {
                color: colors.primary[100],
              },
            }}
          >
            Select a Bot
          </InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select a Bot"
            value={selectedBotId}
            onChange={handleBotSelectionChange}
            sx={{
              width: "30%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[300],
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.greenAccent[700],
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.greenAccent[700],
                borderWidth: "2px",
              },
            }}
          >
            {bots.map((bot) => (
              <MenuItem key={bot.id} value={bot.id}>
                {bot.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {!customizing ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    backgroundColor: colors.primary[400],
                    borderRadius: "0",
                    boxShadow: "none",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        padding: "1em",
                        fontWeight: "600",
                        borderBottom: `1px solid ${colors.grey[600]}`,
                      }}
                    >
                      Bots Performance Overview
                    </Typography>
                    {/* Check if performanceData exists before rendering */}
                    {selectedBotData?.performanceData ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={selectedBotData.performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="responses"
                            stroke="red"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="successRate"
                            stroke="red"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <Typography>
                        No performance data available for this bot.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Activities */}
              <Grid item xs={12} md={4}>
                <RecentActivities
                  activities={selectedBotData?.recentActivities || []}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <CustomizeGraph
            onBack={toggleCustomizeView}
            botData={selectedBotData}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
