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
  IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const TrainBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isTab = useMediaQuery("(max-width:1234px)");
  const isNonMobile = useMediaQuery("(min-width:768px)");

  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Auth token
  const token = sessionStorage.getItem("authToken");

  // Bots
  const [selectedBots, setSelectedBots] = useState([]);
  const [botsList, setBotsList] = useState([]);

  // Feedback states
  const [feedback, setFeedback] = useState("");
  const [feedbackData, setFeedbackData] = useState([]); // For the DataGrid
  const [loadingFeedback, setLoadingFeedback] = useState(false); // For fetching feedback

  // Crawling states
  const [websiteURL, setWebsiteURL] = useState("");
  const [loadingCrawl, setLoadingCrawl] = useState(false);

  // Knowledge base upload states
  const [uploadKnowledgeBase, setUploadKnowledgeBase] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  // Fetch the list of bots on mount
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

  // Fetch feedback when selectedBots changes
  useEffect(() => {
    if (selectedBots.length > 0) {
      fetchFeedback();
    }
  }, [selectedBots]);

  // Handle input changes
  const handleFeedbackInput = (event) => {
    setFeedback(event.target.value);
  };
  const handleuploadKnowledgeBaseChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadKnowledgeBase(file);
    // Reset the file input so the same file can be selected again
    event.target.value = null;
  };

  // Submit feedback for a selected bot
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
          bot_id: selectedBots[0],
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
      console.error("Failed to submit feedback:", error);
      setSnackbarMessage("Failed to submit feedback.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Fetch feedback for the selected bot
  const fetchFeedback = async () => {
    if (!selectedBots.length) {
      setSnackbarMessage("Please select a bot to fetch feedback.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setLoadingFeedback(true);
    try {
      const response = await axios.get(
        "https://app.medicarebot.live/feedback",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            bot_id: selectedBots[0],
          },
        }
      );

      setFeedbackData(response.data || []);
      setSnackbarMessage("Feedback fetched successfully.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setSnackbarMessage("Error fetching feedback data.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Start website crawling
  const startCrawling = async () => {
    if (!selectedBots.length || !websiteURL) {
      setSnackbarMessage("Please select a bot and enter a website URL.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const botId = selectedBots[0];
    setLoadingCrawl(true);
    try {
      const response = await axios.post(
        "https://app.medicarebot.live/crawl",
        {
          bot_id: botId,
          base_url: websiteURL,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSnackbarMessage(
        response.data.message || "Crawling started successfully."
      );
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Crawling API Error:", error.response || error);
      setSnackbarMessage(error.response?.data?.message || "Crawling failed.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoadingCrawl(false);
    }
  };

  // Upload knowledge base file
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
        "https://app.medicarebot.live/knowledge_base/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setSnackbarMessage(
        response.data.message || "File uploaded successfully."
      );
      setSnackbarSeverity("success");
      setUploadKnowledgeBase(null);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Upload Error:", error.response || error);
      setSnackbarMessage(error.response?.data?.message || "Upload failed.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoadingUpload(false);
    }
  };

  // Handle delete action in table (stub)
  const handleDelete = (feedbackId) => {
    // Implement your delete logic here
    console.log("Delete feedback ID:", feedbackId);
  };

  // DataGrid columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      headerAlign: "center",
      minWidth: 50,
      align: "center",
    },
    {
      field: "content",
      headerName: "Feedback",
      flex: 1,
      minWidth: 420,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.15,
      headerAlign: "center",
      minWidth: 100,
      align: "center",
      renderCell: (params) => (
        <Box display="flex" gap=".1em" justifyContent="center">
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            aria-label="delete"
          >
            <DeleteIcon color="error" sx={{ fontSize: "14px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header
          title="TRAIN BOTS"
          subtitle="Train Your bots to perform your tasks"
        />
      </Box>

      {/* Select Bots */}
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
        <Box gridColumn={isTab ? "span 2" : "span 1"} mb={"2em"}>
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

      {/* Feedback System */}
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
          placeholder="Enter your Feedback"
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
        </Box>

        {/* Feedback Table */}
        <Box
          gridColumn="span 12"
          height="450px"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.primary[400],
              borderBottom: `1px solid ${colors.grey[700]}`,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${colors.grey[700]}`,
              backgroundColor: colors.primary[400],
            },
          }}
        >
          {loadingFeedback ? (
            <p style={{ padding: "1em" }}>Loading data...</p>
          ) : (
            <DataGrid
              rows={feedbackData}
              columns={columns}
              getRowId={(row) => row.id}
              rowHeight={40}
              headerHeight={40}
              initialState={{
                sorting: {
                  sortModel: [{ field: "id", sort: "asc" }],
                },
              }}
            />
          )}
        </Box>

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
            onClick={fetchFeedback}
            color="secondary"
            variant="outlined"
            style={{
              borderRadius: "20px",
              marginRight: "8px",
            }}
          >
            Fetch Feedback
          </Button>
        </Box>
      </Box>

      {/* Website Crawling */}
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
        </Box>
        <Box mt="1.5em">
          <Button
            variant="outlined"
            disabled={loadingCrawl}
            onClick={startCrawling}
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
            {loadingCrawl ? (
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

      {/* Upload Knowledge Base File */}
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
                    onChange={handleuploadKnowledgeBaseChange}
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
            disabled={loadingUpload}
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
            {loadingUpload ? (
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
