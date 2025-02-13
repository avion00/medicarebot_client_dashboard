import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import data from "./data.json";
import useMediaQuery from "@mui/material/useMediaQuery";

const BotPerformance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const performanceData = data.performanceData[0].data;

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        padding: "0 1em",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        px={3}
        py={2}
        color={colors.grey[100]}
      >
        Bot Performance Overview
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="responses"
            stroke={colors.blueAccent[500]}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke={colors.greenAccent[700]}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BotPerformance;
