import {
  Box,
  useTheme,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect, useRef, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import initialData from "./data.json";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChatHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  // Initially load the conversation (if needed)
  useEffect(() => {
    setConversation(initialData);
  }, []);

  // States
  const [conversation, setConversation] = useState([
    { sender: "bot", message: "Hello! How can I help you today?" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [botSearch, setBotSearch] = useState("");
  // selectedChat: false = show chat list view (mobile), true = show chat conversation view (mobile)
  const [selectedChat, setSelectedChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const conversationEndRef = useRef(null);
  const filterRef = useRef(null);
  const containerRef = useRef(null);

  // Horizontal profile images for scroll (used in conversation view)
  const profileImages = useMemo(() => {
    return Array.from({ length: 15 }, () => {
      const gender = Math.random() > 0.5 ? "men" : "women";
      const imgIndex = Math.floor(Math.random() * 100);
      return `https://randomuser.me/api/portraits/${gender}/${imgIndex}.jpg`;
    });
  }, []);

  // Handlers
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSearchBotChange = (e) => {
    setBotSearch(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversation = [
        ...conversation,
        { sender: "user", message: newMessage },
      ];
      const botResponse = "This is a bot's reply.";
      updatedConversation.push({ sender: "bot", message: botResponse });
      setConversation(updatedConversation);
      setNewMessage("");
    }
  };

  const handleSearchBotChat = () => {
    console.log("Search Bot Chat Clicked");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleFilterClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Horizontal scroll state & handlers (for profile images)
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Desktop Mode – original two-column layout remains unchanged.
  if (isNonMobile) {
    return (
      <Box m="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Header title="CHAT HISTORY" subtitle="Detailed Chat History" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Chat List */}
          <Box
            sx={{
              flex: 1,
              minWidth: "280px",
              border: `1px solid ${colors.grey[700]}`,
              borderRadius: "4px",
              backgroundColor: colors.primary[400],
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
                <Box sx={{ width: "100%" }}>
                  <Box
                    display="flex"
                    flex="1"
                    borderRadius="25px"
                    flexGrow="grow"
                    sx={{
                      border: `2px solid white`,
                      paddingRight: "2.5em",
                      backgroundColor: "#e6e6e6",
                      "&:focus-within": { backgroundColor: "white" },
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
                      placeholder="Type here to Search Bot"
                      value={botSearch}
                      onChange={handleSearchBotChange}
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
                sx={{ flex: 0.25, position: "relative" }}
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
                {isOpen && (
                  <Box
                    ref={filterRef}
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
                    }}
                  >
                    <Typography
                      sx={{
                        background: colors.primary[400],
                        padding: ".5em 1em",
                        cursor: "pointer",
                        transition: "all .4s ease-out",
                        "&:hover": { background: colors.primary[500] },
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
                        "&:hover": { background: colors.primary[500] },
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
                        "&:hover": { background: colors.primary[500] },
                      }}
                    >
                      Timestamp
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ overflow: "auto", height: "58vh" }}>
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
                  "&:hover": { backgroundColor: colors.grey[900] },
                }}
                onClick={() => setSelectedChat(true)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
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
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                      }}
                    >
                      <Typography
                        variant="h5"
                        lineHeight="1.4"
                        fontWeight="bold"
                      >
                        John Smith
                      </Typography>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          background: colors.redAccent[800],
                          padding: "1px 10px",
                          borderRadius: "25px",
                        }}
                      >
                        Unseerved
                      </span>
                    </span>
                    <Typography
                      variant="h6"
                      lineHeight="1.4"
                      color={colors.grey[300]}
                    >
                      Asked about price and features
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    fontSize={{ xs: "12px", sm: "14px" }}
                    lineHeight="1.4"
                    fontWeight="bold"
                  >
                    Web Chatbot
                  </Typography>
                  <span
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
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
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
                          color: "#fff",
                        }}
                      >
                        85
                      </span>
                    </span>
                  </span>
                </Box>
              </Box>
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
                  "&:hover": { backgroundColor: colors.grey[900] },
                }}
                onClick={() => setSelectedChat(true)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
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
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                      }}
                    >
                      <Typography
                        variant="h5"
                        lineHeight="1.4"
                        fontWeight="bold"
                      >
                        John Smith
                      </Typography>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          background: colors.redAccent[800],
                          padding: "1px 10px",
                          borderRadius: "25px",
                        }}
                      >
                        Unseerved
                      </span>
                    </span>
                    <Typography
                      variant="h6"
                      lineHeight="1.4"
                      color={colors.grey[300]}
                    >
                      Asked about price and features
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    fontSize={{ xs: "12px", sm: "14px" }}
                    lineHeight="1.4"
                    fontWeight="bold"
                  >
                    Web Chatbot
                  </Typography>
                  <span
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
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
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
                          color: "#fff",
                        }}
                      >
                        85
                      </span>
                    </span>
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Chat Panel */}
          <Box
            sx={{
              flex: 1,
              minWidth: "280px",
              border: `1px solid ${colors.grey[700]}`,
              borderRadius: "4px",
            }}
          >
            {selectedChat ? (
              <Box position="relative" backgroundColor={colors.primary[400]}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(45deg, #062994, #0E72E1)",
                    padding: "1em",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1em" }}
                  >
                    <img
                      src={`../../assets/user.png`}
                      alt="Logo"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        lineHeight="1.4"
                        fontWeight="bold"
                        color="#ccc"
                      >
                        Telegram Chatbot
                      </Typography>
                      <Typography variant="h6" lineHeight="1.4" color="#79898D">
                        Chat with Bot
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1em" }}
                  >
                    <SearchIcon />
                    <MoreVertIcon />
                  </Box>
                </Box>
                <Box
                  sx={{
                    overflow: "auto",
                    padding: "1em",
                    height: "50dvh",
                    marginBottom: "3.5em",
                    borderBottom: `1px solid ${colors.grey[700]}`,
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="h6"
                    color={colors.grey[500]}
                  >
                    12 Oct, 2024
                  </Typography>
                  {conversation.map((msg, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        marginBottom: "1em",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "52%",
                          backgroundColor:
                            msg.sender === "user" ? "#c2d5fe" : "#cbe1e5",
                          borderRadius:
                            msg.sender === "user"
                              ? "8px 8px 0 8px"
                              : "8px 8px 8px 0",
                          padding: ".5em 1em",
                          color: "#000",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6">{msg.message}</Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={conversationEndRef} />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    padding: "1em 1.5em",
                    bottom: "-3.5em",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: colors.primary[400],
                    gap: ".5em",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box
                      display="flex"
                      flex="1"
                      borderRadius="25px"
                      flexGrow="grow"
                      sx={{
                        border: `2px solid white`,
                        backgroundColor: "#f4f4f5",
                        "&:focus-within": { backgroundColor: "white" },
                      }}
                    >
                      <InputBase
                        sx={{
                          ml: 2,
                          mr: 2,
                          flexGrow: "grow",
                          p: ".5em",
                          color: "#000",
                          width: "100%",
                        }}
                        placeholder="Start Writing Here"
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f4f4f5",
                      padding: ".5em",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={handleSendMessage}
                  >
                    <SendIcon sx={{ color: "#000", rotate: "-45deg" }} />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color={colors.grey[300]}>
                  Please select a chat.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  } else {
    // Mobile Mode – show either the chat list view or the chat conversation view
    return (
      <Box m="20px">
        <Header title="CHAT HISTORY" subtitle="Detailed Chat History" />
        {!selectedChat ? (
          // Mobile Chat List View (vertical list with search & filter)
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1em",
              }}
            >
              <Box sx={{ flex: 1, position: "relative" }}>
                <Box sx={{ width: "100%" }}>
                  <Box
                    display="flex"
                    flex="1"
                    borderRadius="25px"
                    flexGrow="grow"
                    sx={{
                      border: `2px solid white`,
                      paddingRight: "2.5em",
                      backgroundColor: "#e6e6e6",
                      "&:focus-within": { backgroundColor: "white" },
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
                      placeholder="Type here to Search Bot"
                      value={botSearch}
                      onChange={handleSearchBotChange}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: "1.5em",
                    bottom: ".5em",
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
              <Box onClick={handleFilterClick} sx={{ position: "relative" }}>
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
                {isOpen && (
                  <Box
                    ref={filterRef}
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
                    }}
                  >
                    <Typography
                      sx={{
                        background: colors.primary[400],
                        padding: ".5em 1em",
                        cursor: "pointer",
                        transition: "all .4s ease-out",
                        "&:hover": { background: colors.primary[500] },
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
                        "&:hover": { background: colors.primary[500] },
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
                        "&:hover": { background: colors.primary[500] },
                      }}
                    >
                      Timestamp
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ overflow: "auto", height: "70vh" }}>
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
                  "&:hover": { backgroundColor: colors.grey[900] },
                }}
                onClick={() => setSelectedChat(true)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
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
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                      }}
                    >
                      <Typography
                        variant="h5"
                        lineHeight="1.4"
                        fontWeight="bold"
                      >
                        John Smith
                      </Typography>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          background: colors.redAccent[800],
                          padding: "1px 10px",
                          borderRadius: "25px",
                        }}
                      >
                        Unseerved
                      </span>
                    </span>
                    <Typography
                      variant="h6"
                      lineHeight="1.4"
                      color={colors.grey[300]}
                    >
                      Asked about price and features
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    fontSize={{ xs: "12px", sm: "14px" }}
                    lineHeight="1.4"
                    fontWeight="bold"
                  >
                    Web Chatbot
                  </Typography>
                  <span
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
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
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
                          color: "#fff",
                        }}
                      >
                        85
                      </span>
                    </span>
                  </span>
                </Box>
              </Box>
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
                  "&:hover": { backgroundColor: colors.grey[900] },
                }}
                onClick={() => setSelectedChat(true)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
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
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                      }}
                    >
                      <Typography
                        variant="h5"
                        lineHeight="1.4"
                        fontWeight="bold"
                      >
                        John Smith
                      </Typography>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          background: colors.redAccent[800],
                          padding: "1px 10px",
                          borderRadius: "25px",
                        }}
                      >
                        Unseerved
                      </span>
                    </span>
                    <Typography
                      variant="h6"
                      lineHeight="1.4"
                      color={colors.grey[300]}
                    >
                      Asked about price and features
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    fontSize={{ xs: "12px", sm: "14px" }}
                    lineHeight="1.4"
                    fontWeight="bold"
                  >
                    Web Chatbot
                  </Typography>
                  <span
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
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
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
                          color: "#fff",
                        }}
                      >
                        85
                      </span>
                    </span>
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          // Mobile Chat Conversation View – includes a header with a back icon, search box, and horizontal user list
          <Box>
            {/* Horizontal profile scroll */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                padding: ".25em 1em",
                marginBottom: "1em",
                overflowX: "hidden",
                height: "80px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: colors.primary[500],
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <IconButton onClick={() => setSelectedChat(false)}>
                <ArrowBackIcon />
              </IconButton>
              {showLeftButton && (
                <IconButton
                  sx={{
                    position: "absolute",
                    left: "2.5em",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "linear-gradient(45deg, #062994, #0E72E1)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 2,
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                  }}
                  onClick={scrollLeft}
                >
                  <ChevronLeft />
                </IconButton>
              )}
              <Box
                ref={containerRef}
                onScroll={handleScroll}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {profileImages.map((imageUrl, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="Profile"
                      style={{
                        cursor: "pointer",
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #fff",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Box>
                ))}
              </Box>
              {showRightButton && (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "linear-gradient(45deg, #0E72E1, #062994)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 2,
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                  }}
                  onClick={scrollRight}
                >
                  <ChevronRight />
                </IconButton>
              )}
            </Box>
            {/* Chat Conversation Panel */}
            <Box
              sx={{
                flex: 1,
                border: `1px solid ${colors.grey[700]}`,
              }}
            >
              <Box position="relative" backgroundColor={colors.primary[400]}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(45deg, #062994, #0E72E1)",
                    padding: "1em",
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
                          width: "50px",
                          height: "50px",
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
                      <Typography
                        variant="h5"
                        lineHeight="1.4"
                        fontWeight="bold"
                        color="#ccc"
                      >
                        Telegram Chatbot
                      </Typography>
                      <Typography variant="h6" lineHeight="1.4" color="#79898D">
                        Chat with Bot
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SearchIcon />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <MoreVertIcon />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    overflow: "auto",
                    padding: "1em",
                    // yo chai height ko lagi tara paxi change gar dine ho
                    height: "50dvh",
                    marginBottom: "3.5em",

                    borderBottom: `1px solid ${colors.grey[700]}`,
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                    variant="h6"
                    color={colors.grey[500]}
                  >
                    12 Oct, 2024
                  </Typography>
                  {conversation.map((msg, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        marginBottom: "1em",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "52%",

                          backgroundColor:
                            msg.sender === "user" ? "#c2d5fe" : "#cbe1e5",
                          borderRadius:
                            msg.sender === "user"
                              ? " 8px 8px 0 8px"
                              : "8px 8px 8px 0",
                          padding: ".5em 1em",
                          color: "#000",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6">{msg.message}</Typography>
                      </Box>
                    </Box>
                  ))}

                  <div ref={conversationEndRef} />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    padding: "1em 1.5em",
                    bottom: "-3.5em",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: colors.primary[400],
                    gap: ".5em",
                    // padding: "0 1.5em",
                    justifyContent: "space-between",
                  }}
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
                        backgroundColor: "#f4f4f5",
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
                          p: ".5em",
                          color: "#000",
                          width: "100%",
                        }}
                        placeholder="Start Writing Here"
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f4f4f5",
                      padding: ".5em",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={handleSendMessage}
                  >
                    <SendIcon sx={{ color: "#000", rotate: "-45deg" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
};

export default ChatHistory;
