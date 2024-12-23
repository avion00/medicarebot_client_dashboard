import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import useMediaQuery from "@mui/material/useMediaQuery";
import PasswordIcon from "@mui/icons-material/Password";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import BlurOffIcon from "@mui/icons-material/BlurOff";
import UpdateIcon from "@mui/icons-material/Update";
import LayersIcon from "@mui/icons-material/Layers";
import QuizIcon from "@mui/icons-material/Quiz";
import PaidIcon from "@mui/icons-material/Paid";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PaddingIcon from "@mui/icons-material/Padding";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ChatIcon from "@mui/icons-material/Chat";
import HelpIcon from "@mui/icons-material/Help";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

const Sidebar = ({ isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const isNonMobile = useMediaQuery("(min-width:768px)");

  return (
    <Box
      sx={{
        position: isNonMobile ? "sticky" : "fixed",
        top: 0,
        left: 0,
        width: isCollapsed ? "80px" : "270px",
        height: "100vh",
        zIndex: isNonMobile ? 1 : 1000,
        overflowY: "auto",
        transition: "width 0.3s ease",
        "& .pro-sidebar-inner": {
          backgroundColor: colors.primary[400],
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "0px 35px 5px 20px !important",
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
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: isCollapsed ? "30px 0 20px 0" : "15px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
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

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
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

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                margin: isCollapsed ? 0 : "12px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              Client Dashboard
            </Typography> */}

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
                "& .pro-inner-item:focus": {
                  // color: 'red',
                },
                // .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:focus
              }}
            >
              <MenuItem
                icon={<AlignHorizontalLeftIcon />}
                onClick={() => setSelected("All Bots")}
                style={{
                  marginBottom: ".5em",
                  color: selected === "All Bots" ? "#6870fa" : colors.grey[100],
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
                  color: selected === "Add Bots" ? "#6870fa" : colors.grey[100],
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
              {/* <MenuItem
                icon={<SmartToyIcon />}
                onClick={() => setSelected("Client Profile")}
                style={{
                  marginBottom: ".5em",
                  color:
                    selected === "Client Profile"
                      ? "#6870fa"
                      : colors.grey[100],
                }}
              >
                <Link
                  to="/activeBots"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "13px",
                  }}
                >
                  Active Bots
                </Link>
              </MenuItem> */}

              {/* <MenuItem
                icon={<PrecisionManufacturingIcon />}
                onClick={() => setSelected("Assign Bot")}
                style={{
                  marginBottom: ".5em",
                  color:
                    selected === "Assign Bot" ? "#6870fa" : colors.grey[100],
                }}
              >
                <Link
                  to="/configureSettings"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "13px",
                  }}
                >
                  Train Bots
                </Link>
              </MenuItem> */}

              <MenuItem
                icon={<UpdateIcon />}
                onClick={() => setSelected("Account")}
                style={{
                  marginBottom: "1em",
                  color: selected === "Account" ? "#6870fa" : colors.grey[100],
                }}
              >
                <Link
                  to="/updateTraining"
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
                  Deactivate Bots
                </Link>
              </MenuItem>
            </SubMenu>

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                margin: isCollapsed ? 0 : "12px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              Chat Logs
            </Typography> */}
            <Item
              title="Chat Logs"
              to="/chatLogs"
              icon={<ChatIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <SubMenu
              title="Chat logs"
              icon={<ChatIcon />}
              style={{
                color: colors.grey[100],
                "& .pro-menu-item.active": {
                  color: "#6870fa !important",
                },
                "& .pro-sub-menu-item.active": {
                  color: "#6870fa !important",
                },
                "& .pro-inner-item:focus": {},
              }}
            >
              <MenuItem
                icon={<AlignHorizontalLeftIcon />}
                onClick={() => setSelected("Customer Logs")}
                style={{
                  marginBottom: ".5em",
                  color: selected === "All Bots" ? "#6870fa" : colors.grey[100],
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
                  Customer Logs
                </Link>
              </MenuItem>
              <MenuItem
                icon={<AddIcon />}
                onClick={() => setSelected("Chat History")}
                style={{
                  marginBottom: ".5em",
                  color: selected === "Add Bots" ? "#6870fa" : colors.grey[100],
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
                  Offline Messages
                </Link>
              </MenuItem>
            </SubMenu> */}

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

            <Item
              title="Add Leads"
              to="/add_crm"
              icon={<PlaylistAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="View Leads"
              to="/view_crm"
              icon={<PaddingIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Reports"
              to="/reports"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Billing"
              to="/billing"
              icon={<PaidIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Profile
            </Typography> */}
            <Item
              title="Edit Profile"
              to="/editProfile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/changePassword"
              icon={<PasswordIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Help
            </Typography> */}

            <Item
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
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
