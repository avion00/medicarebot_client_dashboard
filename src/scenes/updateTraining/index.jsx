import {
  Box,
  Button,
  useTheme,
  Typography,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import trainingDataJson from "../../data/trainingData.json";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const handleDeleteData = (index) => {
    setTrainingData(trainingData.filter((_, i) => i !== index));
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="UPDATE TRAINING" subtitle="Train your Bot" />
        <Box>
          <Button
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add new Training Data
          </Button>
        </Box>
      </Box>

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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
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
                  onClick={() => handleDeleteData(i)}
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
              <Box className="modal-content" sx={{ color: colors.grey[100] }}>
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
  );
};

export default Dashboard;
