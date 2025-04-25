import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  useTheme,
  Typography,
  InputBase,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import initialData from "./data.json";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const GmailChatHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const endRef = useRef(null);

  // Initialize conversations from JSON
  useEffect(() => {
    const loaded = initialData.map((chat) => ({
      ...chat,
      lastMessage: chat.messages[chat.messages.length - 1]?.message || "",
    }));
    setConversations(loaded);
    setFilteredConversations(loaded);
  }, []);

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

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredConversations(conversations);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = conversations.filter(
      (c) =>
        c.userName.toLowerCase().includes(term) ||
        c.userEmail.toLowerCase().includes(term) ||
        c.lastMessage.toLowerCase().includes(term)
    );
    setFilteredConversations(filtered);
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    const updated = conversations.map((c) => {
      if (c.id === selectedChat.id) {
        const updatedMsgs = [
          ...c.messages,
          { sender: "user", message: newMessage },
          { sender: "bot", message: "Automated reply from bot." },
        ];
        return { ...c, messages: updatedMsgs, lastMessage: newMessage };
      }
      return c;
    });
    setConversations(updated);
    setFilteredConversations(updated);
    setSelectedChat(updated.find((c) => c.id === selectedChat.id));
    setNewMessage("");
  };

  const onKeyPress = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      type === "search" ? handleSearch() : sendMessage();
    }
  };

  return (
    <Box m={2} sx={{ height: "calc(100vh - 64px)" }}>
      <Header
        title="Gmail Chat History"
        subtitle="Dynamic, fully responsive chat UI"
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
            }}
          >
            <InputBase
              fullWidth
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => onKeyPress(e, "search")}
              sx={{ p: 1, ml: 1, backgroundColor: "#e6e6e6", borderRadius: 1 }}
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
                    {chat.lastMessage}
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

                <Box
                  sx={{ display: "flex", p: 1, bgcolor: colors.primary[400] }}
                >
                  <Box flexGrow={1} mr={1}>
                    <InputBase
                      fullWidth
                      placeholder="Type a message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => onKeyPress(e, "send")}
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
