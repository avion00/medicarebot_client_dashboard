import { useState, useEffect, useRef } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SpeedIcon from "@mui/icons-material/Speed";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FaceIcon from "@mui/icons-material/Face";
import CallIcon from "@mui/icons-material/Call";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import QuizIcon from "@mui/icons-material/Quiz";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaidIcon from "@mui/icons-material/Paid";

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const sidebarRef = useRef(null);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.results[0].picture.large);
      })
      .catch(() => {
        setImageUrl("https://via.placeholder.com/100");
      });
  }, []);

  return (
    <>
      {/* Sidebar Background Overlay (Mobile) */}
      {isSidebar && (
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

      {/* Sidebar Container */}
      <Box
        ref={sidebarRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isSidebar ? "270px" : "80px",
          height: "100vh",
          zIndex: 1000,
          transition: "width 0.3s ease-in-out",
          backgroundColor: colors.primary[400],
          display: "flex",
          flexDirection: "column",
          boxShadow: isSidebar ? "2px 0px 10px rgba(0, 0, 0, 0.2)" : "none",
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            padding: "1.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isSidebar && (
            <img
              src="/Medicare-Logo.png"
              alt="Logo"
              style={{ width: "120px", objectFit: "contain" }}
            />
          )}
          <IconButton onClick={() => setIsSidebar((prev) => !prev)}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>

        {/* Profile Section (Fixed) */}
        {isSidebar && (
          <Box
            sx={{
              textAlign: "center",
              padding: "1em 0",
            }}
          >
            <img
              src={imageUrl || "https://via.placeholder.com/100"}
              alt="User"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
              John Doe
            </Typography>
            <Typography variant="body2" color={colors.grey[300]}>
              johndeo_503
            </Typography>
            <Typography variant="caption" color={colors.primary[100]}>
              Online
            </Typography>
          </Box>
        )}

        {/* Scrollable Menu List */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            paddingBottom: "1em",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.grey[500],
              borderRadius: "10px",
            },
          }}
        >
          <ProSidebar collapsed={!isSidebar}>
            <Menu iconShape="square">
              {/* Dashboard */}
              <MenuItem icon={<HomeOutlinedIcon />}>
                <Typography>Dashboard</Typography>
                <Link to="/dashboard" />
              </MenuItem>

              {/* Manage Bots */}
              <SubMenu title="Manage Bots" icon={<ManageAccountsIcon />}>
                <MenuItem icon={<SpeedIcon />}>
                  <Link to="/trainBots">Train Bots</Link>
                </MenuItem>
                <MenuItem icon={<SettingsIcon />}>
                  <Link to="/testBots">Test Bots</Link>
                </MenuItem>
              </SubMenu>

              {/* Reports */}
              <SubMenu title="Reports" icon={<AssessmentIcon />}>
                <MenuItem icon={<FlagIcon />}>
                  <Link to="/reports">Reports</Link>
                </MenuItem>
              </SubMenu>

              {/* Billing */}
              <MenuItem icon={<PaidIcon />}>
                <Typography>Billing</Typography>
                <Link to="/billing" />
              </MenuItem>

              {/* Profile */}
              <SubMenu title="Profile" icon={<PersonIcon />}>
                <MenuItem icon={<FaceIcon />}>
                  <Link to="/viewProfile">View Profile</Link>
                </MenuItem>
              </SubMenu>

              {/* Help */}
              <SubMenu title="Help Center" icon={<HelpIcon />}>
                <MenuItem icon={<SupportAgentIcon />}>
                  <Link to="/customerSupport">24/7 Chat</Link>
                </MenuItem>
                <MenuItem icon={<CallIcon />}>
                  <Link to="/contactUs">Contact Us</Link>
                </MenuItem>
                <MenuItem icon={<QuizIcon />}>
                  <Link to="/faq">FAQ</Link>
                </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
