import React, { useState, useEffect } from "react";
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
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
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
    depth: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
  // const [feedbackList] = useState("");
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

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const [botAppearance, setBotAppearance] = useState({
    colorScheme: "",
    fontStyle: "",
  });

  const startCrawling = async () => {
    setLoading(true);

    const token = sessionStorage.getItem("authToken");

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

  const exportAnalytics = () => {
    // Export analytics data
  };

  const exportLogs = () => {
    // Export activity logs
  };

  const handleDepthChange = () => {
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

  // api integration for feed back
  const [selectedBots, setSelectedBots] = useState([]);
  const [botsList, setBotsList] = useState([]);
  const [feedback, setFeedback] = useState("");

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await axios.get(
          "https://app.medicarebot.live/list-bots",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBotsList(response.data.bots);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };

    fetchBots();
  }, [token]);

  const handleFeedbackInput = (event) => {
    setFeedback(event.target.value);
  };

  const submitFeedback = async () => {
    if (!selectedBots.length || !feedback) {
      setSnackbarMessage("Please select a bot and enter feedback.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/feedback",
        {
          content: feedback,
          bot_id: selectedBots[0], // Assuming only one bot is selected
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFeedback("");
      setSelectedBots([]);
    } catch (error) {
      setSnackbarMessage("Failed to submit feedback.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const [depth, setDepth] = useState([]);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header
          title="TRAIN BOTS"
          subtitle=" Train Your bots to perform your task"
        />

        <Button
          onClick={configureBots}
          sx={{
            background: "linear-gradient(45deg, #062994, #0E72E1)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: isNonMobile ? "10px 20px" : ".5em",
            marginBottom: isNonMobile ? "inherit" : "1.5em",
            "&:hover": {
              backgroundColor: colors.primary[400],
            },
          }}
        >
          <SettingsIcon sx={{ mr: "10px" }} />
          Configure
        </Button>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn={"span 4"}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
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
              Select Bots
            </InputLabel>
            <Select
              multiple
              value={selectedBots}
              onChange={(e) => setSelectedBots(e.target.value)}
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
              {botsList.map((bot) => (
                <MenuItem
                  key={bot.bot_id}
                  value={bot.bot_id}
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
                  {bot.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* User Feedback */}
      <Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color={colors.grey[100]}
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
                borderColor: colors.blueAccent[500],
                borderRadius: "0",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
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

        <Box
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
          {/* <p>{feedbackList}</p> */}
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: "1.5em" }}
        >
          Website Crawling
        </Typography>

        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          <TextField
            label="Enter Website URL"
            variant="filled"
            type="url"
            name="websiteURL"
            value={crawlSettings.websiteURL}
            onChange={(e) =>
              setCrawlSettings({ ...crawlSettings, websiteURL: e.target.value })
            }
            sx={{
              gridColumn: "span 2",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />

          <FormControl
            fullWidth
            variant="filled"
            sx={{
              gridColumn: "span 2",
              "& .MuiFormLabel-root.Mui-focused": {
                color: colors.blueAccent[500],
                fontWeight: "bold",
              },
            }}
          >
            <InputLabel id="status" sx={{ color: colors.primary[100] }}>
              Depth
            </InputLabel>
            <Select
              labelId="depth"
              id="depth"
              value={depth}
              name="depth"
              onChange={(e) => setSelectedBots(e.target.value)}
            >
              <MenuItem value="1">Low</MenuItem>
              <MenuItem value="2">Medium</MenuItem>
              <MenuItem value="3">High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexWrap: "wrap",
            gap: "1em",
            margin: ".5em 0",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={crawlSettings.includeSitemap}
                onChange={handleCrawlSettingChange}
                name="includeSitemap"
                sx={{
                  color: colors.grey[100],
                  "&.Mui-checked": {
                    color: colors.blueAccent[300],
                  },
                }}
              />
            }
            label="Include Sitemap"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".2em",
              marginLeft: isNonMobile ? "1em" : 0,
            }}
          />
          <Button
            onClick={startCrawling}
            color="secondary"
            variant="outlined"
            style={{
              borderRadius: "20px",
              marginRight: "8px",
            }}
            disabled={loading}
          >
            {loading ? "Crawling..." : "Start Crawling"}
          </Button>

          <Button
            onClick={saveCrawlingSettings}
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
            Save Crawling Settings
          </Button>

          <p>{crawlingStatus}</p>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          mt={5}
          color={colors.grey[100]}
        >
          Advanced Bot Settings
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1em",
            mt: "1em",
            flexWrap: isNonMobile ? "nowrap" : "wrap",
          }}
        >
          <TextField
            label="Response Time (ms)"
            variant="filled"
            type="number"
            name="responseTime"
            value={advancedSettings.responseTime}
            onChange={handleInputChange}
            sx={{
              width: isNonMobile ? "30%" : "100%",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />
          <TextField
            label="Crawl Depth"
            variant="filled"
            type="number"
            name="depth"
            value={crawlSettings.depth}
            onChange={handleCrawlSettingChange}
            sx={{
              width: isNonMobile ? "30%" : "100%",
              flexGrow: "1",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />

          <Autocomplete
            sx={{
              // width: "70%",
              width: isNonMobile ? "30%" : "100%",
            }}
            multiple
            options={languageOptions}
            value={advancedSettings.supportedLanguages}
            onChange={(event, newValue) =>
              setAdvancedSettings({
                ...advancedSettings,
                supportedLanguages: newValue,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Supported Languages"
                placeholder="Add languages"
                sx={{
                  backgroundColor: colors.primary[400],
                  "& .MuiFilledInput-root": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .Mui-focused": {
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[100],
                    "&.Mui-focused": {
                      color: colors.grey[100],
                      backgroundColor: colors.primary[400],
                      fontWeight: "bold",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.grey[100],
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>

      <Box
        style={{
          padding: ".5em 0",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color={colors.grey[100]}
          sx={{ mt: "1em" }}
        >
          Bot Customization
        </Typography>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1em",
            padding: "1em 0",
          }}
        >
          <TextField
            label="Avatar"
            variant="filled"
            type="text"
            name="avatar"
            value={fileName}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "transparent",
                    color: colors.grey[100],
                    textTransform: "none",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {/* The hidden file input */}
                  <input
                    type="file"
                    hidden
                    name="avatar"
                    onChange={handleAvatarChange}
                  />
                </Button>
              ),
            }}
            sx={{
              position: "relative",
              width: "200px",
              flexGrow: "1",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />

          <TextField
            label="Icon"
            variant="filled"
            type="text"
            name="icon"
            value={iconFileName}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "transparent",
                    color: colors.grey[100],
                    textTransform: "none",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <input
                    type="file"
                    hidden
                    name="icon"
                    onChange={handleIconChange}
                    accept="image/*"
                  />
                </Button>
              ),
            }}
            sx={{
              position: "relative",
              width: "200px",
              flexGrow: "1",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />
          <TextField
            label="Color Scheme"
            variant="filled"
            type="text"
            name="colorScheme"
            value={botAppearance.colorScheme}
            onChange={handleBotAppearanceChange}
            placeholder="e.g., #ff0000"
            sx={{
              width: "200px",
              flexGrow: "1",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />
          <TextField
            label="Font Style"
            variant="filled"
            type="text"
            name="fontStyle"
            value={botAppearance.fontStyle}
            onChange={handleBotAppearanceChange}
            placeholder="e.g., Arial"
            sx={{
              width: "200px",
              flexGrow: "1",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
            }}
          />
        </Box>
        <Button
          onClick={customizeBot}
          color="secondary"
          variant="outlined"
          style={{
            borderRadius: "20px",
            marginRight: "8px",
          }}
        >
          <ExtensionIcon sx={{ marginRight: "8px" }} />
          Customize bot
        </Button>
      </Box>

      {/* Code Integration */}
      <Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          mt={5}
          color={colors.grey[100]}
        >
          Code Integration
        </Typography>
        <Box
          sx={{
            height: "200px",
            overflow: "auto",
            padding: "1em",
            m: "1em 0",
            width: "100%",
            backgroundColor: colors.primary[400],
          }}
        >
          {snippetData ||
            "No snippet fetched yet. Click a button to fetch one."}
        </Box>

        <Button
          onClick={() => fetchSnippet(summaryId)}
          disabled={!summaryId || loadingSnippet}
          color="secondary"
          variant="outlined"
          style={{
            borderRadius: "20px",
            marginRight: "8px",
          }}
        >
          {loadingSnippet ? "Generating..." : " Generate Code Snippet"}
        </Button>
      </Box>

      {/* Bot Analytics */}
      <Box
        sx={{
          padding: "1em 0",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: "1.5em" }}
        >
          Bot Analytics
        </Typography>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1em",
            padding: ".5em",
          }}
        >
          <Button
            onClick={fetchAnalytics}
            color="secondary"
            variant="outlined"
            style={{
              borderRadius: "20px",
              marginRight: "8px",
            }}
          >
            Fetch Analytics
          </Button>
          <Button
            onClick={exportAnalytics}
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
            Export Analytics
          </Button>
        </Box>
        <Box
          sx={{
            height: "200px",
            width: "100%",
            backgroundColor: colors.primary[400],
          }}
        >
          {analyticsData}
        </Box>
      </Box>

      {/* Activity Logs */}
      <Box
        style={{
          padding: "1em 0",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color={colors.grey[100]}
          sx={{ mt: "1em", padding: " 0 .25em" }}
        >
          Activity Logs
        </Typography>
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
            onClick={fetchLogs}
            color="secondary"
            variant="outlined"
            style={{
              borderRadius: "20px",
              marginRight: "8px",
            }}
          >
            Fetch Logs
          </Button>
          <Button
            onClick={exportLogs}
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
            Export Logs
          </Button>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              backgroundColor: colors.primary[400],
            }}
          >
            {activityLogs}
          </Box>
        </div>
      </Box>

      {/* configure settings */}
      {/* <Box>
        <Box
          className="settings-section"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            color={colors.grey[100]}
            sx={{ mt: "1em", mb: ".5em" }}
          >
            General Settings
          </Typography>

          <TextField
            label="API URL"
            variant="filled"
            type="url"
            name="apiURL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            sx={{
              flexGrow: "1",
              m: "1em 0",
              backgroundColor: colors.primary[400],
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "&.Mui-focused": {
                  backgroundColor: colors.primary[400],
                  borderColor: colors.grey[100],
                },
                "&:hover": {
                  backgroundColor: colors.primary[400],
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                  fontWeight: "bold",
                },
              },
              "& .MuiInputBase-input": {
                color: colors.grey[100],
              },
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
          mt={3}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            color={colors.grey[100]}
            sx={{ mt: "1em", mb: ".5em" }}
          >
            Notification Preferences
          </Typography>
          <Box
          sx={{
            m: "0 1em",
          }}>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={emailNotifications}
                      onChange={() =>
                        setEmailNotifications(!emailNotifications)
                      }
                      sx={{
                        "&.Mui-checked": { color: "#0E72E1" },
                      }}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={smsNotifications}
                      onChange={() => setSmsNotifications(!smsNotifications)}
                      sx={{
                        "&.Mui-checked": { color: "#0E72E1" },
                      }}
                    />
                  }
                  label="SMS Notifications"
                />
              </FormGroup>
            </FormControl>
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

        <Box className="settings-section" mt={5}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            color={colors.grey[100]}
            sx={{ mt: "1em", mb: ".5em" }}
          >
            Data Management
          </Typography>

          <Box
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
          </Box>
        </Box>
      </Box> */}

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrainBots;
