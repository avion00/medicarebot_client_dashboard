import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ConfigureSetting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [apiUrl, setApiUrl] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [backupStatus, setBackupStatus] = useState("");
  const [restoreStatus, setRestoreStatus] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  const handleSaveSettings = () => {
    alert(`API URL saved: ${apiUrl}`);
  };

  const handleSaveNotifications = () => {
    alert(
      `Notifications saved:\nEmail: ${
        emailNotifications ? "On" : "Off"
      }\nSMS: ${smsNotifications ? "On" : "Off"}`
    );
  };

  const handleBackupData = () => {
    setBackupStatus("Backup successful.");
    setTimeout(() => setBackupStatus(""), 3000); // Clear message after 3 seconds
  };

  const handleRestoreData = () => {
    // Simulating data restoration
    setRestoreStatus("Data restored.");
    setTimeout(() => setRestoreStatus(""), 3000); // Clear message after 3 seconds
  };

  const handleDeleteData = () => {
    // Simulating delete all data logic
    if (
      window.confirm(
        "Are you sure you want to delete all data? This action cannot be undone."
      )
    ) {
      setDeleteStatus("All data deleted.");
      setTimeout(() => setDeleteStatus(""), 3000); // Clear message after 3 seconds
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
              fontSize: "1em",
              fontWeight: "800",
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
              marginBottom: "1em",
              backgroundColor: colors.primary[400],
              border: `1px solid ${colors.grey[600]}`,
              // outline: 'none',
            }}
          />
          <Box>
            <Button
              onClick={handleSaveSettings}
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: ".5em 1em",
                textTransform: "capitalize",
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
          <Box>
            <Button
              onClick={handleSaveNotifications}
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: ".5em 1em",
                marginTop: ".5em",
                textTransform: "capitalize",
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
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: ".5em 1em",
                  marginTop: ".5em",
                  textTransform: "capitalize",
                }}
              >
                <BackupIcon sx={{ mr: ".5em" }} />
                Backup Data
              </Button>
            </Box>
            {backupStatus && <p className="status-message">{backupStatus}</p>}
            <Box>
              <Button
                onClick={handleRestoreData}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: ".5em 1em",
                  marginTop: ".5em",
                  textTransform: "capitalize",
                }}
              >
                <RestoreIcon sx={{ mr: ".5em" }} />
                Restore Data
              </Button>
            </Box>
            {restoreStatus && <p className="status-message">{restoreStatus}</p>}
            <Box>
              <Button
                onClick={handleDeleteData}
                sx={{
                  backgroundColor: colors.redAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: ".5em 1em",
                  marginTop: ".5em",
                  textTransform: "capitalize",
                }}
              >
                <DeleteForeverIcon sx={{ mr: ".5em" }} />
                Delete All Data
              </Button>
            </Box>
            {deleteStatus && (
              <p className="status-message delete">{deleteStatus}</p>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ConfigureSetting;
