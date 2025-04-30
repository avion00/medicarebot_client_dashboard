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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [bots, setBots] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedBot, setSelectedBot] = useState("");
  const [selectedLead, setSelectedLead] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const filterRef = useRef(null);
  const endRef = useRef(null);

  // Fetch bots on component mount
  useEffect(() => {
    const fetchBots = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://app.buy2rent.eu/list-bots", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.bots) {
          // Extract just the bot IDs
          const botIds = response.data.bots.map((bot) => bot.bot_id);
          setBots(botIds);
          if (botIds.length > 0) {
            setSelectedBot(botIds[0]);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching bots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, [token]);

  // Fetch leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
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
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [token]);

  // Fetch conversations when bot or lead changes
  useEffect(() => {
    const fetchConversations = async () => {
      if (!selectedBot || !selectedLead) return;

      console.log(
        "Fetching conversations with bot_id:",
        selectedBot,
        "and lead_id:",
        selectedLead
      );

      try {
        setLoading(true);
        const response = await axios.get(
          `https://app.medicarebot.live/view_conversation/${selectedBot}/${selectedLead}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

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
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [selectedBot, selectedLead, token]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <Box m={2} sx={{ height: "calc(100vh - 64px)" }}>
      <Header
        title="Gmail Chat History"
        subtitle="View conversations between bots and leads"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100%",
        }}
      >
        {/* Conversations List */}
        <Box
          sx={{
            flex: isMobile ? (selectedChat ? 0 : 1) : 1,
            display: isMobile && selectedChat ? "none" : "flex",
            flexDirection: "column",
            borderRight: !isMobile ? `1px solid ${colors.grey[700]}` : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              backgroundColor: colors.primary[400],
              gap: 1,
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Bot ID</InputLabel>
              <Select
                value={selectedBot}
                onChange={(e) => setSelectedBot(e.target.value)}
                label="Bot ID"
                sx={{ backgroundColor: "#e6e6e6" }}
              >
                {bots.map((botId) => (
                  <MenuItem key={botId} value={botId}>
                    {botId}
                  </MenuItem>
                ))}
                {bots.length === 0 && (
                  <MenuItem disabled>No bots available</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Lead</InputLabel>
              <Select
                value={selectedLead}
                onChange={(e) => setSelectedLead(e.target.value)}
                label="Lead"
                sx={{ backgroundColor: "#e6e6e6" }}
              >
                {leads.map((lead) => (
                  <MenuItem key={lead.id} value={lead.id}>
                    {lead.name || lead.email || `Lead ${lead.id}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton onClick={() => setFilterOpen((o) => !o)}>
              <FilterAltIcon />
            </IconButton>

            {filterOpen && (
              <Box
                ref={filterRef}
                sx={{
                  position: "absolute",
                  top: 48,
                  right: 16,
                  background: colors.primary[400],
                  border: `1px solid ${colors.grey[600]}`,
                  borderRadius: 1,
                  zIndex: 10,
                }}
              >
                {["Interaction", "Channel", "Timestamp"].map((opt) => (
                  <Typography
                    key={opt}
                    sx={{
                      p: 1,
                      cursor: "pointer",
                      "&:hover": { background: colors.primary[500] },
                    }}
                  >
                    {opt}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          {loading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography>Loading conversations...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Box sx={{ overflowY: "auto", flex: 1 }}>
              {filteredConversations.map((chat) => (
                <Box
                  key={chat.id}
                  onClick={() => selectChat(chat)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    cursor: "pointer",
                    bgcolor:
                      selectedChat?.id === chat.id
                        ? colors.primary[500]
                        : colors.primary[400],
                    borderBottom: `1px solid ${colors.grey[700]}`,
                    "&:hover": { bgcolor: colors.primary[500] },
                  }}
                >
                  <img
                    src="/default-user.png"
                    alt={chat.userName}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <Box ml={1} flexGrow={1}>
                    <Typography noWrap fontWeight="bold">
                      {chat.subject}
                    </Typography>
                    <Typography noWrap variant="body2" color={colors.grey[300]}>
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                  {!isMobile && (
                    <Typography variant="caption">
                      {formatDate(chat.timestamp)}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Chat Detail */}
        {(!isMobile || selectedChat) && (
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
            {selectedChat ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    bgcolor: "primary.main",
                  }}
                >
                  {isMobile && (
                    <IconButton onClick={() => setSelectedChat(null)}>
                      <ArrowBackIcon />
                    </IconButton>
                  )}
                  <img
                    src="/default-user.png"
                    alt={selectedChat.userName}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <Box ml={1}>
                    <Typography fontWeight="bold">
                      {selectedChat.subject}
                    </Typography>
                    <Typography variant="body2">
                      Lead ID: {selectedChat.userEmail}
                    </Typography>
                  </Box>
                  <Box ml="auto">
                    <IconButton>
                      <SearchIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <MoreVertIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 1,
                    overflowY: "auto",
                    bgcolor: colors.primary[400],
                  }}
                >
                  {selectedChat.messages.map((msg, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user" || msg.sender === "lead"
                            ? "flex-end"
                            : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          bgcolor:
                            msg.sender === "user" || msg.sender === "lead"
                              ? "#c2d5fe"
                              : "#cbe1e5",
                          borderRadius: 1,
                          maxWidth: "80%",
                        }}
                      >
                        <Typography>{msg.message}</Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          textAlign="right"
                        >
                          {formatDate(msg.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={endRef} />
                </Box>

                <Box
                  sx={{ display: "flex", p: 1, bgcolor: colors.primary[400] }}
                >
                  <Box flexGrow={1} mr={1}>
                    <InputBase
                      fullWidth
                      placeholder="Type a message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={onKeyPress}
                      sx={{ p: 1, bgcolor: "#f4f4f5", borderRadius: 1 }}
                      multiline
                      maxRows={4}
                    />
                  </Box>
                  <IconButton onClick={sendMessage}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">Select a conversation</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GmailChatHistory;
