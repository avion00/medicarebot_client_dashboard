import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab
} from '@mui/material';
import ChatHistory from './ChatHistory';
import CustomerLogs from './CustomerLogs';
import OfflineMessages from './OfflineMessages';
import data from './data.json';

const InteractionsDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Typography variant="h4" style={{
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '.75em 1em',
        backgroundColor: '#0f3c4c',
        color: '#fff',
        margin: '0 .6em',
      }}>
        Interactions Management Dashboard
      </Typography>
      <Card style={{
        margin: ' 2em 1em',
        backgroundColor: 'rgb(37,150,190, .1)'
      }}>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Chat History" />
            <Tab label="Customer Logs" />
            <Tab label="Offline Messages" />
          </Tabs>

          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              {tabValue === 0 && <ChatHistory chatHistories={data.chatHistories} />}
              {tabValue === 1 && <CustomerLogs customerLogs={data.customerLogs} />}
              {tabValue === 2 && <OfflineMessages offlineMessages={data.offlineMessages} />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractionsDashboard;
