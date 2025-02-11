import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  TextField,
  Chip,
  Snackbar,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  // FormGroup,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ExtensionIcon from "@mui/icons-material/Extension";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

// import SaveIcon from "@mui/icons-material/Save";
// import BackupIcon from "@mui/icons-material/Backup";
// import RestoreIcon from "@mui/icons-material/Restore";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { SnackbarContent } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

const TrainBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [
    // configResponse,
    setConfigResponse,
  ] = useState("");

  const [advancedSettings, setAdvancedSettings] = useState({
    responseTime: "",
    supportedLanguages: [],
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const channelOptions = [
    "Webchat",
    "Email",
    "WhatsApp",
    "Messenger",
    "Telegram",
  ];
  const languageOptions = ["English", "Spanish", "French", "German", "Chinese"];

  const configureBots = () => {
    setConfigResponse("Bots have been configured successfully!");
    setOpenSnackbar(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvancedSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [crawlingStatus] = useState("");
  const [analyticsData] = useState("");
  const [feedbackList] = useState("");
  const [activityLogs] = useState("");
  const [loadingSnippet, setLoadingSnippet] = useState(false);
  const [snippetData, setSnippetData] = useState("");
  const [summaryId, setSummaryId] = useState(null);

  const [crawlSettings, setCrawlSettings] = useState({
    websiteURL: "",
    depth: "",
    uploadData: "",
    includeSitemap: false,
  });

  const [crawlFileName, setCrawlFileName] = useState("Choose a file...");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const handleCrawlDataUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCrawlFileName(selectedFile.name);
      setCrawlSettings({ ...crawlSettings, uploadData: selectedFile });
    } else {
      setCrawlFileName("Choose a file...");
    }
  };

  const [botAppearance, setBotAppearance] = useState({
    colorScheme: "",
    fontStyle: "",
  });
  const [feedback, setFeedback] = useState("");

  const startCrawling = async () => {
    setLoading(true);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setSnackbarMessage("Authorization token is missing. Please log in.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/crawl",
        {
          base_url: crawlSettings.websiteURL,
          include_sitemap: crawlSettings.includeSitemap,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Crawling completed") {
        setSnackbarMessage("Crawling completed successfully!");
        setSnackbarSeverity("success");

        // Set summary_id dynamically from response
        setSummaryId(response.data.summary_id);
      } else {
        setSnackbarMessage("An error occurred while crawling.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const fetchSnippet = async (summaryId) => {
    setLoadingSnippet(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      setSnackbarMessage("Authorization token is missing. Please log in.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoadingSnippet(false);
      return;
    }

    try {
      const response = await fetch(
        `https://app.medicarebot.live/generate_snippet/${summaryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSnippetData(data.snippet); // Assuming the server returns a "snippet" field
        setSnackbarMessage("Snippet fetched successfully!");
        setSnackbarSeverity("success");
      } else {
        const errorData = await response.json();
        setSnackbarMessage(
          errorData.message || "An error occurred while fetching the snippet."
        );
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Unable to fetch snippet. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoadingSnippet(false);
    }
  };

  const customizeBot = () => {
    // Handle bot customization
  };

  const fetchAnalytics = () => {
    // Fetch analytics
  };

  // const fetchFeedback = () => {
  //   // Fetch user feedback
  // };

  const fetchLogs = () => {
    // Fetch activity logs
  };

  const saveCrawlingSettings = () => {
    // Save crawling settings
  };

  const submitFeedback = () => {
    // Handle feedback submission
  };

  const exportAnalytics = () => {
    // Export analytics data
  };

  const exportLogs = () => {
    // Export activity logs
  };

  const handleCrawlSettingChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCrawlSettings((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBotAppearanceChange = (e) => {
    const { name, value } = e.target;
    setBotAppearance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeedbackInput = (e) => {
    setFeedback(e.target.value);
  };

  // customise bot, here okeyloadingSnippet
  const [customizeSettings, setCustomizeSettings] = useState("");
  const [fileName, setFileName] = useState("Choose a file...");

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setCustomizeSettings({ ...customizeSettings, avatar: selectedFile });
    } else {
      setFileName("Choose a file...");
    }
  };

  // this is for icon, okey
  const [iconFileName, setIconFileName] = useState("Choose an icon...");

  const handleIconChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIconFileName(selectedFile.name);
      setCustomizeSettings({ ...customizeSettings, icon: selectedFile });
    } else {
      setIconFileName("Choose an icon...");
    }
  };

  // const [apiUrl, setApiUrl] = useState("");
  // const [emailNotifications, setEmailNotifications] = useState(true);
  // const [smsNotifications, setSmsNotifications] = useState(false);

  // const [setBackupStatus] = useState("");
  // const [setRestoreStatus] = useState("");
  // const [setDeleteStatus] = useState("");

  // // const [snackbarAction, setSnackbarAction] = useState("");

  // const handleSnackbar = (message, actionType) => {
  //   setSnackbarMessage(message);
  //   setOpenSnackbar(true);
  //   // setSnackbarAction(actionType);
  //   setTimeout(() => setOpenSnackbar(false), 3000); // Close Snackbar after 3 seconds
  // };

  // const handleSaveSettings = () => {
  //   handleSnackbar(`API URL saved: ${apiUrl}`);
  // };

  // const handleSaveNotifications = () => {
  //   handleSnackbar(
  //     `Notifications saved:\nEmail: ${
  //       emailNotifications ? "On" : "Off"
  //     }\nSMS: ${smsNotifications ? "On" : "Off"}`
  //   );
  // };

  // const handleBackupData = () => {
  //   setBackupStatus("Backup successful.");
  //   handleSnackbar("Backup successful.");
  // };

  // const handleRestoreData = () => {
  //   // Simulating data restoration
  //   setRestoreStatus("Data restored.");
  //   handleSnackbar("Data restored.");
  // };

  // const handleDeleteData = () => {
  //   if (
  //     window.confirm(
  //       "Are you sure you want to delete all data? This action cannot be undone."
  //     )
  //   ) {
  //     setDeleteStatus("All data deleted.");
  //     handleSnackbar("All data deleted.", "delete");
  //   }
  // };

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn={"span 4"}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: ".25em" }}
          >
            Configure Bots
          </Typography>

          <FormControl fullWidth sx={{ mt: "1em" }} variant="filled">
            <InputLabel
              sx={{
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              }}
            >
              Select Channels
            </InputLabel>
            <Select
              multiple
              value={selectedChannels}
              onChange={(e) => setSelectedChannels(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              sx={{
                backgroundColor: colors.primary[400],
                "& .Mui-focused": {
                  border: `1px solid ${colors.grey[100]}`,
                },
              }}
            >
              {channelOptions.map((channel) => (
                <MenuItem
                  key={channel}
                  value={channel}
                  sx={{
                    color: colors.grey[100],
                    "&.Mui-selected": {
                      backgroundColor: colors.blueAccent[800],
                      color: colors.grey[50],
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: colors.blueAccent[700],
                    },
                    "&:hover": {
                      backgroundColor: colors.blueAccent[900],
                      color: colors.grey[100],
                    },
                  }}
                >
                  {channel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* User Feedback */}
      <Box
        sx={{
          padding: "1em 0",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color={colors.grey[100]}
          sx={{ mt: "1em" }}
        >
          Feedback System
        </Typography>
        <TextField
          value={feedback}
          onChange={handleFeedbackInput}
          label="Feedback"
          placeholder="Enter you Feedback"
          multiline
          rows={10}
          variant="outlined"
          sx={{
            width: "100%",
            margin: "1.5em 0",
            backgroundColor: colors.primary[400],
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.primary[400],
              },
              "&:hover fieldset": {
                borderColor: colors.greenAccent[700],
                borderRadius: "0",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[700],
                borderRadius: "0",
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.grey[100],
              fontWeight: "bold",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.grey[100],
            },
            "& textarea": {
              fontFamily: "Inter, sans-serif",
              color: "inherit",
            },
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1em",
            padding: ".5em",
          }}
        >
          <Button
            onClick={submitFeedback}
            color="secondary"
            variant="outlined"
            style={{
              borderRadius: "20px",
              marginRight: "8px",
            }}
          >
            Submit Feedback
          </Button>

          
          <p>{feedbackList}</p>
        </div>
      </Box>
    </Box>
  );
};

export default TrainBots;
