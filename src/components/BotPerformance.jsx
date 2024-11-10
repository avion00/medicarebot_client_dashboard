import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "../data/ReportData.json";
import { tokens } from "../theme";

const BotPerformance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const performanceData = data.performanceData[0].data;

  return (
    <Box
      sx={{
        color: colors.grey[100],
        minWidth: "300px",
        flexGrow: "1",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: colors.grey[100],
          margin: "1em 0",
        }}
      >
        Bot Performance Overview
      </Typography>
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{
          backgroundColor: colors.primary[400],
          padding: "2em .5em 1em 0",
        }}
      >
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="2 2" stroke={colors.grey[100]} />
          <XAxis dataKey="name" stroke={colors.greenAccent[100]} />
          <YAxis stroke={colors.grey[100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.blueAccent[700],
              border: `1px solid ${colors.grey[700]}`,
              borderRadius: ".5em",
              fontSize: "12px",
              color: colors.grey[100],
            }}
            itemStyle={{ color: colors.textPrimary }}
          />
          <Line
            type="monotone"
            dataKey="responses"
            stroke={colors.blueAccent[500]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke={colors.greenAccent[500]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BotPerformance;
