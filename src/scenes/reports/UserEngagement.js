import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import data from './data.json';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const UserEngagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const engagementData = data.userEngagementData;

  return (
    <Box
      style={{
        // border: '1px solid red',
        backgroundColor: colors.primary[400],
        padding: '0 1em',
        borderRadius: '8px'
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        px={3}
        py={2}
        color={colors.grey[100]}
      >
        User Engagement Overview
      </Typography>
      <ResponsiveContainer width="100%" height={300} >
        <BarChart data={engagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="activeUsers" fill="#8884d8" />
          <Bar dataKey="newUsers" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default UserEngagement;
