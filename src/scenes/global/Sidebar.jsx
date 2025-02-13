import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import useMediaQuery from "@mui/material/useMediaQuery";
import PasswordIcon from "@mui/icons-material/Password";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import BlurOffIcon from "@mui/icons-material/BlurOff";
import QuizIcon from "@mui/icons-material/Quiz";
import PaidIcon from "@mui/icons-material/Paid";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PaddingIcon from "@mui/icons-material/Padding";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ChatIcon from "@mui/icons-material/Chat";
import HelpIcon from "@mui/icons-material/Help";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SpeedIcon from "@mui/icons-material/Speed";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import FaceIcon from "@mui/icons-material/Face";
import CallIcon from "@mui/icons-material/Call";
import LayersIcon from "@mui/icons-material/Layers";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FlagIcon from "@mui/icons-material/Flag";
import EmailIcon from "@mui/icons-material/Email";
import { useRef } from "react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:768px)");

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const location = useLocation(); 

  // for dynamic URL images
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const fetchedImageUrl = data.results[0].picture.large; 
        setImageUrl(fetchedImageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setImageUrl("https://via.placeholder.com/100"); 
      });
  }, []);

  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isNonMobile) {
      setIsSidebar(false);
    }
  }, [isNonMobile, setIsSidebar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebar(false); // Close sidebar if clicked outside
      }
    };

    if (!isNonMobile && isSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebar, isNonMobile, setIsSidebar]);

  // Update the selected state based on the current URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setSelected("Dashboard");
    } else if (path === "/allBots") {
      setSelected("All Bots");
    } else if (path === "/addbot") {
      setSelected("Add Bots");
    } else if (path === "/trainBots") {
      setSelected("Train Bots");
    } else if (path === "/testBots") {
      setSelected("Test Bots");
    } else if (path === "/deactivateBots") {
      setSelected("Deactivate Bots");
    } else if (path === "/addPartners") {
      setSelected("addPartners");
    } else if (path === "/viewPartners") {
      setSelected("viewPartners");
    } else if (path === "/chatHistory") {
      setSelected("chatHistory");
    } else if (path === "/gmailChatHistory") {
      setSelected("gmailChatHistory");
    } else if (path === "/humanHandoffs") {
      setSelected("humanHandoffs");
    } else if (path === "/reports") {
      setSelected("reports");
    } else if (path === "/interactionStats") {
      setSelected("interactionStats");
    } else if (path === "/billing") {
      setSelected("Billing");
    } else if (path === "/viewProfile") {
      setSelected("viewProfile");
    } else if (path === "/editProfile") {
      setSelected("editProfile");
    } else if (path === "/changePassword") {
      setSelected("changePassword");
    } else if (path === "/customerSupport") {
      setSelected("customerSupport");
    } else if (path === "/contactUs") {
      setSelected("contactUs");
    } else if (path === "/faq") {
      setSelected("faq");
    }
  }, [location]);

  return (
    <>
      {isSidebar && !isNonMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 999,
            transition: "opacity 0.3s ease-in-out",
          }}
          onClick={() => setIsSidebar(false)}
        />
      )}
      <Box
        ref={sidebarRef}
        className="sidebar_for_scroll"
        sx={{
          position: isNonMobile ? "sticky" : "fixed",
          top: 0,
          left: 0,
          width: isSidebar ? "270px" : isNonMobile ? "80px" : "0px",
          height: "100vh",
          zIndex: isNonMobile ? 1 : 1000,
          overflowY: "auto",
          overflowX: "hidden",
          transition: "width 0.3s ease-in-out",
          "& .pro-sidebar-inner": {
            backgroundColor: colors.primary[400],
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "0px 32px 6px 16px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
          "& .pro-sub-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={!isSidebar}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsSidebar((prev) => !prev)}
              icon={!isSidebar ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: isSidebar ? "12px 0 20px 0" : "29px 0 20px 1px",
              }}
            >
              {isSidebar && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      src="/Medicare-Logo.png"
                      alt="Medicare bot logo"
                    />
                  </Typography>

                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {isSidebar && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={imageUrl || "https://via.placeholder.com/100"}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    John OM
                  </Typography>
                  <Typography variant="h5" color={colors.blueAccent[400]}>
                    johndeo_503
                  </Typography>
                  <Typography variant="h6" color={colors.primary[100]}>
                    online
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              paddingLeft={!isSidebar ? undefined : "10%"}
              sx={{
                height: isSidebar
                  ? "calc(100dvh - 350px)"
                  : "calc(100dvh - 110px)",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubMenu
                title="Manage Bots"
                icon={<ManageAccountsIcon />}
                style={{
                  fontSize: "14px",
                  color: colors.grey[100],
                  "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                  },
                  "& .pro-sub-menu-item.active": {
                    color: "#6870fa !important",
                  },
                }}
              >
                <MenuItem
                  icon={<AlignHorizontalLeftIcon />}
                  onClick={() => setSelected("All Bots")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "All Bots" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/allBots"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    All Bots
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<AddIcon />}
                  onClick={() => setSelected("Add Bots")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "Add Bots" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/addbot"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Add Bots
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<SettingsIcon />}
                  onClick={() => setSelected("Train Bots")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "Train Bots" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/trainBots"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Train Bots
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<SpeedIcon />}
                  onClick={() => setSelected("Test Bots")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "Test Bots" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/testBots"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Test Bots
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<BlurOffIcon />}
                  onClick={() => setSelected("Deactivate Bots")}
                  style={{
                    marginBottom: "1em",
                    color:
                      selected === "Deactivate Bots"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/deactivateBots"
                    style={{
                      textDecoration: "none",
                      fontSize: "13px",
                      color: "inherit",
                    }}
                  >
                    Deactivate
                  </Link>
                </MenuItem>
              </SubMenu>

              <SubMenu
                title="Partners Hub"
                icon={<HandshakeIcon />}
                style={{
                  fontSize: "14px",
                  color: colors.grey[100],
                  "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                  },
                  "& .pro-sub-menu-item.active": {
                    color: "#6870fa !important",
                  },
                }}
              >
                <MenuItem
                  icon={<PlaylistAddIcon />}
                  onClick={() => setSelected("addPartners")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "addPartners" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/addPartners"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Add Partners
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<PaddingIcon />}
                  onClick={() => setSelected("viewPartners")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "viewPartners"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/viewPartners"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    View Partners
                  </Link>
                </MenuItem>
              </SubMenu>

              <SubMenu
                title="Chat logs"
                icon={<ForumIcon />}
                style={{
                  fontSize: "14px",
                  color: colors.grey[100],
                  "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                  },
                  "& .pro-sub-menu-item.active": {
                    color: "#6870fa !important",
                  },
                }}
              >
                <MenuItem
                  icon={<ChatIcon />}
                  onClick={() => setSelected("chatHistory")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "chatHistory" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/chatHistory"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Chat History
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<EmailIcon />}
                  onClick={() => setSelected("gmailChatHistory")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "gmailChatHistory"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/gmailChatHistory"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Gmail Chat History
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<EmojiPeopleIcon />}
                  onClick={() => setSelected("humanHandoffs")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "humanHandoffs"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/humanHandoffs"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Human Handoffs
                  </Link>
                </MenuItem>
              </SubMenu>

              <SubMenu
                title="Reports"
                icon={<FlagIcon />}
                style={{
                  fontSize: "14px",
                  color: colors.grey[100],
                  "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                  },
                  "& .pro-sub-menu-item.active": {
                    color: "#6870fa !important",
                  },
                }}
              >
                <MenuItem
                  icon={<AssessmentIcon />}
                  onClick={() => setSelected("reports")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "reports" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/reports"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Reports
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<LayersIcon />}
                  onClick={() => setSelected("interactionStats")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "interactionStats"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/interactionStats"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Interactions States
                  </Link>
                </MenuItem>
              </SubMenu>

              <Item
                title="Billing"
                to="/billing"
                icon={<PaidIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <SubMenu
                title="Profile"
                icon={<PersonIcon />}
                style={{
                  fontSize: "14px",
                  color: colors.grey[100],
                  "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                  },
                  "& .pro-sub-menu-item.active": {
                    color: "#6870fa !important",
                  },
                }}
              >
                <MenuItem
                  icon={<FaceIcon />}
                  onClick={() => setSelected("viewProfile")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "viewProfile" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/viewProfile"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    View Profile
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<ManageAccountsIcon />}
                  onClick={() => setSelected("editProfile")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "editProfile" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/editProfile"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Edit Profile
                  </Link>
                </MenuItem>
                <MenuItem
                  icon={<PasswordIcon />}
                  onClick={() => setSelected("changePassword")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "changePassword"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/changePassword"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Change Password
                  </Link>
                </MenuItem>
              </SubMenu>

              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                margin: isCollapsed ? " 0 1em" : "15px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              Partners Hub
            </Typography> */}

              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Profile
            </Typography> */}

              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Help
            </Typography> */}

              {/* <Item
              title="Help Center"
              to="/helpCenter"
              icon={<HelpIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customer Support"
              to="/customerSupport"
              icon={<SupportAgentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="FAQ"
              to="/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

              <SubMenu
                title="Help Center"
                icon={<HelpIcon />}
                style={{
                  fontSize: "14px",
                  color: colors.grey[100],
                  "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                  },
                  "& .pro-sub-menu-item.active": {
                    color: "#6870fa !important",
                  },
                }}
              >
                <MenuItem
                  icon={<SupportAgentIcon />}
                  onClick={() => setSelected("customerSupport")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "customerSupport"
                        ? "#6870fa"
                        : colors.grey[100],
                  }}
                >
                  <Link
                    to="/customerSupport"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    24/7 Chat
                  </Link>
                </MenuItem>

                <MenuItem
                  icon={<CallIcon />}
                  onClick={() => setSelected("contactUs")}
                  style={{
                    marginBottom: ".5em",
                    color:
                      selected === "contactUs" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/contactUs"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    Contact Us
                  </Link>
                </MenuItem>

                <MenuItem
                  icon={<QuizIcon />}
                  onClick={() => setSelected("faq")}
                  style={{
                    marginBottom: "1em",
                    color: selected === "faq" ? "#6870fa" : colors.grey[100],
                  }}
                >
                  <Link
                    to="/faq"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                    }}
                  >
                    FAQ
                  </Link>
                </MenuItem>
              </SubMenu>
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>
  );
};

export default Sidebar;
