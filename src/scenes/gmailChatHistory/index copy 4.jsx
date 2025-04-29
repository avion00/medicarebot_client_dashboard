// src/components/GmailChatHistory.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  useTheme,
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const API_BASE = "https://app.buy2rent.eu";
const LIST_BOTS_URL = `${API_BASE}/list-bots`;
const LIST_LEADS_URL = `${API_BASE}/list-leads`;
const VIEW_CONVERSATION = (botId, leadId) =>
  `${API_BASE}/view_conversation/${botId}/${leadId}`;

const GmailChatHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { botId: paramBotId, leadId: paramLeadId } = useParams();

  const [bots, setBots] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedBot, setSelectedBot] = useState(paramBotId || "");
  const [selectedLead, setSelectedLead] = useState(paramLeadId || "");

  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const endRef = useRef(null);

  // ——— 1. Fetch bots & leads on mount ———
  useEffect(() => {
    const token = process.env.REACT_APP_API_TOKEN;
    const authHeaders = { Authorization: `Bearer ${token}` };

    axios
      .get(LIST_BOTS_URL, { headers: authHeaders })
      .then((res) => setBots(res.data.bots || []))
      .catch(console.error);

    axios
      .get(LIST_LEADS_URL, { headers: authHeaders })
      .then((res) => setLeads(res.data.leads || []))
      .catch(console.error);
  }, []);

  // ——— 2. When bot & lead are selected, fetch the conversation ———
  useEffect(() => {
    if (!selectedBot || !selectedLead) return;

    axios
      .get(VIEW_CONVERSATION(selectedBot, selectedLead))
      .then(({ data }) => {
        // *** adjust this transform to match your actual JSON ***
        // assume `data.messages` is [{ sender, message, timestamp }, …]
        const msgs = (data.messages || []).map((m) => ({
          sender: m.sender,
          message: m.message,
          timestamp: m.timestamp,
        }));

        const chatObj = {
          id: `${selectedBot}-${selectedLead}`,
          userName: data.lead?.fullname || "Unknown",
          userEmail: data.lead?.email || "",
          userImage: data.lead?.avatar || "/default-avatar.png",
          timestamp: msgs.length ? msgs[msgs.length - 1].timestamp : "",
          messages: msgs,
        };

        setConversations([chatObj]);
        setFilteredConversations([chatObj]);
        setSelectedChat(chatObj);
      })
      .catch(console.error);
  }, [selectedBot, selectedLead]);

  // ——— 3. Close filter dropdown on outside click ———
  useEffect(() => {
    const handleClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ——— 4. Scroll to bottom when chat changes ———
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat]);

  // ——— 5. Search/filter ———
  const handleSearch = () => {
    if (!searchTerm) return setFilteredConversations(conversations);
    const t = searchTerm.toLowerCase();
    setFilteredConversations(
      conversations.filter(
        (c) =>
          c.userName.toLowerCase().includes(t) ||
          c.userEmail.toLowerCase().includes(t) ||
          c.messages
            .map((m) => m.message.toLowerCase())
            .some((msg) => msg.includes(t))
      )
    );
  };

  const selectChat = (c) => setSelectedChat(c);
  const sendMessage = () => {
    if (!selectedChat) return;
    // … your existing send logic, or POST to your API …
  };

  return (
    <Box m={2} sx={{ height: "calc(100vh - 64px)" }}>
      <Header
        title="Gmail Chat History"
        subtitle="Dynamic, fully responsive chat UI"
      />

      {/* Bot & Lead Pickers */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="bot-select-label">Bot</InputLabel>
          <Select
            labelId="bot-select-label"
            value={selectedBot}
            label="Bot"
            onChange={(e) => setSelectedBot(e.target.value)}
          >
            {bots.map((b) => (
              <MenuItem key={b.bot_id} value={b.bot_id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="lead-select-label">Lead</InputLabel>
          <Select
            labelId="lead-select-label"
            value={selectedLead}
            label="Lead"
            onChange={(e) => setSelectedLead(e.target.value)}
          >
            {leads.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.fullname} ({l.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
          {/* Search & Filter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              backgroundColor: colors.primary[400],
            }}
          >
            <InputBase
              fullWidth
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                p: 1,
                ml: 1,
                backgroundColor: "#e6e6e6",
                borderRadius: 1,
              }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
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

          {/* Chats */}
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
                  src={chat.userImage}
                  alt={chat.userName}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <Box ml={1} flexGrow={1}>
                  <Typography noWrap fontWeight="bold">
                    {chat.userName}
                  </Typography>
                  <Typography noWrap variant="body2" color={colors.grey[300]}>
                    {chat.messages.slice(-1)[0]?.message}
                  </Typography>
                </Box>
                {!isMobile && (
                  <Typography variant="caption">{chat.timestamp}</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Chat Detail */}
        {(!isMobile || selectedChat) && (
          <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
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
                    src={selectedChat.userImage}
                    alt={selectedChat.userName}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <Box ml={1}>
                    <Typography fontWeight="bold">
                      {selectedChat.userName}
                    </Typography>
                    <Typography variant="body2">
                      {selectedChat.userEmail}
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

                {/* Messages */}
                <Box
                  sx={{
                    flex: 1,
                    p: 1,
                    overflowY: "auto",
                    bgcolor: colors.primary[400],
                  }}
                >
                  {selectedChat.messages.map((msg, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          bgcolor:
                            msg.sender === "user" ? "#c2d5fe" : "#cbe1e5",
                          borderRadius: 1,
                        }}
                      >
                        <Typography>{msg.message}</Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={endRef} />
                </Box>

                {/* Send Box */}
                <Box
                  sx={{ display: "flex", p: 1, bgcolor: colors.primary[400] }}
                >
                  <Box flexGrow={1} mr={1}>
                    <InputBase
                      fullWidth
                      placeholder="Type a message"
                      value={"" /* your newMessage state */}
                      onChange={() => {}}
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
