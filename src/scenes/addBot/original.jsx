import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";

const AddBot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    setSnackbarOpen(true);
    navigate("/addbot");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBotNameChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleBotImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file ? file.name : "");
  };
  const handleApiKeyChange = (event, handleChange) => {
    handleChange(event);
  };
  const handleChannelChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleStatusChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleUsageFrequencyChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleResponseAccuracyChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleLanguageSupportChange = (event, handleChange) => {
    handleChange(event);
  };

  const handlePerformanceScoreChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleResponseTimeChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleAverageLengthChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleTotalInteractionsChange = (event, handleChange) => {
    handleChange(event);
  };

  const initialValues = {
    botName: "",
    botImage: "",
    apiKey:"",
    channel: "",
    status: "",
    usageFrequency: "",
    responseAccuracy: "",
    languageSupport: "",
    performanceScore: "",
    responseTime: "",
    averageLength: "",
    totalInteractions: "",
  };

  const checkoutSchema = yup.object().shape({
    botName: yup.string().required("Bot Name is required"),
    botImage: yup.string().required("Bot Image is required"),
    apiKey: yup.string().required("API key is required"),
    channel: yup.string().required("Channel is required"),
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ADD NEW BOTS" subtitle="Add your new bots" />
        {/* <Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            ADD NEW BOT
          </Button>
        </Box> */}
      </Box>

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
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
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Bot Name"
                  onBlur={handleBlur}
                  onChange={(e) => handleBotNameChange(e, handleChange)}
                  value={values.botName}
                  name="botName"
                  error={!!touched.botName && !!errors.botName}
                  helperText={touched.botName && errors.botName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  label="Bot Image"
                  variant="filled"
                  type="text"
                  name="botImage"
                  value={selectedImage}
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
                          name="botImage"
                          onChange={(e) => {
                            handleBotImageUpload(e);
                            handleChange(e);
                          }}
                        />
                      </Button>
                    ),
                  }}
                  onBlur={handleBlur}
                  error={!!touched.botImage && !!errors.botImage}
                  helperText={touched.botImage && errors.botImage}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="API Key"
                  onBlur={handleBlur}
                  onChange={(e) => handleApiKeyChange(e, handleChange)}
                  value={values.apiKey}
                  name="apiKey"
                  error={!!touched.apiKey && !!errors.apiKey}
                  helperText={touched.apiKey && errors.apiKey}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
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
                  <InputLabel id="channel" sx={{ color: colors.primary[100] }}>
                    Channel
                  </InputLabel>
                  <Select
                    labelId="channel"
                    id="channel"
                    value={values.channel}
                    name="channel"
                    onChange={(e) => handleChannelChange(e, handleChange)}
                    onBlur={handleBlur}
                    error={!!touched.channel && !!errors.channel}
                  >
                    <MenuItem value="Telegram">Telegram</MenuItem>
                    <MenuItem value="Webchat">Webchat</MenuItem>
                    <MenuItem value="Messanger">Messanger</MenuItem>
                    <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </Select>
                  {touched.channel && errors.channel && (
                    <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                      {errors.channel}
                    </Box>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                >
                  <InputLabel id="status" sx={{ color: colors.primary[100] }}>
                    Status
                  </InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={values.status}
                    name="status"
                    onChange={(e) => handleStatusChange(e, handleChange)}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                  {touched.status && errors.status && (
                    <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                      {errors.status}
                    </Box>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                >
                  <InputLabel
                    id="usage-frequency"
                    sx={{ color: colors.primary[100] }}
                  >
                    Usage Frequency
                  </InputLabel>
                  <Select
                    labelId="usage-frequency"
                    id="usage"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleUsageFrequencyChange(e, handleChange)
                    }
                    value={values.usageFrequency}
                    name="usageFrequency"
                    error={!!touched.usageFrequency && !!errors.usageFrequency}
                    helperText={touched.usageFrequency && errors.usageFrequency}
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                  {touched.status && errors.status && (
                    <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                      {errors.status}
                    </Box>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Response Accuracy"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    handleResponseAccuracyChange(e, handleChange)
                  }
                  value={values.responseAccuracy}
                  name="responseAccuracy"
                  error={
                    !!touched.responseAccuracy && !!errors.responseAccuracy
                  }
                  helperText={
                    touched.responseAccuracy && errors.responseAccuracy
                  }
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                >
                  <InputLabel
                    id="language-support"
                    sx={{ color: colors.primary[100] }}
                  >
                    Language Support
                  </InputLabel>
                  <Select
                    labelId="language-support"
                    id="languageSupport"
                    value={values.languageSupport}
                    name="languageSupport"
                    onChange={(e) =>
                      handleLanguageSupportChange(e, handleChange)
                    }
                    onBlur={handleBlur}
                    error={
                      !!touched.languageSupport && !!errors.languageSupport
                    }
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Italian">Italian</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    <MenuItem value="German">German</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                  </Select>
                  {touched.languageSupport && errors.languageSupport && (
                    <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                      {errors.languageSupport}
                    </Box>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Performance Score"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    handlePerformanceScoreChange(e, handleChange)
                  }
                  value={values.performanceScore}
                  name="performanceScore"
                  error={
                    !!touched.performanceScore && !!errors.performanceScore
                  }
                  helperText={
                    touched.performanceScore && errors.performanceScore
                  }
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Response Time"
                  onBlur={handleBlur}
                  onChange={(e) => handleResponseTimeChange(e, handleChange)}
                  value={values.responseTime}
                  name="responseTime"
                  error={!!touched.responseTime && !!errors.responseTime}
                  helperText={touched.responseTime && errors.responseTime}
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Average Length"
                  onBlur={handleBlur}
                  onChange={(e) => handleAverageLengthChange(e, handleChange)}
                  value={values.averageLength}
                  name="averageLength"
                  error={!!touched.averageLength && !!errors.averageLength}
                  helperText={touched.averageLength && errors.averageLength}
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Total Interactions"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    handleTotalInteractionsChange(e, handleChange)
                  }
                  value={values.totalInteractions}
                  name="totalInteractions"
                  error={
                    !!touched.totalInteractions && !!errors.totalInteractions
                  }
                  helperText={
                    touched.totalInteractions && errors.totalInteractions
                  }
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="start" mt="2em">
                <Button
                  type="submit"
                  color="secondary"
                  variant="outlined"
                  style={{
                    borderRadius: "20px",
                    marginRight: "8px",
                  }}
                >
                  <AddIcon sx={{ mr: ".5em" }} />
                  Create New Bot
                </Button>
              </Box>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Alert
                  onClose={handleSnackbarClose}
                  severity="success"
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.greenAccent[200],
                    fontWeight: "bold",
                  }}
                >
                  Congratulations, you have created bot name:{" "}
                  <strong>{values.botName}</strong>
                </Alert>
              </Snackbar>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddBot;
