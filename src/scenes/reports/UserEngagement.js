import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import data from './data.json';

const UserEngagement = () => {
  const engagementData = data.userEngagementData;

  return (
    <div style={{
      margin: '1em',
      padding: '1em',
      borderRadius: '.5em',
      boxShadow: '2px 2px 50px 2px rgb(125, 125, 125, 0.2)',
      flexGrow: '1',
      minWidth: '320px',
      width: '500px'

    }}>
      <h2 style={{
        padding: '0 .5em',
        fontSize: '1em',
        margin: '1em 0',
        fontFamily: 'Inter, sans-serif',
      }}>User Engagement Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={engagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="activeUsers" fill="#8884d8" />
          <Bar dataKey="newUsers" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;
