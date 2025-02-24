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
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // API States
  const [selectedBots, setSelectedBots] = useState([]);
  const [botsList, setBotsList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [depth, setDepth] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  const token = sessionStorage.getItem("authToken");

  // Fetch Bots List
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

  // Handle Feedback Input
  const handleFeedbackInput = (event) => {
    setFeedback(event.target.value);
  };

  // Submit Feedback
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

    setLoading(true);
    try {
      const response = await axios.post(
        "https://app.medicarebot.live/crawl",
        {
          bot_id: selectedBots[0], // Assuming only one bot selected
          base_url: websiteURL,
          max_pages: parseInt(depth), // Convert depth to number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage(
        response.data.message || "Crawling started successfully."
      );
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("Crawling failed. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TRAIN BOTS"
          subtitle="Train Your bots to perform tasks"
        />

        <Button
          sx={{
            background: "linear-gradient(45deg, #062994, #0E72E1)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: isNonMobile ? "10px 20px" : ".5em",
            "&:hover": { backgroundColor: colors.primary[400] },
          }}
        >
          <SettingsIcon sx={{ mr: "10px" }} />
          Configure
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        <Box gridColumn={"span 4"}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Configure Bots
          </Typography>

          <FormControl fullWidth sx={{ mt: "1em" }} variant="filled">
            <InputLabel sx={{ color: colors.grey[100] }}>
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
              sx={{ backgroundColor: colors.primary[400] }}
            >
              {botsList.map((bot) => (
                <MenuItem key={bot.bot_id} value={bot.bot_id}>
                  {bot.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box mt="2em">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Website Crawling
        </Typography>

        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            label="Enter Website URL"
            variant="filled"
            type="url"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            sx={{ gridColumn: "span 2", backgroundColor: colors.primary[400] }}
          />

          <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
            <InputLabel>Depth</InputLabel>
            <Select
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              sx={{ backgroundColor: colors.primary[400] }}
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
            onClick={startCrawling}
            disabled={loading}
            sx={{
              color: colors.blueAccent[300],
              borderColor: colors.blueAccent[300],
              borderRadius: "20px",
            }}
          >
            {loading ? (
              <CircularProgress
                size={20}
                sx={{ color: colors.blueAccent[300] }}
              />
            ) : (
              "Start Crawling"
            )}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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
