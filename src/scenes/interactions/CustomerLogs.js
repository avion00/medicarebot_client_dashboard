import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const CustomerLogs = ({ customerLogs }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.125em',
        backgroundColor: 'rgb(37,150,190, .2)',
        padding: '1em',
        borderRadius: '.3em .3em 0 0'
      }}>
        Customer Logs
      </Typography>
      <List>
        {customerLogs.map((log, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${log.customer} - ${log.action}`}
              secondary={`Timestamp: ${new Date(log.timestamp).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default CustomerLogs;
