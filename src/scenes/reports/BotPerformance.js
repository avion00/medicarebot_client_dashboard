import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import data from './data.json';

const BotPerformance = () => {
  const performanceData = data.performanceData[0].data;

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
      <h6 style={{
        padding: '0 .5em',
        fontSize: '1em',
        margin: '1em 0',
        fontFamily: 'Inter, sans-serif',
      }}>Bot Performance Overview</h6>
      <ResponsiveContainer height={300}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="responses" stroke="#8884d8" />
          <Line type="monotone" dataKey="successRate" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BotPerformance;
