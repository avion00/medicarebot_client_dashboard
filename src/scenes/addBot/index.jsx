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
  InputBase,
  Slider,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
// import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadIcon from "@mui/icons-material/Upload";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import SyncIcon from "@mui/icons-material/Sync";
import BlockIcon from "@mui/icons-material/Block";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import initialData from "./data.json";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import {
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";


const steps = [
  { id: 1, label: "Bot Details", content: "Please fill out the form" },
  { id: 2, label: "Visual Customization", content: "Please fill  the form" },
  {
    id: 3,
    label: "Configure Bot Behaviour",
    content: "Please fill as the form",
  },
  { id: 4, label: "Knowledge Base", content: "Please fill fdf the form" },
  { id: 5, label: "Advanced Settings", content: "Please fill dfdfdf the form" },

  { id: 6, label: "Test Your Bot", content: "Provide additional details" },
];

const AddBot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [SuccessBox, setSuccessBox] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();



  const handleFormSubmit = (values) => {
    setSnackbarOpen(true);
    setSuccessBox(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
 const handleSetSuccessBoxClose = () => {
   setSuccessBox(false); // Close the dialog
   setSnackbarOpen(false); // (Optional) Close the Snackbar if needed
   navigate("/botIntegration");
 };


  

  const handleBotNameChange = (event, handleChange) => {
    handleChange(event);
  };
  const handleDescriptionChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleDetailedRoleDescriptionChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleRoleAndPurposeExplanationChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleExpectedOutcomeChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleExpectedAchieveChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleApiKeyChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCallbackURLChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleStartURLChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleDepthChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleFocusKeywordsChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleChannelChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleLanguageSupportChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleResponseTimeChange = (newValue, setFieldValue) => {
    setFieldValue("responseTime", newValue); 
  };

  const handlePreTrainedTemplateChange = (event, handleChange) => {
    handleChange(event);
  };

  const startCrawling = () => {
    // Handle website crawling
  };

  const initialValues = {
    botName: "",
    apiKey: "",
    channel: "",
    status: "",
    usageFrequency: "",
    responseAccuracy: "",
    languageSupport: "",
    performanceScore: "",
    responseTime: 1,
  };

  const checkoutSchema = yup.object().shape({
    botName: yup.string().required("Bot Name is required"),
    botImage: yup.string().required("Bot Image is required"),
    apiKey: yup.string().required("API key is required"),
    channel: yup.string().required("Channel is required"),
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const [imageOne, setImageOne] = useState(null);
  const [isDraggingOne, setIsDraggingOne] = useState(false);

  const [imageTwo, setImageTwo] = useState(null);
  const [isDraggingTwo, setIsDraggingTwo] = useState(false);

  const [imageThree, setImageThree] = useState(null);
  const [isDraggingThree, setIsDraggingThree] = useState(false);

  const [attachDocuments, setAttachDocuments] = useState("");
  const [uploadKnowledgeBase, setUploadKnowledgeBase] = useState("");
  const [uploadOptionalDocument, setUploadOptionalDocument] = useState("");

  // document wala ho yo, bujhis,  knowledge base, wala
  const handleattachDocumentsChange = (event) => {
    const file = event.target.files[0];
    setAttachDocuments(file ? file.name : "");
  };

  const handleuploadKnowledgeBaseChange = (event) => {
    const file = event.target.files[0];
    setUploadKnowledgeBase(file ? file.name : "");
  };

  const handleuploadOptionalDocumentChange = (event) => {
    const file = event.target.files[0];
    setUploadOptionalDocument(file ? file.name : "");
  };

  // three avatar wala image k handle gar
  const handleFileOneChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageOne(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOneOver = (event) => {
    event.preventDefault();
    setIsDraggingOne(true);
  };

  const handleDragOneLeave = () => {
    setIsDraggingOne(false);
  };

  const handleDropOne = (event) => {
    event.preventDefault();
    setIsDraggingOne(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageOne(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClickOne = () => {
    document.getElementById("imageInputOne").click();
  };

  const handleFileTwoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageTwo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragTwoOver = (event) => {
    event.preventDefault();
    setIsDraggingTwo(true);
  };

  const handleDragTwoLeave = () => {
    setIsDraggingTwo(false);
  };

  const handleDropTwo = (event) => {
    event.preventDefault();
    setIsDraggingTwo(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageTwo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClickTwo = () => {
    document.getElementById("imageInputTwo").click();
  };

  const handleFileThreeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageThree(reader.result); 
      reader.readAsDataURL(file);
    }
  };

  const handleDragThreeOver = (event) => {
    event.preventDefault();
    setIsDraggingThree(true);
  };

  const handleDragThreeLeave = () => {
    setIsDraggingThree(false);
  };

  const handleDropThree = (event) => {
    event.preventDefault();
    setIsDraggingThree(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageThree(reader.result); 
      reader.readAsDataURL(file);
    }
  };

  const handleClickThree = () => {
    document.getElementById("imageInputThree").click();
  };

  useEffect(() => {
    setConversation(initialData);
  }, []);

  // Sthis tate for storing the conversation okey
  const [conversation, setConversation] = useState([
    { sender: "bot", message: "Hello! How can I help you today?" },
  ]);

  // yoo State for storing the new message input by the user
  const [newMessage, setNewMessage] = useState("");

  const conversationEndRef = useRef(null);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversation = [
        ...conversation,
        { sender: "user", message: newMessage },
      ];
      const botResponse = "This is a bot's reply.";
      updatedConversation.push({ sender: "bot", message: botResponse });
      setConversation(updatedConversation);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the form from submitting
      handleSendMessage(); // Call the function to send the message
    }
  };

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleDraft = () => {
    console.log("Draft saved!");
  };

  const handleCancel = () => {
    console.log("Action canceled!");
  };

  return (
    <Box m="20px">
      <Box>
        <Header title="ADD NEW BOTS" subtitle="Add your new bots" />
      </Box>

      <Box>
        {/* timeline 1-2-3-4-5 like this okey */}
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
          onSubmit={handleFormSubmit}
          initialValues={{ ...initialValues, responseTime: 1 }}
          validationSchema={checkoutSchema}
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

                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={10}
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={(e) => handleDescriptionChange(e, handleChange)}
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
                    onChange={(e) =>
                      handleDetailedRoleDescriptionChange(e, handleChange)
                    }
                    value={values.DetailedRoleDescription}
                    name="DetailedRoleDescription"
                    error={
                      !!touched.DetailedRoleDescription &&
                      !!errors.DetailedRoleDescription
                    }
                    helperText={
                      touched.DetailedRoleDescription &&
                      errors.DetailedRoleDescription
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
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={10}
                    variant="filled"
                    type="text"
                    label="Provide a detailed explanation of bot's Role and Purpose"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleRoleAndPurposeExplanationChange(e, handleChange)
                    }
                    value={values.RoleAndPurposeExplanation}
                    name="RoleAndPurposeExplanation"
                    error={
                      !!touched.RoleAndPurposeExplanation &&
                      !!errors.RoleAndPurposeExplanation
                    }
                    helperText={
                      touched.RoleAndPurposeExplanation &&
                      errors.RoleAndPurposeExplanation
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
                  <Box
                    gridColumn="span 1"
                    minRows={5}
                    sx={{
                      backgroundColor: isDraggingOne
                        ? colors.grey[400]
                        : colors.primary[400],
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "4px",
                      padding: "1em",
                      border: isDraggingOne
                        ? `2px dashed ${colors.grey[200]}`
                        : `2px solid ${colors.primary[500]}`,
                      transition: "all 0.3s ease",
                    }}
                    onDragOver={handleDragOneOver}
                    onDragLeave={handleDragOneLeave}
                    onDrop={handleDropOne}
                  >
                    <Box
                      onClick={handleClickOne}
                      sx={{
                        backgroundColor: colors.primary[500],
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                        margin: "2em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.8s ease",
                        "&:hover": {
                          backgroundColor: colors.grey[900],
                        },
                      }}
                    >
                      {imageOne ? (
                        <Box
                          component="img"
                          src={imageOne}
                          alt="Uploaded"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <UploadIcon
                          sx={{
                            fontSize: "80px",
                            color: colors.grey[200],
                            transition: "all 0.3s ease",
                            "&:hover": {
                              fontSize: "90px",
                            },
                          }}
                        />
                      )}
                      {/* not seeing input field */}
                      <input
                        id="imageInputOne"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileOneChange}
                      />
                    </Box>
                    <Typography mb="2em" variant="h6">
                      Upload Bot Avatar
                    </Typography>
                  </Box>

                  <Box
                    gridColumn="span 1"
                    minRows={5}
                    sx={{
                      backgroundColor: isDraggingTwo
                        ? colors.grey[400]
                        : colors.primary[400],
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      padding: "1em",
                      border: isDraggingTwo
                        ? `2px dashed ${colors.grey[200]}`
                        : `2px solid ${colors.primary[500]}`,
                      transition: "all 0.3s ease",
                    }}
                    onDragOver={handleDragTwoOver}
                    onDragLeave={handleDragTwoLeave}
                    onDrop={handleDropTwo}
                  >
                    <Box
                      onClick={handleClickTwo}
                      sx={{
                        backgroundColor: colors.primary[500],
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                        margin: "2em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.8s ease",
                        "&:hover": {
                          backgroundColor: colors.grey[900],
                        },
                      }}
                    >
                      {imageTwo ? (
                        <Box
                          component="img"
                          src={imageTwo}
                          alt="Uploaded"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <UploadIcon
                          sx={{
                            fontSize: "80px",
                            color: colors.grey[200],
                            transition: "all 0.3s ease",
                            "&:hover": {
                              fontSize: "90px",
                            },
                          }}
                        />
                      )}
                      {/* not seeing  input field */}
                      <input
                        id="imageInputTwo"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileTwoChange}
                      />
                    </Box>
                    <Typography mb="2em" variant="h6">
                      Upload Website Icon
                    </Typography>
                  </Box>

                  <Box
                    gridColumn="span 1"
                    minRows={5}
                    sx={{
                      backgroundColor: isDraggingThree
                        ? colors.grey[400]
                        : colors.primary[400],
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      borderRadius: "4px",
                      padding: "1em",
                      border: isDraggingThree
                        ? `2px dashed ${colors.grey[200]}`
                        : `2px solid ${colors.primary[500]}`,
                      transition: "all 0.3s ease",
                    }}
                    onDragOver={handleDragThreeOver}
                    onDragLeave={handleDragThreeLeave}
                    onDrop={handleDropThree}
                  >
                    <Box
                      onClick={handleClickThree}
                      sx={{
                        backgroundColor: colors.primary[500],
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                        margin: "2em",
                        marginBottom: ".5em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.8s ease",
                        "&:hover": {
                          backgroundColor: colors.grey[900],
                        },
                      }}
                    >
                      {imageThree ? (
                        <Box
                          component="img"
                          src={imageThree}
                          alt="Uploaded"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <UploadIcon
                          sx={{
                            fontSize: "80px",
                            color: colors.grey[200],
                            transition: "all 0.3s ease",
                            "&:hover": {
                              fontSize: "90px",
                            },
                          }}
                        />
                      )}
                      {/*here also Invisible input field */}
                      <input
                        id="imageInputThree"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileThreeChange}
                      />
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        width: "80%",
                      }}
                    >
                      <Typography fontWeight="bold" variant="h6">
                        (optional)
                      </Typography>
                      <Typography variant="h6">
                        Upload custom icon to represent the chat bot on website
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {currentStep === 3 && (
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
                    <InputLabel
                      id="language-support"
                      sx={{ color: colors.primary[100] }}
                    >
                      Pre-trained Template
                    </InputLabel>
                    <Select
                      labelId="Pre-trained Template"
                      id="preTrainedTemplate"
                      value={values.languageSupport}
                      name="preTrainedTemplate"
                      onChange={(e) =>
                        handlePreTrainedTemplateChange(e, handleChange)
                      }
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
                  </FormControl>

                  <Box sx={{ gridColumn: "span 1" }}></Box>

                  <Box
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          color: colors.grey[400],
                        }}
                      >
                        slow
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 1,
                          color: colors.grey[200],
                        }}
                      >
                        Response Time
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          color: colors.grey[400],
                        }}
                      >
                        Response Time
                      </Typography>
                    </Box>
                    <Slider
                      value={values.responseTime}
                      min={1}
                      max={5}
                      step={1}
                      marks={[
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                        { value: 3, label: "3" },
                        { value: 4, label: "4" },
                        { value: 5, label: "5" },
                      ]}
                      onChange={(e, newValue) => {
                        handleResponseTimeChange(newValue, setFieldValue);
                      }}
                      valueLabelDisplay="auto"
                      sx={{
                        color: colors.blueAccent[200],
                        "& .MuiSlider-thumb": {
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow:
                              "0px 0px 0px 8px rgba(33, 150, 243, 0.16)",
                          },
                        },
                      }}
                    />
                    {touched.responseTime && errors.responseTime && (
                      <Typography variant="caption" color="error">
                        {errors.responseTime}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ gridColumn: "span 1" }}></Box>

                  <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    type="text"
                    minRows={5}
                    maxRows={10}
                    label="Expected Outcome"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleExpectedOutcomeChange(e, handleChange)
                    }
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
                    fullWidth
                    multiline
                    variant="filled"
                    type="text"
                    minRows={5}
                    maxRows={10}
                    label="Describe what this bot is expected to achieve. i.e (generate leads)"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleExpectedAchieveChange(e, handleChange)
                    }
                    value={values.ExpectedAchieve}
                    name="ExpectedAchieve"
                    error={
                      !!touched.ExpectedAchieve && !!errors.ExpectedAchieve
                    }
                    helperText={
                      touched.ExpectedAchieve && errors.ExpectedAchieve
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

              {currentStep === 4 && (
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
                    gridColumn="span 2"
                    label="Attach Documents"
                    variant="filled"
                    type="text"
                    name="attachDocuments"
                    value={attachDocuments}
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
                              handleattachDocumentsChange(e);
                              handleChange(e);
                            }}
                          />
                        </Button>
                      ),
                    }}
                    onBlur={handleBlur}
                    error={
                      !!touched.attachDocuments && !!errors.attachDocuments
                    }
                    helperText={
                      touched.attachDocuments && errors.attachDocuments
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

                  <TextField
                    gridColumn="span 2"
                    label="Upload Knowledge Base"
                    variant="filled"
                    type="text"
                    name="uploadKnowledgeBase"
                    value={uploadKnowledgeBase}
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
                              handleuploadKnowledgeBaseChange(e);
                              handleChange(e);
                            }}
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

                  <Typography
                    gridColumn="span 4"
                    varient="h6"
                    mt="-1.5em"
                    ml="5px"
                    color={colors.grey[300]}
                  >
                    Allowed format: PDF, Docx, txt, csv
                  </Typography>

                  <TextField
                    gridColumn="span 2"
                    label="Upload"
                    variant="filled"
                    type="text"
                    name="uploadOptionalDocument"
                    value={uploadOptionalDocument}
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
                              handleuploadOptionalDocumentChange(e);
                              handleChange(e);
                            }}
                          />
                        </Button>
                      ),
                    }}
                    onBlur={handleBlur}
                    error={
                      !!touched.uploadOptionalDocument &&
                      !!errors.uploadOptionalDocument
                    }
                    helperText={
                      touched.uploadOptionalDocument &&
                      errors.uploadOptionalDocument
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

                  <Typography
                    gridColumn="span 4"
                    varient="h6"
                    mt="-1.5em"
                    ml="5px"
                    color={colors.grey[300]}
                  >
                    Optional: Upload files to seed the bot’s response and
                    knowledge base
                  </Typography>
                </Box>
              )}

              {currentStep === 5 && (
                <Box
                  display="grid"
                  rowGap="8px"
                  columnGap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    gridColumn="span 4"
                    varient="h6"
                  >
                    API Integration (Optional)
                  </Typography>
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

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Callback URL"
                    onBlur={handleBlur}
                    onChange={(e) => handleCallbackURLChange(e, handleChange)}
                    value={values.callbackURL}
                    name="callbackURL"
                    error={!!touched.callbackURL && !!errors.callbackURL}
                    helperText={touched.callbackURL && errors.callbackURL}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <Typography
                    fontWeight="bold"
                    gridColumn="span 4"
                    varient="h6"
                    mt="1.25em"
                  >
                    Web Crawling (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Start URL"
                    onBlur={handleBlur}
                    onChange={(e) => handleStartURLChange(e, handleChange)}
                    value={values.startURL}
                    name="startURL"
                    error={!!touched.startURL && !!errors.startURL}
                    helperText={touched.startURL && errors.startURL}
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
                    <InputLabel id="status" sx={{ color: colors.primary[100] }}>
                      Depth
                    </InputLabel>
                    <Select
                      labelId="depth"
                      id="depth"
                      value={values.depth}
                      name="depth"
                      onChange={(e) => handleDepthChange(e, handleChange)}
                      onBlur={handleBlur}
                      error={!!touched.depth && !!errors.depth}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                    {touched.depth && errors.depth && (
                      <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                        {errors.depth}
                      </Box>
                    )}
                  </FormControl>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Keywords to focus on (Optional)"
                    onBlur={handleBlur}
                    onChange={(e) => handleFocusKeywordsChange(e, handleChange)}
                    value={values.focusKeywords}
                    name="focusKeywords"
                    error={!!touched.focusKeywords && !!errors.focusKeywords}
                    helperText={touched.focusKeywords && errors.focusKeywords}
                    sx={{
                      gridColumn: "span 4",
                      mt: "30px",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <Button
                    onClick={startCrawling}
                    color="secondary"
                    variant="outlined"
                    sx={{
                      mt: "1em",
                      borderRadius: "20px",
                      marginRight: "8px",
                    }}
                  >
                    Start Crawling
                  </Button>

                  <Typography
                    gridColumn="span 4"
                    varient="h6"
                    color={colors.grey[400]}
                  >
                    Optional: Specify a URL and crawl depth to populate the
                    dynamic content for the bot.
                  </Typography>
                </Box>
              )}

              {currentStep === 6 && (
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
                  <Typography
                    gridColumn="span 4"
                    varient="h6"
                    color={colors.grey[200]}
                  >
                    Test with sample question to stimulate the user interaction.{" "}
                  </Typography>

                  <Box
                    gridColumn="span 2"
                    position="relative"
                    mt="-1.5em"
                    backgroundColor={colors.primary[400]}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
                        padding: "1em",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: "1em",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={`../../assets/user.png`}
                            alt="Logo"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            lineHeight="1.2"
                            fontWeight="bold"
                            color="#ccc"
                          >
                            Web Chatbot
                          </Typography>
                          <Typography
                            variant="h6"
                            lineHeight="1.2"
                            color="#79898D"
                          >
                            Test Bot
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1em",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <SearchIcon />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <MoreVertIcon />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        height: "400px",
                        overflow: "auto",
                        marginBottom: "5em",
                        padding: "1em",
                        borderBottom: `1px solid ${colors.grey[700]}`,
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                        variant="h6"
                        color={colors.grey[500]}
                      >
                        12 Oct, 2024
                      </Typography>
                      {conversation.map((msg, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent:
                              msg.sender === "user" ? "flex-end" : "flex-start",
                            marginBottom: "1em",
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "52%",

                              backgroundColor:
                                msg.sender === "user" ? "#c2d5fe" : "#cbe1e5",
                              borderRadius:
                                msg.sender === "user"
                                  ? " 8px 8px 0 8px"
                                  : "8px 8px 8px 0",
                              padding: ".5em 1em",
                              color: "#000",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="h6">{msg.message}</Typography>
                          </Box>
                        </Box>
                      ))}

                      <div ref={conversationEndRef} />
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "1em",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: ".5em",
                        padding: "0 1.5em",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: " 100%",
                        }}
                      >
                        <Box
                          display="flex"
                          flex="1"
                          borderRadius="25px"
                          flexGrow="grow"
                          sx={{
                            border: `2px solid white`,
                            backgroundColor: "#f4f4f5",
                            "&:focus-within": {
                              backgroundColor: "white",
                            },
                          }}
                        >
                          <InputBase
                            sx={{
                              ml: 2,
                              mr: 2,
                              flexGrow: "grow",
                              p: ".5em",
                              color: "#000",
                              width: "100%",
                            }}
                            placeholder="Start Writing Here"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f4f4f5",
                          padding: ".5em",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={handleSendMessage}
                      >
                        <SendIcon sx={{ color: "#000", rotate: "-45deg" }} />
                      </Box>
                    </Box>
                  </Box>
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
                      startIcon={<KeyboardTabIcon />}
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
                      Save & Activate
                    </Button>

                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleDraft}
                      startIcon={<SyncIcon />}
                      sx={{
                        background: "linear-gradient(45deg, #ff9800, #ffc107)",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 2em",
                        mb: isNonMobile ? "0em" : "1em",
                        transition: "all 0.5s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #f57c00, #ffa000)",
                          opacity: 0.9,
                        },
                      }}
                    >
                      Save as Draft
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancel}
                      startIcon={<BlockIcon />}
                      sx={{
                        background: "linear-gradient(45deg, #f44336, #e57373)",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 2em",
                        mb: isNonMobile ? "0em" : "1em",
                        transition: "all 0.5s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #d32f2f, #ef5350)",
                          opacity: 0.9,
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
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
                  Congratulations, you have created bot name:
                  <strong>{values.botName}</strong>
                </Alert>
              </Snackbar>

              <Dialog
                open={SuccessBox}
                onClose={handleSetSuccessBoxClose}
                sx={{
                  zIndex: 1300,
                  "& .MuiDialog-paper": {
                    borderRadius: "8px",
                    padding: "24px",
                    maxWidth: "420px",
                    width: "100%",
                    backgroundColor: colors.primary[500]
                  },
                }}
              >
                <DialogContent
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto",
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #062994, #0E72E1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RocketLaunchIcon
                      sx={{
                        fontSize: "46px",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      marginTop: "16px",
                      color: colors.grey[100],
                    }}
                  >
                    Congratulations!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      marginTop: "12px",
                      color: colors.grey[200],
                    }}
                  >
                    Your Bot <strong f>{values.botName}</strong> Has been Created
                    Successfully
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      marginTop: "12px",
                      color: colors.grey[200],
                    }}
                  >
                    Now Let’s <strong>Integrate</strong> this bot into
                    <strong> Your website or platform</strong>
                  </Typography>
                </DialogContent>

                <DialogActions
                  sx={{
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                >
                  <Button
                    onClick={handleSetSuccessBoxClose}
                    variant="contained"
                    color="primary"
                    startIcon={<AccountTreeIcon />}
                    sx={{
                      background: "linear-gradient(45deg, #062994, #0E72E1)",
                      textTransform: "capitalize",
                      color: "#fff",
                      // width: isNonMobile ? "50%" : "100%",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      mb: isNonMobile ? "0em" : "1em",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        opacity: ".7",
                      },
                    }}
                  >
                    Let’s Integrate
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddBot;
