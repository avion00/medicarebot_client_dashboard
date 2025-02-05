import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SpeedIcon from "@mui/icons-material/Speed";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import FaceIcon from "@mui/icons-material/Face";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import QuizIcon from "@mui/icons-material/Quiz";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CallIcon from "@mui/icons-material/Call";
import useMediaQuery from "@mui/material/useMediaQuery";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
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
  const [selected, setSelected] = useState("Dashboard");
  const isNonMobile = useMediaQuery("(min-width:768px)");

  // Fetching dynamic profile image
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.results[0].picture.large))
      .catch(() => setImageUrl("https://via.placeholder.com/100"));
  }, []);

  return (
    <Box
      sx={{
        position: isNonMobile ? "sticky" : "fixed",
        top: 0,
        left: 0,
        width: isSidebar ? "270px" : "0px", // Toggle sidebar width
        height: "100vh",
        zIndex: 1000,
        overflowY: "auto",
        transition: "width 0.3s ease-in-out",
        backgroundColor: colors.primary[400],
      }}
    >
      <ProSidebar collapsed={!isSidebar}>
        <Menu iconShape="square">
          {/* Sidebar Header */}
          <MenuItem
            onClick={() => setIsSidebar((prev) => !prev)}
            icon={<MenuOutlinedIcon />}
            style={{ color: colors.grey[100], padding: "10px 15px" }}
          >
            {isSidebar && (
              <Typography variant="h3" sx={{ fontWeight: "700" }}>
                <img
                  src="/Medicare-Logo.png"
                  alt="Medicare bot logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Typography>
            )}
          </MenuItem>

          {/* User Profile Section */}
          {isSidebar && (
            <Box textAlign="center" my={2}>
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={imageUrl}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h5" color={colors.grey[100]} mt={1}>
                John Doe
              </Typography>
              <Typography variant="body2" color={colors.blueAccent[400]}>
                johndeo_503
              </Typography>
            </Box>
          )}

          {/* Sidebar Navigation */}
          <Box paddingLeft={isSidebar ? "10%" : "0"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu title="Manage Bots" icon={<ManageAccountsIcon />}>
              <Item
                title="All Bots"
                to="/allBots"
                icon={<SpeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Train Bots"
                to="/trainBots"
                icon={<SettingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Partners Hub" icon={<HandshakeIcon />}>
              <Item
                title="Add Partners"
                to="/addPartners"
                icon={<SpeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="View Partners"
                to="/viewPartners"
                icon={<SpeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Chat Logs" icon={<ForumIcon />}>
              <Item
                title="Chat History"
                to="/chatHistory"
                icon={<SpeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Gmail Chat"
                to="/gmailChatHistory"
                icon={<SpeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Profile" icon={<PersonIcon />}>
              <Item
                title="View Profile"
                to="/viewProfile"
                icon={<FaceIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Edit Profile"
                to="/editProfile"
                icon={<SettingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Help Center" icon={<HelpIcon />}>
              <Item
                title="24/7 Chat"
                to="/customerSupport"
                icon={<SupportAgentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Contact Us"
                to="/contactUs"
                icon={<CallIcon />}
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
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
