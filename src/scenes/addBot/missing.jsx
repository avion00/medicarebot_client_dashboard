import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
  IconButton,
  Typography,
  // Slider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
// import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import initialData from "./data.json";
import axios from "axios";

const steps = [
  { id: 1, label: "Bot Details", content: "Please fill out the form" },
  {
    id: 2,
    label: "Configure Bot Behaviour",
    content: "Please fill as the form",
  },
];

const AddBot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const filePlaceholder = new File([""], "placeholder.txt", {
    type: "text/plain",
  });

  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    // Append fields
    formData.append("name", values.botName);
    formData.append(
      "avatar",
      values.avatar || new File([""], "placeholder.jpg")
    );
    formData.append("type", values.channel);
    formData.append("description", values.description);
    formData.append("role_description", values.detailedRoleDescription);
    // formData.append("language_support", JSON.stringify(values.languageSupport));
    formData.append("pretrained_template", values.preTrainedTemplate);
    formData.append("expectation", values.ExpectedOutcome);
    formData.append(
      "knowledge_base_file",
      values.uploadKnowledgeBase || new File([""], "placeholder.txt")
    );

    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://46.202.153.94:5000/create_bot",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Success:", response.data.message);
      } else {
        throw new Error(response.data.message || "Request failed.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };


  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const initialValues = {
    botName: "",
    avatar: "",
    channel: "",
    description: "",
    detailedRoleDescription: "",
    // languageSupport: "",
    preTrainedTemplate: "",
    ExpectedOutcome: "",
    uploadKnowledgeBase: "",
  };

  const checkoutSchema = yup.object().shape({
    botName: yup.string().required("Bot Name is required"),
    avatar: yup.string().required("avatar Name is required"),

    channel: yup.string().required("Channel is required"),
    description: yup.string().required("Description is required"),
    detailedRoleDescription: yup
      .string()
      .required("Detailed Role Description is required"),
    // languageSupport: yup.string().required("Language Support is required"),
    preTrainedTemplate: yup.string().nullable(), // Optional field
    ExpectedOutcome: yup.string().required("Expected Outcome is required"),
    uploadKnowledgeBase: yup.string().nullable(), // Optional field
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    setConversation(initialData);
  }, []);

  // Sthis tate for storing the conversation okey
  const [conversation, setConversation] = useState([
    { sender: "bot", message: "Hello! How can I help you today?" },
  ]);

  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <Box m="20px">
      <Box>
        <Header title="ADD NEW BOTS" subtitle="Add your new bots" />
      </Box>

      <Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="4em"
          mb="2em"
        >
          {steps.map((step) => (
            <Box key={step.id} textAlign="center" position="relative">
              <IconButton
                size="medium"
                style={{
                  backgroundColor:
                    currentStep === step.id
                      ? colors.blueAccent[100]
                      : colors.primary[500],
                  border: `2px solid ${colors.grey[400]}`,
                  width: "50px",
                  height: "50px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color:
                    currentStep === step.id
                      ? colors.grey[900]
                      : colors.grey[100],
                }}
                onClick={() => setCurrentStep(step.id)}
              >
                {step.id}
              </IconButton>
              {step.id < steps.length && (
                <Box
                  sx={{
                    position: "absolute",
                    left: "0em",
                    width: "40px",
                    height: "4px",
                    backgroundColor:
                      currentStep >= step.id + 1
                        ? colors.blueAccent[400]
                        : "#dae6fe",
                    marginTop: "-1.9em",
                    marginLeft: "4.2em",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        <Typography variant="h4" fontWeight="bold" mt="2em" mb="1em">
          {steps[currentStep - 1].label}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Conditional content based on step  ookey*/}
              {currentStep === 1 && (
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
                    onChange={handleChange}
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
                    fullWidth
                    variant="filled"
                    type="text"
                    label="avatar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.avatar}
                    name="avatar"
                    error={!!touched.avatar && !!errors.avatar}
                    helperText={touched.avatar && errors.avatar}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Channel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.channel}
                    name="channel"
                    error={!!touched.channel && !!errors.channel}
                    helperText={touched.channel && errors.channel}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  {/* <FormControl
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
                    <InputLabel
                      id="channel"
                      sx={{ color: colors.primary[100] }}
                    >
                      Channel
                    </InputLabel>
                    <Select
                      labelId="channel"
                      id="channel"
                      value={values.channel}
                      name="channel"
                      onChange={handleChange}
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
                  </FormControl> */}

                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={10}
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{
                      gridColumn: "span 4",
                      overflow: "auto",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    type="text"
                    minRows={5}
                    maxRows={10}
                    label="Detailed Role Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.detailedRoleDescription}
                    name="detailedRoleDescription"
                    error={
                      !!touched.detailedRoleDescription &&
                      !!errors.detailedRoleDescription
                    }
                    helperText={
                      touched.detailedRoleDescription &&
                      errors.detailedRoleDescription
                    }
                    sx={{
                      gridColumn: "span 4",
                      overflow: "auto",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              )}

              {currentStep === 2 && (
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
                  {/* <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="languageSupport"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.languageSupport}
                    name="languageSupport"
                    error={
                      !!touched.languageSupport && !!errors.languageSupport
                    }
                    helperText={
                      touched.languageSupport && errors.languageSupport
                    }
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  /> */}

                  {/* <FormControl
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
                    <InputLabel
                      id="language-support"
                      sx={{ color: colors.primary[100] }}
                    >
                      Language Support
                    </InputLabel>
                    <Select
                      labelId="language-support"
                      id="languageSupport"
                      multiple // Enable multiple selection
                      value={values.languageSupport || []} // Ensure it defaults to an array
                      name="languageSupport"
                      onChange={(e) => {
                        const selectedValues = e.target.value; // Get the array of selected values'
                        console.log(selectedValues);
                        handleChange({
                          target: {
                            name: "languageSupport",
                            value: selectedValues,
                          },
                        });
                      }}
                      onBlur={handleBlur}
                      error={
                        !!touched.languageSupport && !!errors.languageSupport
                      }
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem value="eng">English</MenuItem>
                      <MenuItem value="italy">Italian</MenuItem>
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
                  </FormControl> */}

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="preTrainedTemplate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.preTrainedTemplate}
                    name="preTrainedTemplate"
                    error={!!touched.preTrainedTemplate && !!errors.preTrainedTemplate}
                    helperText={touched.preTrainedTemplate && errors.preTrainedTemplate}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  {/* <FormControl
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
                    <InputLabel
                      id="language-support"
                      sx={{ color: colors.primary[100] }}
                    >
                      Pre-trained Template
                    </InputLabel>
                    <Select
                      labelId="Pre-trained Template"
                      id="preTrainedTemplate"
                      value={values.preTrainedTemplate}
                      name="preTrainedTemplate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!touched.preTrainedTemplate &&
                        !!errors.preTrainedTemplate
                      }
                    >
                      <MenuItem value="FAQBot">FAQ Bot</MenuItem>
                      <MenuItem value="lead-bot">Lead Bot</MenuItem>
                      <MenuItem value="etc">etc</MenuItem>
                    </Select>
                    {touched.preTrainedTemplate &&
                      errors.preTrainedTemplate && (
                        <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                          {errors.preTrainedTemplate}
                        </Box>
                      )}
                  </FormControl> */}

                  <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    type="text"
                    minRows={5}
                    maxRows={10}
                    label="Expected Outcome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ExpectedOutcome}
                    name="ExpectedOutcome"
                    error={
                      !!touched.ExpectedOutcome && !!errors.ExpectedOutcome
                    }
                    helperText={
                      touched.ExpectedOutcome && errors.ExpectedOutcome
                    }
                    sx={{
                      gridColumn: "span 4",
                      overflow: "auto",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    gridColumn="span 2"
                    label="Upload Knowledge Base"
                    variant="filled"
                    type="text"
                    name="uploadKnowledgeBase"
                    value={values.uploadKnowledgeBase}
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
                            onChange={handleChange}
                          />
                        </Button>
                      ),
                    }}
                    onBlur={handleBlur}
                    error={
                      !!touched.uploadKnowledgeBase &&
                      !!errors.uploadKnowledgeBase
                    }
                    helperText={
                      touched.uploadKnowledgeBase && errors.uploadKnowledgeBase
                    }
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
              )}

              <Box mt={4} display="flex" gap={2}>
                {currentStep > 1 && (
                  <Box>
                    <Button
                      variant="contained"
                      onClick={handlePrev}
                      sx={{
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 2em",
                        mb: isNonMobile ? "0em" : "1em",
                        transition: "all 0.5s ease",
                        "&:hover": {
                          opacity: ".7",
                        },
                      }}
                      startIcon={<KeyboardTabIcon sx={{ rotate: "180deg" }} />}
                    >
                      Previous
                    </Button>
                  </Box>
                )}
                {currentStep < steps.length && (
                  <Box>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 3em",
                        mb: isNonMobile ? "0em" : "1em",
                        transition: "all 0.5s ease",
                        "&:hover": {
                          opacity: ".7",
                        },
                      }}
                      endIcon={<KeyboardTabIcon />}
                    >
                      Next
                    </Button>
                  </Box>
                )}
                {currentStep === steps.length && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1em",
                      height: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={handleSubmit}
                      sx={{
                        background: "linear-gradient(45deg, #4caf50, #81c784)",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 2em",
                        mb: isNonMobile ? "0em" : "1em",
                        transition: "all 0.5s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #388e3c, #66bb6a)",
                          opacity: 0.9,
                        },
                      }}
                    >
                      save
                    </Button>
                  </Box>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationType}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddBot;
