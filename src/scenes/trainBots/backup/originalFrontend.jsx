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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import ExtensionIcon from "@mui/icons-material/Extension";
import useMediaQuery from "@mui/material/useMediaQuery";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [configResponse, setConfigResponse] = useState("");
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

  const [crawlSettings, setCrawlSettings] = useState({
    websiteURL: "",
    depth: "",
    uploadData: "",
    includeSitemap: false,
  });

  const [crawlFileName, setCrawlFileName] = useState("Choose a file...");

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

  const startCrawling = () => {
    // Handle website crawling
  };

  const customizeBot = () => {
    // Handle bot customization
  };

  const generateCode = () => {
    // Handle code generation
  };

  const fetchAnalytics = () => {
    // Fetch analytics
  };

  const fetchFeedback = () => {
    // Fetch user feedback
  };

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

  // customise bot, here okey
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

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header title="CONFIGURE BOTS" subtitle="Set up and configure bots" />

        <Button
          onClick={configureBots}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
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

      <Box>
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
              "&.Mui-focused": { color: colors.grey[100], fontWeight: "bold" },
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
              // width: "30%",
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
          <Autocomplete
            sx={{
              // width: "70%",
              width: isNonMobile ? "70%" : "100%",
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

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.greenAccent[200],
              fontWeight: "bold",
            }}
          >
            {configResponse}
          </Alert>
        </Snackbar>
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
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1em",
            padding: ".5em 0",
          }}
        >
          <TextField
            label="Enter Website URL"
            variant="filled"
            type="text"
            name="websiteURL"
            value={crawlSettings.websiteURL}
            onChange={(e) =>
              setCrawlSettings({ ...crawlSettings, websiteURL: e.target.value })
            }
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
            label="Crawl Depth"
            variant="filled"
            type="number"
            name="depth"
            value={crawlSettings.depth}
            onChange={handleCrawlSettingChange}
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
            label="Upload Data Files"
            variant="filled"
            type="text"
            name="uploadData"
            value={crawlFileName}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "transparent",
                    color: "white",
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
                    name="uploadData"
                    onChange={handleCrawlDataUpload}
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
          >
            Start Crawling
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
      <Box
        sx={{
          padding: ".5em 0",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          mt={5}
          color={colors.grey[100]}
        >
          Code Integration
        </Typography>
        <TextField
          label="Custom Platform"
          placeholder="Enter custom platform (e.g., WordPress)"
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

        <Button
          onClick={generateCode}
          color="secondary"
          variant="outlined"
          style={{
            borderRadius: "20px",
            marginRight: "8px",
          }}
        >
          Generate Code Snippet
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
        <div
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
        </div>
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
          User Feedback
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

          <Button
            onClick={fetchFeedback}
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
            Fetch Feedback
          </Button>
          <p>{feedbackList}</p>
        </div>
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
          sx={{ mt: "1em" }}
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
    </Box>
  );
};

export default Settings;
