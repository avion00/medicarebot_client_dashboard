import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

import React, { useState } from "react";
import "./style.css"; // Import your CSS file for additional styles

const Dashboard = () => {
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
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

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
        <section className="settings">
          <header>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                padding: "1em 1.5em",
                backgroundColor: "#0f3c4c",
                color: "#fff",
                margin: "0",
              }}
            >
              Settings
            </h1>
          </header>
          <div
            className="settings-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5em",
              padding: "2em 0",
            }}
          >
            <div
              className="settings-section"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                General Settings
              </h3>
              <label
                htmlFor="api-url"
                style={{
                  fontSize: ".75em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  marginLeft: "1em",
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
                  padding: ".75em 1em",
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderRadius: ".35em",
                  fontFamily: "Inter, sans-serif",
                  fontSize: ".9em",
                }}
              />
              <button
                className="save-settings"
                onClick={handleSaveSettings}
                style={{
                  padding: ".75em 1.5em",
                  width: "fit-content",
                  marginBottom: "2.5em",
                  fontSize: ".9em",
                  marginTop: ".5em",
                }}
              >
                Save Settings
              </button>
            </div>

            <div
              className="settings-section"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                }}
              >
                Notification Preferences
              </h3>
              <label
                htmlFor="email-notifications"
                className="notification-label"
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  marginLeft: "1em",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                Email Notifications
              </label>
              <label
                htmlFor="sms-notifications"
                className="notification-label"
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  marginLeft: "1em",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  id="sms-notifications"
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                />
                SMS Notifications
              </label>
              <button
                className="save-notifications"
                onClick={handleSaveNotifications}
                style={{
                  padding: ".75em 1.5em",
                  width: "fit-content",
                  fontSize: ".9em",
                  margin: ".5em 0",
                  marginBottom: "2.5em",
                }}
              >
                Save Notification Preferences
              </button>
            </div>

            <div className="settings-section">
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
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
                <button
                  className="data-action"
                  onClick={handleBackupData}
                  style={{
                    padding: ".75em 1.5em",
                    width: "fit-content",
                    fontSize: ".9em",
                    margin: ".5em 0",
                  }}
                >
                  Backup Data
                </button>
                {backupStatus && (
                  <p className="status-message">{backupStatus}</p>
                )}

                <button
                  className="data-action"
                  onClick={handleRestoreData}
                  style={{
                    padding: ".75em 1.5em",
                    width: "fit-content",
                    fontSize: ".9em",
                    margin: ".5em 0",
                  }}
                >
                  Restore Data
                </button>
                {restoreStatus && (
                  <p className="status-message">{restoreStatus}</p>
                )}

                <button
                  className="data-action delete-data"
                  onClick={handleDeleteData}
                  style={{
                    padding: ".75em 1.5em",
                    width: "fit-content",
                    fontSize: ".9em",
                    margin: ".5em 0",
                  }}
                >
                  Delete All Data
                </button>
                {deleteStatus && (
                  <p className="status-message delete">{deleteStatus}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </Box>
    </Box>
  );
};

export default Dashboard;
