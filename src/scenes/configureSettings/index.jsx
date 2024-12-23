import {
  Box,
  Button,
  useTheme,
  Snackbar,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { SnackbarContent } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useEffect } from "react";
import trainingDataJson from "../../data/trainingData.json";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ConfigureSetting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [apiUrl, setApiUrl] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [setBackupStatus] = useState("");
  const [setRestoreStatus] = useState("");
  const [setDeleteStatus] = useState("");

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

  const [trainingData, setTrainingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIntent, setNewIntent] = useState("");
  const [newExample, setNewExample] = useState("");
  const [validationError, setValidationError] = useState(false); // For validation feedback

  // Load initial data from JSON file
  useEffect(() => {
    setTrainingData(trainingDataJson.trainingData);
  }, []);

  const handleAddNewData = () => {
    if (!newIntent || !newExample) {
      setValidationError(true);
      return; // Stop the function if validation fails
    }

    // Add new training data to the state
    setTrainingData([
      ...trainingData,
      { intent: newIntent, example: newExample },
    ]);
    // Close modal, reset input fields and validation error
    setIsModalOpen(false);
    setNewIntent("");
    setNewExample("");
    setValidationError(false);
  };

  const closeModal = () => {
    // Reset modal state when closing
    setIsModalOpen(false);
    setNewIntent("");
    setNewExample("");
    setValidationError(false);
  };

  const handleDeleteTrainingData = (index) => {
    setTrainingData(trainingData.filter((_, i) => i !== index));
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header
          title="CONFIGURE SETTINGS AND TRAIN BOTS"
          subtitle="Configure and Train your all settings"
        />
        <Box>
          <Button
            onClick={() => setIsModalOpen(true)}
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: isNonMobile ? "10px 20px" : ".5em",
              marginBottom: isNonMobile ? "inherit" : "1.5em",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Add new Training Data
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.5em",
        }}
      >
        <Box
          sx={{
            flexGrow: "1",
            width: "100%",
          }}
        >
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
                gap: "2.5em",
                padding: ".5em 0",
                flexWrap: "wrap",
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

          <Box className="settings-section">
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
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: "1",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Available Training Data
                </Typography>
              </Box>
              {trainingData.map((data, i) => (
                <Box
                  key={`${data.intent}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {data.intent}
                    </Typography>
                    <Typography
                      color={colors.blueAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {data.example}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => handleDeleteTrainingData(i)}
                      sx={{ color: "red" }}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            {isModalOpen && (
              <>
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                  }}
                  onClick={closeModal}
                />

                <Box
                  className="modal"
                  sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,
                    width: "90%",
                    maxWidth: "500px",
                    bgcolor: colors.primary[400],
                    p: 4,
                    borderRadius: "8px",
                    boxShadow: 24, // Elevates the modal to make it stand out
                  }}
                >
                  <Box
                    className="modal-content"
                    sx={{ color: colors.grey[100] }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        borderBottom: `1px solid ${colors.primary[300]}`,
                        paddingBottom: ".5em",
                        fontWeight: "600",
                        // paddingLeft: '.5em'
                      }}
                    >
                      Add New Training Data
                    </Typography>

                    <FormControl fullWidth sx={{ m: "1em 0" }}>
                      <InputLabel
                        sx={{
                          color:
                            validationError && !newIntent
                              ? "red"
                              : colors.grey[300],
                          "&.Mui-focused": {
                            color: colors.blueAccent[300],
                            fontWeight: 600,
                            fontSize: "1.2em",
                          },
                        }}
                      >
                        Intent
                      </InputLabel>
                      <Input
                        type="text"
                        value={newIntent}
                        onChange={(e) => setNewIntent(e.target.value)}
                        placeholder="Enter intent"
                        error={validationError && !newIntent}
                        sx={{
                          color: colors.grey[100],
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "red",
                            },
                          borderColor:
                            validationError && !newIntent ? "red" : "inherit",
                        }}
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: "1em 0" }}>
                      <InputLabel
                        sx={{
                          color:
                            validationError && !newExample
                              ? "red"
                              : colors.grey[300],
                          "&.Mui-focused": {
                            color: colors.blueAccent[300],
                            fontWeight: 600,
                            fontSize: "1.2em",
                          },
                        }}
                      >
                        Example
                      </InputLabel>
                      <Input
                        type="text"
                        value={newExample}
                        onChange={(e) => setNewExample(e.target.value)}
                        placeholder="Enter example"
                        error={validationError && !newExample}
                        sx={{
                          color: colors.grey[100],
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "red",
                            },
                          borderColor:
                            validationError && !newExample ? "red" : "inherit",
                        }}
                      />
                    </FormControl>

                    {validationError && (
                      <Typography color="error" sx={{ mb: 2 }}>
                        Please fill out both fields.
                      </Typography>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewData}
                        sx={{
                          backgroundColor: colors.greenAccent[500],
                        }}
                      >
                        <AddIcon sx={{ mr: "10px" }} />
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <SnackbarContent
          sx={{
            backgroundColor:
              snackbarAction === "delete"
                ? colors.redAccent[700]
                : colors.greenAccent[700],
            color: colors.grey[100],
            fontWeight: "bold",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </Box>
  );
};

export default ConfigureSetting;
