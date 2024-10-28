import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";

import data from "../data/ReportData.json";
import { tokens } from "../theme";
import { MarginOutlined } from "@mui/icons-material";


const UserEngagement = () => {
  const engagementData = data.userEngagementData;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      style={{
        color: colors.grey[100],
        minWidth: "300px",
        width: '100%',
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
        User Engagement Overview
      </Typography>
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{
          backgroundColor: colors.primary[400],
          padding: "2em .5em 1em 0",
        }}
      >
        <BarChart data={engagementData} >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="week" stroke={colors.greenAccent[100]} />
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
          <Bar dataKey="activeUsers" fill={colors.blueAccent[500]} />
          <Bar dataKey="newUsers" fill={colors.greenAccent[500]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;
