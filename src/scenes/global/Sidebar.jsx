import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PasswordIcon from "@mui/icons-material/Password";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import BlurOffIcon from "@mui/icons-material/BlurOff";
import UpdateIcon from "@mui/icons-material/Update";
import LayersIcon from "@mui/icons-material/Layers";
import PaidIcon from "@mui/icons-material/Paid";

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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        background: colors.primary[400],
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
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
              margin: "10px 0 20px 0",
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
                  MEDICAREBOT
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
                <Typography variant="h5" color={colors.greenAccent[300]}>
                  johndeo_503
                </Typography>
                <Typography variant="h6" color={colors.blueAccent[300]}>
                  online
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "12px 0 5px 20px" }}
            >
              Client Dashboard
            </Typography>

            <Item
              title="Dashboard Overview"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title="Bot Management"
              icon={<ManageAccountsIcon />}
              style={{
                color: colors.grey[100],
              }}
            >
              <MenuItem
                icon={<SmartToyIcon />}
                onClick={() => setSelected("Client Profile")}
                style={{
                  marginLeft: "-6px",
                  fontSize: "14px",
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
                    fontSize: "14px",
                  }}
                >
                  Active Bots
                </Link>
              </MenuItem>

              <MenuItem
                icon={<PrecisionManufacturingIcon />}
                onClick={() => setSelected("Assign Bot")}
                style={{
                  marginLeft: "-6px",
                  fontSize: "14px",
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
                    fontSize: "14px",
                  }}
                >
                  Configure Settings
                </Link>
              </MenuItem>

              <MenuItem
                icon={<UpdateIcon />}
                onClick={() => setSelected("Account")}
                style={{
                  marginLeft: "-6px",
                  fontSize: "14px",
                  marginBottom: "1em",
                  color: selected === "Account" ? "#6870fa" : colors.grey[100],
                }}
              >
                <Link
                  to="/updateTraining"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "14px",
                  }}
                >
                  Update Training Data
                </Link>
              </MenuItem>

              <MenuItem
                icon={<BlurOffIcon />}
                onClick={() => setSelected("Deactivate Bots")}
                style={{
                  marginLeft: "-6px",
                  fontSize: "14px",
                  marginBottom: "1em",
                  color:
                    selected === "Deactivate Bots"
                      ? "#6870fa"
                      : colors.grey[100],
                }}
              >
                <Link
                  to="/deactivateBots"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Deactivate Bots
                </Link>
              </MenuItem>
            </SubMenu>

            <Item
              title="Settings Management"
              to="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Interactions Management"
              to="/interactions"
              icon={<LayersIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Billing Management"
              to="/billing"
              icon={<PaidIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports and Performance Analytics"
              to="/reports"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Profile
            </Typography>
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
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
