import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const RecentActivities = ({ activities }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "0",
        boxShadow: "none",
        height: "400px",
        overflowY: 'auto',
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            padding: "1em",
            fontWeight: "600",
            borderBottom: `1px solid ${colors.grey[600]}`
          }}
        >
          Recent Activities
          </Typography>
        <List>
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={activity.description}
                secondary={activity.time}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
