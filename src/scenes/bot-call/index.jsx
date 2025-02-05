import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Grid,
  Paper,
  InputBase,
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
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CallingPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for call controls
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Ref to store the interval ID
  const timerRef = useRef(null);

  // Simulate call duration timer
  useEffect(() => {
    if (!isOnHold) {
      clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isOnHold]);

  const formatCallDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Hang up the call
  const handleHangUp = () => {
    clearInterval(timerRef.current);
    alert("Call ended.");
  };

  const handlePause = () => {
    setIsOnHold((prev) => !prev);
  };

  const [botSearch, setBotSearch] = useState("");

  const handleSearchBotChange = (e) => {
    setBotSearch(e.target.value);
  };

  const handleSearchBotChat = () => {
    console.log("Search Bot Chat Clicked");
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const filterRef = useRef(null);

  // live session --- 3rd paper
  // Sample conversation data
  const [conversation, setConversation] = useState([
    { sender: "Person A", message: "Hello, how  asf asf esa df as ef as  you?", time: "10:00 AM" },
    {
      sender: "Person B",
      message: "I'm good, thank you! How about you?",
      time: "10:01 AM",
    },
    { sender: "Person A", message: "I'm doing great!", time: "10:02 AM" },
  ]);

  // Simulate live updates to the conversation
  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new message to the conversation
      setConversation((prev) => [
        ...prev,
        {
          sender: Math.random() > 0.5 ? "Person A" : "Person B",
          message: "This is a new message.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 5000); // Add a new message every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

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
          // alignItems: "center",
          gap: "20px",
        }}
      >
        <Paper
          sx={{
            flex: "1",
            height: "67dvh",
            backgroundColor: colors.primary[400],
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                justifyContent: "space-between",
                padding: "0 1em",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ flex: 0.7, padding: "1em .5em", position: "relative" }}
              >
                <Box
                  sx={{
                    width: " 100%",
                  }}
                >
                  <Box
                    display="flex"
                    flex="1"
                    borderRadius="25px"
                    flexGrow="grow"
                    sx={{
                      border: `2px solid white`,
                      paddingRight: "2.5em",
                      backgroundColor: "#e6e6e6",
                      "&:focus-within": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <InputBase
                      sx={{
                        ml: 2,
                        mr: 2,
                        flexGrow: "grow",
                        p: " .25em .5em",
                        color: "#000",
                        width: "100%",
                      }}
                      placeholder="Type here to Search Gmail Bot"
                      value={botSearch}
                      onChange={handleSearchBotChange}
                      // onKeyPress={handleKeyPress}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: "2em",
                    bottom: "1.5em",
                    opacity: ".5",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    borderRadius: "50%",
                    background: "transparent",
                  }}
                  onClick={handleSearchBotChat}
                >
                  <SearchIcon sx={{ color: "#000", fontSize: "24px" }} />
                </Box>
              </Box>

              <Box
                onClick={handleFilterClick}
                sx={{
                  flex: 0.25,
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    background: "linear-gradient(45deg, #062994, #0E72E1)",
                    color: "#fff",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5em",
                  }}
                >
                  <FilterAltIcon />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="center"
                    width="60px"
                  >
                    Filter By
                  </Typography>
                  <ArrowDropDownIcon />
                </IconButton>

                {/* Filter options box */}
                {isOpen && (
                  <Box
                    ref={filterRef} // Assign ref to the filter dropdown box
                    sx={{
                      border: `1px solid ${colors.grey[600]}`,
                      borderRadius: "8px",
                      position: "absolute",
                      top: "3em",
                      left: "0",
                      width: "100%",
                      background: colors.primary[400],
                      padding: ".5em 0",
                      overflow: "hidden",
                      zIndex: "10"
                    }}
                  >
                    <Typography
                      sx={{
                        background: colors.primary[400],
                        padding: ".5em 1em",
                        cursor: "pointer",
                        transition: "all .4s ease-out",
                        "&:hover": {
                          background: colors.primary[500],
                        },
                      }}
                    >
                      Interaction Type
                    </Typography>
                    <Typography
                      sx={{
                        background: colors.primary[400],
                        padding: ".5em 1em",
                        cursor: "pointer",
                        transition: "all .4s ease-out",
                        "&:hover": {
                          background: colors.primary[500],
                        },
                      }}
                    >
                      Channel
                    </Typography>
                    <Typography
                      sx={{
                        background: colors.primary[400],
                        padding: ".5em 1em",
                        cursor: "pointer",
                        transition: "all .4s ease-out",
                        "&:hover": {
                          background: colors.primary[500],
                        },
                      }}
                    >
                      Timestamp
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ overflow: "auto", height: "58vh" }}>
              {/* person */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: colors.primary[400],
                  borderBottom: `2px solid ${colors.primary[500]}`,
                  padding: "1em 2em",
                  transition: "all .2s ease-out",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: colors.grey[900],
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "1em",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`../../assets/user.png`}
                      alt="Logo"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
                      John Smith
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: ".5em",
                      }}
                    >
                      <Typography
                        variant="h6"
                        lineHeight="1.4"
                        color={colors.grey[200]}
                      >
                        20 min ago
                      </Typography>
                      <Box
                        style={{
                          width: "25px",
                          height: "22px",
                          background:
                            "linear-gradient(45deg, #062994, #0E72E1)",
                          borderRadius: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            padding: "10px",
                            fontSize: "10px",
                            fontWeight: "500",
                            alignContent: "center",
                            color: "#fff",
                          }}
                        >
                          85
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <IconButton
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    sx={{
                      color: isSpeakerOn
                        ? colors.greenAccent[500]
                        : colors.grey[100],
                    }}
                  >
                    {isSpeakerOn ? <CallIcon /> : <CallEndIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={10}
          sx={{
            borderRadius: "25px",
            padding: "20px",
            flex: "0.75",
            textAlign: "center",
            backgroundColor: colors.primary[400],
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
                onClick={handlePause}
                sx={{
                  color: isOnHold ? colors.orangeAccent[500] : colors.grey[100],
                }}
              >
                {isOnHold ? <PlayCircleFilledIcon /> : <PauseIcon />}
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
        <Paper
          sx={{
            borderRadius: "4px",
            overflow: "hidden",
            flex: "0.85",
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              padding: "1em",
              fontWeight: "bold",
              textTransform: "uppercase",
              boxShadow: "5px 5px 20px rgb(128, 128, 128, 0.5)",
            }}
          >
            Live Session
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                height: "59dvh",
                overflowY: "auto",
                padding: "8px",
              }}
            >
              {conversation.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "Person A" ? "flex-start" : "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      padding: "10px",
                      borderRadius:
                        msg.sender === "Person A"
                          ? "10px 10px 10px 0"
                          : "10px 10px 0 10px",
                      backgroundColor:
                        msg.sender === "Person A"
                          ? colors.blueAccent[800]
                          : colors.greenAccent[800],
                      color: colors.grey[100],
                    }}
                  >
                    <Typography variant="body1">{msg.message}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: "right",
                        color: "inherit",
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CallingPage;
