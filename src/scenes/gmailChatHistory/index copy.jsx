import {
  Box,
  useTheme,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect, useRef } from "react";
// import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import initialData from "./data.json";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const GmailChatHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    setConversation(initialData);
  }, []);

  // Sthis tate for storing the conversation okey
  const [conversation, setConversation] = useState([
    { sender: "bot", message: "Hello! How can I help you today?" },
  ]);

  // yoo State for storing the new message input by the user
  const [newMessage, setNewMessage] = useState("");
  const [botSearch, setBotSearch] = useState("");

  const conversationEndRef = useRef(null);

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

  const [isOpen, setIsOpen] = useState(false); // State to toggle filter options
  const filterRef = useRef(null); // Ref to the filter box

  // Toggle filter options visibility
  const handleFilterClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Close the filter box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box>
        <Header
          title="GMAIL CHAT HISTORY"
          subtitle="Get you gmail chat history with new data"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* First Box */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: colors.primary[400],
              gap: "1em",
              justifyContent: "space-between",
              padding: "0 1em",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 0.7, padding: "1em .5em", position: "relative" }}>
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
                  // border: '1px solid red'
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <Typography variant="h5" lineHeight="1.4" fontWeight="bold">
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

        {/* Sticky Second Box */}
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
                    John Deo
                  </Typography>
                  <Typography variant="h6" lineHeight="1.4" color="#79898D">
                    johndoe@gmail.com
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
    </Box>
  );
};

export default GmailChatHistory;
