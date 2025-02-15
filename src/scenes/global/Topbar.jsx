import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DropdownMenu from "../../components/DropDownProfileMenu";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const Topbar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const dropdownItems = ["Profile", "Change Password", "Log out"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      alignItems="center"
    >
      {/* Left Section: Menu Button & Search Bar */}
      <Box display="flex" alignItems="center" gap="20px">
        {/* Menu Toggle Button */}
        <IconButton
          onClick={() => setIsSidebar((prev) => !prev)}
          aria-label="Toggle Sidebar"
          sx={{
            display: isNonMobile ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>

        {/* Search Bar */}
        <Box
          display="flex"
          backgroundColor="#f4f4f5"
          borderRadius="4px"
          p="0px 10px"
        >
          <InputBase
            sx={{ flex: 1, color: "#000", pl: "12px" }}
            placeholder="Search..."
            aria-label="Search"
          />
          <IconButton type="button" sx={{ p: 1 }} aria-label="Search">
            <SearchIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Right Section: Theme Toggle, Notifications, Settings, Profile */}
      <Box display="flex" alignItems="center">
        {/* Dark Mode Toggle */}
        <IconButton
          onClick={colorMode.toggleColorMode}
          aria-label="Toggle Dark Mode"
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/* Notifications */}
        <IconButton aria-label="Notifications">
          <NotificationsOutlinedIcon />
        </IconButton>

        {/* Settings */}
        <IconButton
          sx={{
            display: isNonMobile ? undefined : "none",
          }}
          aria-label="Settings"
        >
          <SettingsOutlinedIcon />
        </IconButton>

        {/* Profile Dropdown */}
        <Box sx={{ position: "relative" }} ref={dropdownRef}>
          <IconButton onClick={handleDropdownToggle} aria-label="User Menu">
            <PersonOutlinedIcon />
          </IconButton>
          {isDropdownOpen && <DropdownMenu items={dropdownItems} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
