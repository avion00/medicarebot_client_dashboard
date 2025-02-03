import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PauseIcon from "@mui/icons-material/Pause";

const CallingPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for call controls
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callDuration, setCallDuration] = useState(0); // Call duration in seconds

  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format call duration (MM:SS)
  const formatCallDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Hang up the call
  const handleHangUp = () => {
    alert("Call ended.");
    // Add logic to end the call (e.g., close WebSocket connection, etc.)
  };

  const handlePaused = () => {
    alert("Call paused");
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header
          title="BOT CALL CENTER"
          subtitle="Bot Directly Call the Partners"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            borderRadius: "25px",
            padding: "20px",
            width: "350px",
            textAlign: "center",
            background: colors.primary[600],
          }}
        >
          {/* Caller Information */}
          <Box sx={{ marginBottom: "20px" }}>
            <Avatar
              src="https://via.placeholder.com/150" 
              sx={{ width: 100, height: 100, margin: "0 auto" }}
            />
            <Typography
              variant="h5"
              sx={{ marginTop: "10px", fontWeight: "bold" }}
            >
              Bot Name
            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey[300] }}>
              Bot ID: 71903387-4125-4e38-beb5-c617f3ddc116
            </Typography>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              {formatCallDuration(callDuration)}
            </Typography>
          </Box>

          {/* Real Person Representation */}
          <Box
            sx={{
              background: colors.blueAccent[800],
              borderRadius: "15px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <Avatar
              src="https://via.placeholder.com/150" // Replace with real person's bot image URL
              sx={{ width: 60, height: 60, margin: "0 auto" }}
            />
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              Real Person Bot
            </Typography>
            <Typography variant="body2" sx={{ color: colors.grey[300] }}>
              Bot ID: 12345678-1234-1234-1234-123456789012
            </Typography>
          </Box>

          {/* Call Controls */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <IconButton
                onClick={() => setIsMuted(!isMuted)}
                sx={{
                  color: isMuted ? colors.redAccent[500] : colors.grey[100],
                }}
              >
                {isMuted ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                sx={{
                  color: isSpeakerOn
                    ? colors.greenAccent[500]
                    : colors.grey[100],
                }}
              >
                {isSpeakerOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => setIsOnHold(!isOnHold)}
                sx={{
                  color: isOnHold ? colors.orangeAccent[500] : colors.grey[100],
                }}
              >
                <PauseIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* Hang Up Button */}
          <Button
            variant="contained"
            startIcon={<CallEndIcon />}
            sx={{
              marginTop: "20px",
              background: colors.redAccent[500],
              "&:hover": { background: colors.redAccent[700] },
              borderRadius: "20px",
              padding: "10px 20px",
            }}
            onClick={handleHangUp}
          >
            Hang Up
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CallingPage;
