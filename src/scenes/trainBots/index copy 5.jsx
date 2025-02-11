import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";

const TrainBots = () => {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [selectedBots, setSelectedBots] = useState([]);
  const [botsList, setBotsList] = useState([]);

  const [loadingCrawl, setLoadingCrawl] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [depth, setDepth] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [uploadKnowledgeBase, setUploadKnowledgeBase] = useState(null);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await axios.get(
          "https://app.medicarebot.live/list-bots",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBotsList(response.data.bots);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };
    fetchBots();
  }, [token]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // ✅ Handle File Selection
  const handleUploadKnowledgeBaseChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected File:", file);
      setUploadKnowledgeBase(file);
    }
  };

  // ✅ Upload Knowledge Base File
  const uploadKnowledgeBaseFile = async () => {
    if (!selectedBots.length || !uploadKnowledgeBase) {
      setSnackbarMessage("Please select a bot and choose a file to upload.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setLoadingUpload(true);
    const formData = new FormData();
    formData.append("bot_id", selectedBots[0]);
    formData.append("knowledge_base_file", uploadKnowledgeBase);

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/knowledge_base",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setUploadKnowledgeBase(null);
    } catch (error) {
      console.error("Upload Error:", error);
      setSnackbarMessage(error.response?.data?.message || "Upload failed.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoadingUpload(false);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold">
        Train Bots
      </Typography>

      {/* Bot Selection */}
      <FormControl fullWidth sx={{ mt: 2 }} variant="filled">
        <InputLabel>Select Bots</InputLabel>
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
        >
          {botsList.map((bot) => (
            <MenuItem key={bot.bot_id} value={bot.bot_id}>
              {bot.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Upload Knowledge Base */}
      <Typography variant="h4" fontWeight="bold" mt="2em">
        Upload Knowledge Base File
      </Typography>
      <Box mt={2}>
        <input
          type="file"
          onChange={handleUploadKnowledgeBaseChange}
          accept=".pdf,.doc,.docx"
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            display: "block",
            width: "100%",
          }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={uploadKnowledgeBaseFile}
        disabled={loadingUpload}
        sx={{ mt: 2 }}
      >
        {loadingUpload ? <CircularProgress size={20} /> : "Upload File"}
      </Button>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrainBots;
