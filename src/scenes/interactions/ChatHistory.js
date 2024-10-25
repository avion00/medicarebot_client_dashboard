import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const ChatHistory = ({ chatHistories }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.125em',
        backgroundColor: 'rgb(37,150,190, .2)',
        padding: '1em',
        borderRadius: '.3em .3em 0 0'
      }}>
        Chat History
      </Typography>
      <List>
        {chatHistories.map((chat, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${chat.customer}: ${chat.message}`}
              secondary={`Timestamp: ${new Date(chat.timestamp).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default ChatHistory;
