import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  TextField,
  Chip,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const TrainBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [crawlSettings, setCrawlSettings] = useState({
    websiteURL: "",
    depth: "",
    uploadData: "",
    includeSitemap: false,
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // api integration for feed back
  const [selectedBots, setSelectedBots] = useState([]);
  const [botsList, setBotsList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [depth, setDepth] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

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

  // 🟢 Start Website Crawling API Call
  const startCrawling = async () => {
    if (!selectedBots.length || !websiteURL || !depth) {
      setSnackbarMessage(
        "Please select a bot, enter a website URL, and choose a depth."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const botId = selectedBots[0]; // Ensure bot_id is valid
    console.log("Starting crawl for bot:", botId);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://app.medicarebot.live/crawl",
        {
          bot_id: botId,
          base_url: websiteURL,
          max_pages: parseInt(depth, 10),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Crawling Response:", response.data);

      setSnackbarMessage(
        response.data.message || "Crawling started successfully."
      );
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Crawling API Error:", error.response || error);
      setSnackbarMessage(error.response?.data?.message || "Crawling failed.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const [uploadKnowledgeBase, setUploadKnowledgeBase] = useState(null);

  const handleuploadKnowledgeBaseChange = (event) => {
    const file = event.target.files[0];
    setUploadKnowledgeBase(file || null);
  };

  const uploadKnowledgeBaseFile = async () => {
    if (!selectedBots.length || !uploadKnowledgeBase) {
      setSnackbarMessage("Please select a bot and choose a file to upload.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("bot_id", selectedBots[0]); // First selected bot
    formData.append("knowledge_base_file", uploadKnowledgeBase);

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/knowledge_base",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", response.data);

      setSnackbarMessage(
        response.data.message || "File uploaded successfully."
      );
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Upload Error:", error.response || error);
      setSnackbarMessage(error.response?.data?.message || "Upload failed.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
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
        <Header
          title="TRAIN BOTS"
          subtitle=" Train Your bots to perform your task"
        />

        <Button
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
            margin: "1em 0",
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
          mt={"1em"}
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
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
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
            <InputLabel id="depth-label" sx={{ color: colors.primary[100] }}>
              Depth
            </InputLabel>
            <Select
              labelId="depth-label"
              id="depth"
              value={depth}
              name="depth"
              onChange={(e) => setDepth(e.target.value)}
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                "& .MuiSelect-icon": { color: colors.grey[100] },
              }}
            >
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="50">50</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt="1.5em">
          <Button
            variant="outlined"
            disabled={loading}
            onClick={startCrawling}
            sx={{
              width: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px", // Add space between spinner and text
              color: colors.blueAccent[300],
              borderColor: colors.blueAccent[300],
              borderRadius: "20px",
              marginRight: "8px",
              "&:hover": {
                background: "linear-gradient(15deg, #062994, #0E72E1)",
                borderColor: colors.blueAccent[700],
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{ color: colors.blueAccent[300] }}
                />
                Crawling...
              </>
            ) : (
              "Start Crawling"
            )}
          </Button>
        </Box>
      </Box>

      <Box mt={"2em"}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color={colors.grey[100]}
        >
          Upload Knowledge Base File
        </Typography>
        <Box
          display="grid"
          gap="30px"
          mt="1em"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          <TextField
            gridColumn="span 2"
            label="Upload Knowledge Base"
            variant="filled"
            type="text"
            name="uploadKnowledgeBase"
            value={uploadKnowledgeBase ? uploadKnowledgeBase.name : ""}
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
                    boxShadow: "none",
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
                    name="uploadKnowledgeBase"
                    onChange={(e) => handleuploadKnowledgeBaseChange(e)}
                  />
                </Button>
              ),
            }}
            sx={{
              position: "relative",
              width: "100%",
              flexGrow: "1",
              gridColumn: "span 2",
              "& .MuiFormLabel-root.Mui-focused": {
                color: colors.blueAccent[500],
                fontWeight: "bold",
              },
              "& .MuiFilledInput-root": {
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              },
            }}
          />
        </Box>
        <Box mt="1.5em">
          <Button
            variant="outlined"
            disabled={loading}
            onClick={uploadKnowledgeBaseFile}
            sx={{
              width: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: colors.blueAccent[300],
              borderColor: colors.blueAccent[300],
              borderRadius: "20px",
              marginRight: "8px",
              "&:hover": {
                background: "linear-gradient(15deg, #062994, #0E72E1)",
                borderColor: colors.blueAccent[700],
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{ color: colors.blueAccent[300] }}
                />
                Uploading...
              </>
            ) : (
              "Upload File"
            )}
          </Button>
        </Box>
      </Box>

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
