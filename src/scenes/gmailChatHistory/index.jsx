import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  useTheme,
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const GmailChatHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = sessionStorage.getItem("authToken");

  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  // const [bots, setBots] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedBot, setSelectedBot] = useState("");
  const [selectedLead, setSelectedLead] = useState("");
  const [loading, setLoading] = useState({
    bots: false,
    leads: false,
    conversations: false,
  });
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const endRef = useRef(null);

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [bots, setBots] = useState([]);

  // Fetch bots on component mount
  useEffect(() => {
    const fetchBots = async () => {
      try {
        setLoading((prev) => ({ ...prev, bots: true }));
        const response = await axios.get("https://app.buy2rent.eu/list-bots", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.bots) {
          // Store both bot_id and bot_name
          const botData = response.data.bots.map((bot) => ({
            id: bot.bot_id,
            name: bot.name || `Bot ${bot.bot_id.substring(0, 4)}`, // Fallback to partial ID if no name
          }));
          setBots(botData);
          if (botData.length > 0) {
            setSelectedBot(botData[0].id); // Still store the ID
          } else {
            setSnackbar({
              open: true,
              message: "No bots available. Please create a bot first.",
              severity: "warning",
            });
          }
        }
      } catch (err) {
        setError(err.message);
        setSnackbar({
          open: true,
          message: "Failed to load bots. Please try again.",
          severity: "error",
        });
        console.error("Error fetching bots:", err);
      } finally {
        setLoading((prev) => ({ ...prev, bots: false }));
      }
    };

    fetchBots();
  }, [token]);

  // Fetch leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading((prev) => ({ ...prev, leads: true }));
        const response = await axios.get("https://app.buy2rent.eu/list-leads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "success") {
          let leadsData = response.data.leads;
          if (Array.isArray(leadsData) && Array.isArray(leadsData[0])) {
            leadsData = leadsData[0];
          }
          setLeads(leadsData);
          if (leadsData.length > 0) {
            setSelectedLead(leadsData[0].id);
          } else {
            setSnackbar({
              open: true,
              message: "No leads available. Please add leads first.",
              severity: "warning",
            });
          }
        }
      } catch (err) {
        setError(err.message);
        setSnackbar({
          open: true,
          message: "Failed to load leads. Please try again.",
          severity: "error",
        });
        console.error("Error fetching leads:", err);
      } finally {
        setLoading((prev) => ({ ...prev, leads: false }));
      }
    };

    fetchLeads();
  }, [token]);

  // Fetch conversations when bot or lead changes
  useEffect(() => {
    const fetchConversations = async () => {
      if (!selectedBot || !selectedLead) return;

      try {
        setLoading((prev) => ({ ...prev, conversations: true }));
        const response = await axios.get(
          `https://app.medicarebot.live/view_conversation/${selectedBot}/${selectedLead}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.conversations) {
          const formattedConversations = response.data.conversations.map(
            (conv, index) => ({
              id: `${selectedBot}-${selectedLead}-${index}`,
              userName: "Lead",
              userEmail: selectedLead,
              lastMessage: conv.email_content
                ? conv.email_content.substring(0, 50) + "..."
                : "No content",
              messages: [
                {
                  sender: "bot",
                  message: conv.email_content,
                  timestamp: conv.sent_at,
                },
                ...(conv.reply_content
                  ? [
                      {
                        sender: "lead",
                        message: conv.reply_content,
                        timestamp: conv.sent_at,
                      },
                    ]
                  : []),
              ],
              timestamp: conv.sent_at,
              subject: conv.subject,
            })
          );

          setConversations(formattedConversations);
          setFilteredConversations(formattedConversations);

          if (formattedConversations.length === 0) {
            setSnackbar({
              open: true,
              message:
                "No conversations found. Please initiate a conversation.",
              severity: "info",
            });
          }
        } else {
          setSnackbar({
            open: true,
            message: "No conversations found for this bot and lead.",
            severity: "info",
          });
        }
      } catch (err) {
        setError(err.message);
        setSnackbar({
          open: true,
          message: "Failed to load conversations. Please try again.",
          severity: "error",
        });
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading((prev) => ({ ...prev, conversations: false }));
      }
    };

    fetchConversations();
  }, [selectedBot, selectedLead, token]);

  // Scroll chat to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat]);

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const updated = conversations.map((c) => {
      if (c.id === selectedChat.id) {
        const updatedMsgs = [
          ...c.messages,
          {
            sender: "user",
            message: newMessage,
            timestamp: new Date().toISOString(),
          },
          {
            sender: "bot",
            message: "Automated reply from bot.",
            timestamp: new Date().toISOString(),
          },
        ];
        return {
          ...c,
          messages: updatedMsgs,
          lastMessage: newMessage.substring(0, 50) + "...",
        };
      }
      return c;
    });

    setConversations(updated);
    setFilteredConversations(updated);
    setSelectedChat(updated.find((c) => c.id === selectedChat.id));
    setNewMessage("");
    setSnackbar({
      open: true,
      message: "Message sent successfully!",
      severity: "success",
    });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + formatDate(dateString);
  };

  const getLeadName = (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    return lead?.name || lead?.email || `Lead ${leadId}`;
  };

  return (
    <Box m="20px">
      <Header
        title="GMAIL CHAT HISTORY"
        subtitle="View conversations between bots and leads"
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          height: "calc(100vh - 245px)",
        }}
      >
        {/* Conversations List */}
        <Box
          sx={{
            flex: isMobile ? (selectedChat ? 0 : 1) : 1,
            display: isMobile && selectedChat ? "none" : "flex",
            flexDirection: "column",
            backgroundColor:
              theme.palette.mode === "dark" ? "#1F2C33" : "#FFFFFF",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: `1px solid ${
              theme.palette.mode === "dark" ? "#374248" : "#e9edef"
            }`,
          }}
        >
          {/* Filter Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 2.5,
              gap: 2,
              background: "linear-gradient(65deg, #062994, #0E72E1)",
              // theme.palette.mode === "dark" ? "#1F2C33" : "#F0F2F5",
              borderBottom: colors.blueAccent[200],
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  // color: theme.palette.mode === "dark" ? "#8696A0" : "#54656F",
                  color: "white",
                  "&.Mui-focused": {
                    color: colors.blueAccent[300],
                  },
                }}
              >
                Bots
              </InputLabel>
              <Select
                value={selectedBot}
                onChange={(e) => setSelectedBot(e.target.value)}
                label="Bot"
                sx={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#fff",
                  border: `1px solid #0E72E1`,
                  "& .MuiSelect-icon": {
                    color:
                      theme.palette.mode === "dark" ? "#a4a9fc" : "#0E72E1",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark" ? "#a4a9fc" : "#0E72E1",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark" ? "#a4a9fc" : "#0E72E1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a4a9fc",
                    borderWidth: "1px",
                  },
                }}
              >
                {bots.map((bot) => (
                  <MenuItem
                    key={bot.id}
                    value={bot.id}
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#0E72E1" : "#F5F6F6",
                      },
                      "&.Mui-selected": {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#151632" : "#DCF8C6",
                      },
                    }}
                  >
                    {bot.name}
                  </MenuItem>
                ))}
                {bots.length === 0 && (
                  <MenuItem disabled>No bots available</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  color: "white",
                  "&.Mui-focused": {
                    color: colors.blueAccent[300],
                  },
                }}
              >
                Lead
              </InputLabel>
              <Select
                value={selectedLead}
                onChange={(e) => setSelectedLead(e.target.value)}
                label="Lead"
                sx={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#fff",
                  border: `1px solid #0E72E1`,
                  "& .MuiSelect-icon": {
                    color:
                      theme.palette.mode === "dark" ? "#a4a9fc" : "#0E72E1",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark" ? "#a4a9fc" : "#0E72E1",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark" ? "#a4a9fc" : "#0E72E1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a4a9fc",
                    borderWidth: "1px",
                  },
                }}
              >
                {leads.map((lead) => (
                  <MenuItem
                    key={lead.id}
                    value={lead.id}
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#0E72E1" : "#F5F6F6",
                      },
                      "&.Mui-selected": {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#151632" : "#DCF8C6",
                      },
                    }}
                  >
                    {getLeadName(lead.id)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Conversation List */}
          {loading.conversations ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                p: 4,
              }}
            >
              <CircularProgress sx={{ color: "#0E72E1" }} />
            </Box>
          ) : error ? (
            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
                gap: 1,
              }}
            >
              <InfoIcon
                fontSize="large"
                sx={{
                  color: theme.palette.mode === "dark" ? "#F15C6D" : "#D32F2F",
                }}
              />
              <Typography
                sx={{
                  color: theme.palette.mode === "dark" ? "#F15C6D" : "#D32F2F",
                  fontWeight: 500,
                }}
              >
                {error}
              </Typography>
            </Box>
          ) : filteredConversations.length === 0 ? (
            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
                gap: 1,
              }}
            >
              <InfoIcon
                fontSize="large"
                sx={{
                  color: theme.palette.mode === "dark" ? "#53BDEB" : "#1976D2",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9EDEF" : "#111B21",
                  fontWeight: 600,
                }}
              >
                No conversations found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#8696A0" : "#667781",
                  maxWidth: "80%",
                }}
              >
                Start a conversation between the selected bot and lead
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                overflowY: "auto",
                flex: 1,
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#444" : "#ccc",
                  borderRadius: "3px",
                },
              }}
            >
              {filteredConversations.map((chat) => (
                <Box
                  key={chat.id}
                  onClick={() => selectChat(chat)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    cursor: "pointer",
                    bgcolor:
                      selectedChat?.id === chat.id
                        ? theme.palette.mode === "dark"
                          ? "#2A3942"
                          : "#F5F6F6"
                        : "transparent",
                    borderBottom: `1px solid ${
                      theme.palette.mode === "dark" ? "#374248" : "#e9edef"
                    }`,
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark" ? "#2A3942" : "#F5F6F6",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#25D366",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {chat.subject.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box ml={2} flexGrow={1} sx={{ overflow: "hidden" }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        noWrap
                        fontWeight="bold"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9EDEF"
                              : "#111B21",
                          fontSize: "0.9rem",
                        }}
                      >
                        {chat.subject}
                      </Typography>
                      {!isMobile && (
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#8696A0"
                                : "#667781",
                            whiteSpace: "nowrap",
                            ml: 1,
                            fontSize: "0.8rem",
                          }}
                        >
                          {formatDate(chat.timestamp)}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      noWrap
                      variant="body2"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#8696A0" : "#667781",
                        fontSize: "0.85rem",
                        mt: 0.25,
                      }}
                    >
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Chat Detail */}
        {(!isMobile || selectedChat) && (
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: colors.primary[400],
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {selectedChat ? (
              <>
                {/* Chat Header - Inspired by WhatsApp/Facebook Messenger */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    background: "linear-gradient(-65deg, #062994, #0E72E1)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {isMobile && (
                    <IconButton
                      onClick={() => setSelectedChat(null)}
                      sx={{ color: "white", mr: 1 }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  )}
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#25D366", // WhatsApp accent green
                      fontWeight: "bold",
                    }}
                  >
                    {selectedChat.subject.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box ml={2} flexGrow={1}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        color: "white",
                        fontSize: "1.1rem",
                      }}
                    >
                      {selectedChat.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#25D366",
                        }}
                      />
                      {getLeadName(selectedChat.userEmail)}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Tooltip title="Search">
                      <IconButton sx={{ color: "rgba(255,255,255,0.8)" }}>
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More options">
                      <IconButton sx={{ color: "rgba(255,255,255,0.8)" }}>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Chat Messages - Inspired by modern messaging apps */}
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    overflowY: "auto",
                    background:
                      theme.palette.mode === "dark"
                        ? "radial-gradient(circle at top left, #1a1a1a, #121212)"
                        : "radial-gradient(circle at top left, #f5f5f5, #e5e5e5)",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#444" : "#ccc",
                      borderRadius: "3px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        py: 0.65,
                        px: 2,
                        borderRadius: 4,
                        bgcolor:
                          theme.palette.mode === "dark" ? "#333" : "#e0e0e0",
                        color: theme.palette.mode === "dark" ? "#fff" : "#555",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                      }}
                    >
                      {formatFullDate(selectedChat.timestamp)}
                    </Typography>
                  </Box>

                  {selectedChat.messages.map((msg, idx) => (
                    <React.Fragment key={idx}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            msg.sender === "user" || msg.sender === "lead"
                              ? "flex-end"
                              : "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            py: 1.5,
                            px: 2,
                            bgcolor:
                              msg.sender === "user" || msg.sender === "lead"
                                ? theme.palette.mode === "dark"
                                  ? "#151632" // Dark WhatsApp sent message color
                                  : "#e1e2fe" // Light WhatsApp sent message color
                                : theme.palette.mode === "dark"
                                ? "#0f2922" // Dark WhatsApp received message color
                                : "#dbf5ee", // Light WhatsApp received message color
                            color:
                              theme.palette.mode === "dark"
                                ? msg.sender === "user" || msg.sender === "lead"
                                  ? "#E7FFDB"
                                  : "#E9EDEF"
                                : msg.sender === "user" || msg.sender === "lead"
                                ? "#111B21"
                                : "#3B4A54",
                            borderRadius:
                              msg.sender === "user" || msg.sender === "lead"
                                ? "18px 4px 18px 18px"
                                : "4px 18px 18px 18px",
                            maxWidth: "85%",
                            position: "relative",
                            boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                            border:
                              theme.palette.mode === "dark"
                                ? "none"
                                : "1px solid rgba(0,0,0,0.05)",
                          }}
                        >
                          <Typography
                            sx={{
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              fontSize: "0.8rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {msg.message}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              mt: 0.025,
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? msg.sender === "user" ||
                                      msg.sender === "lead"
                                      ? "rgba(255,255,255,0.6)"
                                      : "rgba(255,255,255,0.5)"
                                    : msg.sender === "user" ||
                                      msg.sender === "lead"
                                    ? "rgba(0,0,0,0.6)"
                                    : "rgba(0,0,0,0.5)",
                                fontSize: "0.7rem",
                              }}
                            >
                              {formatDate(msg.timestamp)}
                            </Typography>
                            {(msg.sender === "user" ||
                              msg.sender === "lead") && (
                              <span
                                style={{
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#53BDEB"
                                      : "#34B7F1",
                                }}
                              >
                                ✓✓
                              </span>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      {idx < selectedChat.messages.length - 1 &&
                        new Date(msg.timestamp).getDate() !==
                          new Date(
                            selectedChat.messages[idx + 1].timestamp
                          ).getDate() && (
                          <Divider
                            sx={{
                              my: 2,
                              color:
                                theme.palette.mode === "dark" ? "#444" : "#ddd",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                px: 2,
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#aaa"
                                    : "#777",
                              }}
                            >
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </Typography>
                          </Divider>
                        )}
                    </React.Fragment>
                  ))}
                  <div ref={endRef} />
                </Box>

                {/* Message Input - Inspired by modern messaging apps */}
                <Box
                  sx={{
                    display: "flex",
                    p: 1.5,
                    bgcolor:
                      theme.palette.mode === "dark" ? "#151632" : "#F0F2F5",
                    borderTop: `1px solid ${
                      theme.palette.mode === "dark" ? "#2a2d64" : "#e9edef"
                    }`,
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#8696A0" : "#54656F",
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <Box flexGrow={1} mx={1.5}>
                    <InputBase
                      fullWidth
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={onKeyPress}
                      sx={{
                        py: 1.5,
                        px: 3.5,
                        bgcolor:
                          theme.palette.mode === "dark" ? "#2A3942" : "white",
                        borderRadius: 8,
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        border: `1px solid ${
                          theme.palette.mode === "dark" ? "#374248" : "#e9edef"
                        }`,
                        "&:focus": {
                          outline: "none",
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#4a9b7d"
                              : "#25D366",
                        },
                      }}
                      multiline
                      maxRows={4}
                    />
                  </Box>
                  <Tooltip title="Send message">
                    <IconButton
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      sx={{
                        backgroundColor: !newMessage.trim()
                          ? theme.palette.mode === "dark"
                            ? "#2A3942"
                            : "#e9edef"
                          : "#25D366",
                        color: "white",
                        "&:hover": {
                          backgroundColor: !newMessage.trim()
                            ? theme.palette.mode === "dark"
                              ? "#2A3942"
                              : "#e9edef"
                            : "#128C7E",
                        },
                        transition: "all 0.2s ease",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {!newMessage.trim() ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11 14H13V16H11V14ZM12 12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11C11 11.2652 11.1054 11.5196 11.2929 11.7071C11.4804 11.8946 11.7348 12 12 12ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                            fill={
                              theme.palette.mode === "dark"
                                ? "#8696A0"
                                : "#54656F"
                            }
                          />
                        </svg>
                      ) : (
                        <SendIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    bgcolor: colors.blueAccent[400],
                  }}
                >
                  <SendIcon fontSize="large" />
                </Avatar>
                <Typography
                  variant="h5"
                  sx={{ mb: 1, color: colors.grey[100] }}
                >
                  Select a conversation
                </Typography>
                <Typography variant="body2" sx={{ color: colors.grey[300] }}>
                  Choose a conversation from the list to view messages or start
                  a new one
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GmailChatHistory;
