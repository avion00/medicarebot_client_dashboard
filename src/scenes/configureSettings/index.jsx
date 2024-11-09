import { Box, Button, useTheme, Snackbar } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { SnackbarContent } from "@mui/material";

const ConfigureSetting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [apiUrl, setApiUrl] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [backupStatus, setBackupStatus] = useState("");
  const [restoreStatus, setRestoreStatus] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarAction, setSnackbarAction] = useState(""); // Added for action-based styling

  const handleSnackbar = (message, actionType) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
    setSnackbarAction(actionType); // Store the action type for conditional styling
    setTimeout(() => setOpenSnackbar(false), 3000); // Close Snackbar after 3 seconds
  };

  const handleSaveSettings = () => {
    handleSnackbar(`API URL saved: ${apiUrl}`);
  };

  const handleSaveNotifications = () => {
    handleSnackbar(
      `Notifications saved:\nEmail: ${
        emailNotifications ? "On" : "Off"
      }\nSMS: ${smsNotifications ? "On" : "Off"}`
    );
  };

  const handleBackupData = () => {
    setBackupStatus("Backup successful.");
    handleSnackbar("Backup successful.");
  };

  const handleRestoreData = () => {
    // Simulating data restoration
    setRestoreStatus("Data restored.");
    handleSnackbar("Data restored.");
  };

  const handleDeleteData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all data? This action cannot be undone."
      )
    ) {
      setDeleteStatus("All data deleted.");
      handleSnackbar("All data deleted.", "delete");
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CONFIGURE SETTINGS"
          subtitle="Configure your all settings"
        />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <Box>
        <Box
          className="settings-section"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              fontSize: "1.5em",
              fontWeight: "700",
            }}
          >
            General Settings
          </Box>

          <label
            htmlFor="api-url"
            style={{
              marginTop: "1em",
              marginBottom: ".5em",
              fontSize: "1em",
              fontWeight: "600",
            }}
          >
            API URL:
          </label>
          <input
            className="api_url_input"
            type="text"
            id="api-url"
            placeholder="Enter API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            style={{
              padding: "1em",
              font: "inherit",
              marginBottom: "1.5em",
              color: colors.grey[100],
              backgroundColor: colors.primary[400],
              border: `1px solid ${colors.grey[600]}`,
            }}
          />
          <Box>
            <Button
              onClick={handleSaveSettings}
              color="secondary"
              variant="outlined"
              style={{
                borderRadius: "20px",
                marginRight: "8px",
              }}
            >
              <SaveIcon sx={{ mr: "10px" }} />
              Save Settings
            </Button>
          </Box>
        </Box>

        <Box
          className="settings-section"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              fontSize: "1.5em",
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: ".5em",
              lineHeight: "1",
            }}
          >
            Notification Preferences
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "1.5em",
              padding: ".5em 0",
            }}
          >
            <label
              htmlFor="email-notifications"
              className="notification-label"
              style={{
                fontSize: "1em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: ".75em",
              }}
            >
              <input
                type="checkbox"
                id="email-notifications"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              Email Notifications
            </label>
            <label
              htmlFor="sms-notifications"
              className="notification-label"
              style={{
                fontSize: "1em",
                marginLeft: "1em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: ".75em",
              }}
            >
              <input
                type="checkbox"
                id="sms-notifications"
                checked={smsNotifications}
                onChange={() => setSmsNotifications(!smsNotifications)}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              SMS Notifications
            </label>
          </Box>
          <Box mt=".5em">
            <Button
              onClick={handleSaveNotifications}
              color="secondary"
              variant="outlined"
              style={{
                borderRadius: "20px",
                marginRight: "8px",
              }}
            >
              <SaveIcon sx={{ mr: "10px" }} />
              Save Notification Preferences
            </Button>
          </Box>
        </Box>

        <div className="settings-section">
          <h3
            style={{
              fontSize: "1.5em",
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: ".5em",
              lineHeight: "1",
            }}
          >
            Data Management
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1em",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box>
              <Button
                onClick={handleBackupData}
                color="secondary"
                variant="outlined"
                style={{
                  borderRadius: "20px",
                  marginRight: "8px",
                }}
              >
                <BackupIcon sx={{ mr: ".5em" }} />
                Backup Data
              </Button>
            </Box>
            <Box>
              <Button
                onClick={handleRestoreData}
                variant="outlined"
                sx={{
                  color: colors.blueAccent[300],
                  borderColor: colors.blueAccent[300],
                  borderRadius: "20px",
                  marginRight: "8px",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                    borderColor: colors.blueAccent[700],
                  },
                }}
              >
                <RestoreIcon sx={{ mr: ".5em" }} />
                Restore Data
              </Button>
            </Box>
            <Box mt=".5em">
              <Button
                onClick={handleDeleteData}
                variant="outlined"
                sx={{
                  color: colors.blueAccent[300],
                  borderColor: colors.blueAccent[300],
                  borderRadius: "20px",
                  marginRight: "8px",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                    borderColor: colors.blueAccent[700],
                  },
                }}
              >
                <DeleteForeverIcon sx={{ mr: ".5em" }} />
                Delete All Data
              </Button>
            </Box>
            
          </div>
        </div>
      </Box>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <SnackbarContent
          sx={{
            backgroundColor:
              snackbarAction === "delete" ? colors.redAccent[700] : colors.greenAccent[700],
            color: colors.grey[100],
            fontWeight: "600",
            padding: ".4em 1em",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </Box>
  );
};

export default ConfigureSetting;
