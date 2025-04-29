import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
  IconButton,
  Typography,
  Slider,
  CircularProgress,
  InputAdornment,
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
import axios from "axios";
import BlockIcon from "@mui/icons-material/Block";
import SyncIcon from "@mui/icons-material/Sync";
import AddBotDialogBox from "../../components/AddBotDialogBox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddBot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isTab = useMediaQuery("(min-width:921px)");

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const handleBotNameChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleAvatarChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleIconImageChange = (event, handleChange) => {
    handleChange(event);
  };
  const handleIconImageOptionalChange = (event, handleChange) => {
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

  const handleLanguageSupportChange = (event, handleChange) => {
    const {
      target: { value },
    } = event;

    // Store a clean array (avoid unnecessary quotes)
    handleChange({
      target: {
        name: "languageSupport",
        value: value.map((v) => v.replace(/"/g, "")),
      },
    });
  };

  const handleResponseTimeChange = (newValue, setFieldValue) => {
    setFieldValue("responseTime", newValue);
  };

  const handlePreTrainedTemplateChange = (event, handleChange) => {
    handleChange(event);
  };

  // optional
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

  const handleSMTPserverLinkChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleEmailAddressChange = (event, handleChange) => {
    handleChange(event);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    botName: "",
    avatar: "helloavatar.png",
    channel: "",
    description: "",
    detailedRoleDescription: "",
    languageSupport: [],
    preTrainedTemplate: "",
    ExpectedOutcome: "",
    uploadKnowledgeBase: "",

    // email web bot
    SMTPServerLink: "",
    emailAddress: "",
    password: "",
  };

  const checkoutSchema = yup.object().shape({
    botName: yup.string().required("Bot Name is required"),
    avatar: yup.string().nullable(),

    channel: yup.string().required("Channel is required"),
    description: yup.string().required("Description is required"),
    detailedRoleDescription: yup
      .string()
      .required("Detailed Role Description is required"),
    languageSupport: yup
      .array()
      .of(yup.string().required("Language Support is required"))
      .min(1, "Select at least one language"),
    preTrainedTemplate: yup.string().nullable(),
    ExpectedOutcome: yup.string().required("Expected Outcome is required"),
    uploadKnowledgeBase: yup.string().nullable(),

    // optional
    attachDocuments: yup.mixed().nullable(),
    uploadOptionalDocument: yup.mixed().nullable(),

    // email web bot
    SMTPServerLink: yup.string().nullable(),
    emailAddress: yup.string().nullable(),
    password: yup.string().nullable(),
  });

  // state 5 that is documents part
  const [attachDocuments, setAttachDocuments] = useState(null);
  const [uploadKnowledgeBase, setUploadKnowledgeBase] = useState(null);
  const [uploadOptionalDocument, setUploadOptionalDocument] = useState(null);

  const handleattachDocumentsChange = (event) => {
    const file = event.target.files[0];
    setAttachDocuments(file || null);
  };

  const handleuploadKnowledgeBaseChange = (event) => {
    const file = event.target.files[0];
    setUploadKnowledgeBase(file || null);
  };

  const handleuploadOptionalDocumentChange = (event) => {
    const file = event.target.files[0];
    setUploadOptionalDocument(file || null);
  };

  const handleDraft = async () => {
    setLoading(false);
    console.log("Saving draft...");

    try {
      // Implement logic to save the draft, for example:
      // You can send the draft data to a backend or store it locally
      // const draftData = {
      //   /* Your draft data here */
      // };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After saving the draft, update the UI
      setNotificationType("success");
      setNotificationMessage("Draft saved successfully!");
      setShowNotification(true);

      console.log("Draft saved successfully!");
    } catch (error) {
      setNotificationType("error");
      setNotificationMessage("Failed to save draft. Please try again.");
      setShowNotification(true);

      console.error("Error saving draft:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (resetForm) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel?");

    if (isConfirmed) {
      // Reset the form and other states
      resetForm();
      setAttachDocuments(null);
      setUploadKnowledgeBase(null);
      setUploadOptionalDocument(null);
      setShowNotification(true);
      setTimeout(() => {
        setCurrentStep(1);
      }, 1200);
      setNotificationType("success");
      setNotificationMessage("You have successfully Canceled the action.");
    } else {
      console.log("Cancellation aborted by user.");
      setShowNotification(true);
      setNotificationType("error");
      setNotificationMessage("Cancellation abort");
    }
  };

  const [successBox, setSuccessBox] = useState(false);

  const handleCloseDialog = () => {
    setSuccessBox(false);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const formData = new FormData();
    const formatPostgresArray = (array) => JSON.stringify(array);
    // Append form fields
    formData.append("name", values.botName);
    formData.append(
      "avatar",
      values.avatar || new File([""], "placeholder.jpg")
    );
    formData.append("type", values.channel);
    formData.append("description", values.description);
    formData.append("role_description", values.detailedRoleDescription);
    formData.append("pretrained_template", values.preTrainedTemplate);
    formData.append(
      "language_support",
      formatPostgresArray(values.languageSupport) // This will format as ["en","de","it"]
    );

    formData.append("expectation", values.ExpectedOutcome);

    // email web bot
    formData.append("smtp_address", values.SMTPServerLink);
    formData.append("smtp_email_address", values.emailAddress);
    formData.append("smtp_password", values.password);

    // Check and append the file fields
    formData.append(
      "upload_documents",
      attachDocuments || new File([""], "upload_documents.txt")
    );

    formData.append(
      "knowledge_base_file",
      uploadKnowledgeBase || new File([""], "upload_knowledge_base.txt")
    );

    formData.append(
      "upload_optional_document",
      uploadOptionalDocument || new File([""], "upload_optional_document.txt")
    );

    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/create_bot",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.bot_id) {
        const botId = response.data.bot_id;
        setNotificationType("success");
        setNotificationMessage(`Bot created successfully! Bot ID: ${botId}`);
        setShowNotification(true);
        setSuccessBox(true);
        resetForm();
        setCurrentStep(1);
        // manually empty when submit the form
        setAttachDocuments(null);
        setUploadKnowledgeBase(null);
        setUploadOptionalDocument(null);
      } else {
        const errorMessage = response.data?.message || "Request failed.";
        setNotificationType("error");
        setNotificationMessage(errorMessage);
        setShowNotification(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setNotificationType("error");
      setNotificationMessage(errorMessage);
      setShowNotification(true);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const [channel, setChannel] = useState(""); // Selected channel
  const [currentStep, setCurrentStep] = useState(1); // Current step

  const allSteps = [
    { id: 1, label: "Bot Details", content: "Please fill out the form" },
    { id: 2, label: "Visual Customization", content: "Please fill the form" },
    {
      id: 3,
      label: "Configure Bot Behaviour",
      content: "Please fill as the form",
    },
    { id: 4, label: "Knowledge Base", content: "Please fill the form" },
    { id: 5, label: "Advanced Settings", content: "Please fill the form" },
  ];

  // Dynamically filter steps based on the selected channel
  const steps =
    channel === "Email"
      ? [
          { id: 1, label: "Bot Details", content: "Please fill out the form" },
          {
            id: 2,
            label: "Configure Bot Behaviour",
            content: "Please fill as the form",
          },
          { id: 3, label: "Knowledge Base", content: "Please fill the form" },
          {
            id: 4,
            label: "Advanced Settings",
            content: "Please fill the form",
          },
        ]
      : allSteps;

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChannelChange = (event, handleChange) => {
    setChannel(event.target.value);
    setCurrentStep(1);
    handleChange(event);
  };

  const [skloading, setSkLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonTheme
      baseColor={theme.palette.mode === "dark" ? "#333" : "#e0e0e0"}
      highlightColor={theme.palette.mode === "dark" ? "#444" : "#f5f5f5"}
    >
      <Box m="20px">
        <Box>
          <Header title="ADD NEW BOTS" subtitle="Add your new bots" />
        </Box>

        <Box>
          {/* timeline 1-2-3-4-5 like this okey */}
          <Box
            display="flex"
            justifyContent="start"
            gap={isNonMobile ? "4em" : "2em"}
            mb={isNonMobile ? "2em" : undefined}
            mt={isNonMobile ? undefined : "2em"}
          >
            {steps.map((step, index) => (
              <Box key={step.id} textAlign="center" position="relative">
                {skloading ? (
                  <Skeleton
                    circle
                    width={isNonMobile ? 50 : 42}
                    height={isNonMobile ? 50 : 42}
                  />
                ) : (
                  <IconButton
                    size="medium"
                    style={{
                      backgroundColor:
                        currentStep === step.id
                          ? colors.blueAccent[100]
                          : colors.primary[500],
                      border: `2px solid ${colors.grey[400]}`,
                      width: isNonMobile ? "50px" : "42px",
                      height: isNonMobile ? "50px" : "42px",
                      fontSize: isNonMobile ? "14px" : "13px",
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
                )}

                {/* Render the connecting line for all steps except the last one */}
                {index < steps.length - 1 &&
                  (skloading ? (
                    <Skeleton
                      variant="rectangular"
                      style={{
                        position: "absolute",
                        left: "0em",
                        width: isNonMobile ? "40px" : "20px",
                        height: "4px",
                        marginTop: isNonMobile ? "-1.9em" : "-1.7em",
                        marginLeft: isNonMobile ? "4.2em" : "3.3em",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        position: "absolute",
                        left: "0em",
                        width: isNonMobile ? "40px" : "20px",
                        height: "4px",
                        backgroundColor:
                          currentStep >= step.id + 1
                            ? colors.blueAccent[400]
                            : "#dae6fe",
                        marginTop: isNonMobile ? "-1.9em" : "-1.7em",
                        marginLeft: isNonMobile ? "4.2em" : "3.3em",
                      }}
                    />
                  ))}
              </Box>
            ))}
          </Box>

          {skloading ? (
            <Box
              sx={{
                marginTop: "-1em",
                marginBottom: "1em",
              }}
            >
              <Skeleton width={160} height={20} />
            </Box>
          ) : (
            <Typography variant="h4" fontWeight="bold" mt="2em" mb="1em">
              {steps[currentStep - 1].label}
            </Typography>
          )}

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
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                {/* Conditional content based on step  ookey*/}
                {currentStep === 1 &&
                  (skloading ? (
                    <>
                      <Skeleton
                        width={280}
                        height={10}
                        style={{
                          borderRadius: "4px",
                        }}
                      />
                      <Skeleton
                        width={120}
                        height={10}
                        style={{
                          borderRadius: "4px",
                        }}
                      />
                    </>
                  ) : (
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
                          <MenuItem value="Email">Email</MenuItem>
                          <MenuItem value="Telegram">Telegram</MenuItem>
                          <MenuItem value="Webchat">Webchat</MenuItem>
                          <MenuItem value="Messanger">Messanger</MenuItem>
                          <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                        </Select>
                        {touched.channel && errors.channel && (
                          <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                            {errors.channel}
                          </Box>
                        )}
                      </FormControl>

                      {/* Conditionally render Email-related fields */}
                      {values.channel === "Email" && (
                        <Box
                          display="grid"
                          gridColumn="span 4"
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
                            type="url"
                            label="SMTP Server Link"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              handleSMTPserverLinkChange(e, handleChange)
                            }
                            value={values.SMTPServerLink}
                            name="SMTPServerLink"
                            error={
                              !!touched.SMTPServerLink &&
                              !!errors.SMTPServerLink
                            }
                            helperText={
                              touched.SMTPServerLink && errors.SMTPServerLink
                            }
                            sx={{
                              gridColumn: "span 4",
                              "& .MuiFormLabel-root.Mui-focused": {
                                color: colors.blueAccent[500],
                                fontWeight: "bold",
                              },
                            }}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            type="email"
                            label="Email Address"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              handleEmailAddressChange(e, handleChange)
                            }
                            value={values.emailAddress}
                            name="emailAddress"
                            error={
                              !!touched.emailAddress && !!errors.emailAddress
                            }
                            helperText={
                              touched.emailAddress && errors.emailAddress
                            }
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
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{
                              gridColumn: "span 2",
                              "& .MuiFormLabel-root.Mui-focused": {
                                color: colors.blueAccent[500],
                                fontWeight: "bold",
                              },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  style={{ marginRight: "1em" }}
                                >
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      )}

                      <TextField
                        fullWidth
                        multiline
                        minRows={5}
                        maxRows={10}
                        variant="filled"
                        type="text"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={(e) =>
                          handleDescriptionChange(e, handleChange)
                        }
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
                        value={values.roleAndPurposeExplanation}
                        name="roleAndPurposeExplanation"
                        error={
                          !!touched.roleAndPurposeExplanation &&
                          !!errors.roleAndPurposeExplanation
                        }
                        helperText={
                          touched.roleAndPurposeExplanation &&
                          errors.roleAndPurposeExplanation
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
                  ))}
                {currentStep === 2 && values.channel !== "Email" && (
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
                      label="Avatar"
                      onBlur={handleBlur}
                      onChange={(e) => handleAvatarChange(e, handleChange)}
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
                      label="Icon Image"
                      onBlur={handleBlur}
                      onChange={(e) => handleIconImageChange(e, handleChange)}
                      value={values.iconImage}
                      name="iconImage"
                      error={!!touched.iconImage && !!errors.iconImage}
                      helperText={touched.iconImage && errors.iconImage}
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
                      label="Icon Image Optional"
                      onBlur={handleBlur}
                      onChange={(e) =>
                        handleIconImageOptionalChange(e, handleChange)
                      }
                      value={values.iconImageOptional}
                      name="iconImageOptional"
                      error={
                        !!touched.iconImageOptional &&
                        !!errors.iconImageOptional
                      }
                      helperText={
                        touched.iconImageOptional && errors.iconImageOptional
                      }
                      sx={{
                        gridColumn: "span 2",
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: colors.blueAccent[500],
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Box>
                )}

                {currentStep === (values.channel === "Email" ? 2 : 3) && (
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
                        multiple
                        value={values.languageSupport}
                        name="languageSupport"
                        onChange={(e) =>
                          handleLanguageSupportChange(e, handleChange)
                        }
                        onBlur={handleBlur}
                        error={
                          !!touched.languageSupport && !!errors.languageSupport
                        }
                        renderValue={(selected) => selected.join(", ")}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="it">Italian</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="hi">Hindi</MenuItem>
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
                        id="preTrainedTemplate"
                        sx={{ color: colors.primary[100] }}
                      >
                        Pre-trained Template
                      </InputLabel>
                      <Select
                        labelId="Pre-trained Template"
                        id="preTrainedTemplate"
                        value={values.preTrainedTemplate}
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
                        padding: isNonMobile ? undefined : "0 2em",
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
                          Slow
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
                        onChange={(e, newValue) =>
                          handleResponseTimeChange(
                            newValue,
                            setFieldValue,
                            e,
                            handleChange
                          )
                        }
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
                  </Box>
                )}

                {currentStep === (values.channel === "Email" ? 3 : 4) && (
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
                      value={attachDocuments ? attachDocuments.name : ""}
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
                              name="attachDocuments"
                              onChange={(e) => {
                                handleattachDocumentsChange(e);
                              }}
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

                    <TextField
                      gridColumn="span 2"
                      label="Upload Knowledge Base"
                      variant="filled"
                      type="text"
                      name="uploadKnowledgeBase"
                      value={
                        uploadKnowledgeBase ? uploadKnowledgeBase.name : ""
                      }
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
                              onChange={(e) =>
                                handleuploadKnowledgeBaseChange(e)
                              }
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
                      label="upload Optional Document"
                      variant="filled"
                      type="text"
                      name="uploadOptionalDocument"
                      value={
                        uploadOptionalDocument
                          ? uploadOptionalDocument.name
                          : ""
                      }
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
                              name="uploadOptionalDocument"
                              onChange={(e) =>
                                handleuploadOptionalDocumentChange(e)
                              }
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

                {currentStep === (values.channel === "Email" ? 4 : 5) && (
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
                    {values.channel !== "Email" && (
                      <Box gridColumn={"span 4"}>
                        <Typography
                          fontWeight="bold"
                          gridColumn="span 4"
                          varient="h6"
                        >
                          API Integration (Optional)
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
                            fullWidth
                            variant="filled"
                            type="text"
                            label="API Key"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              handleApiKeyChange(e, handleChange)
                            }
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
                            onChange={(e) =>
                              handleCallbackURLChange(e, handleChange)
                            }
                            value={values.callbackURL}
                            name="callbackURL"
                            error={
                              !!touched.callbackURL && !!errors.callbackURL
                            }
                            helperText={
                              touched.callbackURL && errors.callbackURL
                            }
                            sx={{
                              gridColumn: "span 2",
                              "& .MuiFormLabel-root.Mui-focused": {
                                color: colors.blueAccent[500],
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    )}

                    <Typography
                      fontWeight="bold"
                      gridColumn="span 4"
                      varient="h6"
                      mt="1.25em"
                    >
                      Web Crawling (Optional)
                    </Typography>
                    <Box
                      gridColumn={"span 4"}
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
                        <InputLabel
                          id="status"
                          sx={{ color: colors.primary[100] }}
                        >
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
                          <MenuItem value="1">Low</MenuItem>
                          <MenuItem value="2">Medium</MenuItem>
                          <MenuItem value="3">High</MenuItem>
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
                        onChange={(e) =>
                          handleFocusKeywordsChange(e, handleChange)
                        }
                        value={values.focusKeywords}
                        name="focusKeywords"
                        error={
                          !!touched.focusKeywords && !!errors.focusKeywords
                        }
                        helperText={
                          touched.focusKeywords && errors.focusKeywords
                        }
                        sx={{
                          gridColumn: "span 4",
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: colors.blueAccent[500],
                            fontWeight: "bold",
                          },
                        }}
                      />
                      {/* <Button
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
                  </Button> */}

                      <Typography
                        gridColumn="span 4"
                        varient="h6"
                        color={colors.grey[400]}
                      >
                        Optional: Specify a URL and crawl depth to populate the
                        dynamic content for the bot.
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box
                  mt={4}
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  alignItems="center"
                  width="100%"
                >
                  {currentStep > 1 && (
                    <Button
                      variant="contained"
                      onClick={handlePrev}
                      sx={{
                        flexGrow: "1",
                        maxWidth: isTab ? "180px" : undefined,
                        background: "linear-gradient(45deg, #062994, #0E72E1)",
                        color: "#fff",
                        fontSize: { xs: "12px", sm: "14px" }, // Smaller text on small screens
                        fontWeight: "bold",
                        padding: { xs: "8px 1.5em", sm: "10px 2em" }, // Reduce padding for small screens
                        minWidth: { xs: "120px", sm: "150px" }, // Smaller button width on mobile
                        transition: "all 0.5s ease",
                        "&:hover": { opacity: ".7" },
                      }}
                      startIcon={<KeyboardTabIcon sx={{ rotate: "180deg" }} />}
                    >
                      Previous
                    </Button>
                  )}

                  {currentStep < steps.length &&
                    (skloading ? (
                      <Skeleton variant="rectangular" width={140} height={30} />
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          flexGrow: "1",
                          maxWidth: isTab ? "180px" : undefined,
                          background:
                            "linear-gradient(45deg, #062994, #0E72E1)",
                          color: "#fff",
                          fontSize: { xs: "12px", sm: "14px" },
                          fontWeight: "bold",
                          padding: { xs: "8px 1.5em", sm: "10px 3em" },
                          minWidth: { xs: "120px", sm: "150px" },
                          transition: "all 0.5s ease",
                          "&:hover": { opacity: ".7" },
                        }}
                        endIcon={<KeyboardTabIcon />}
                      >
                        Next
                      </Button>
                    ))}

                  {currentStep === steps.length && (
                    <Box
                      sx={{
                        flexGrow: "1",
                        gap: 2,
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                        endIcon={
                          loading ? (
                            <CircularProgress
                              size={20}
                              sx={{ color: colors.grey[100] }}
                            />
                          ) : (
                            <KeyboardTabIcon />
                          )
                        }
                        sx={{
                          flexGrow: "1",
                          background:
                            "linear-gradient(45deg, #4caf50, #81c784)",
                          color: "#fff",
                          fontSize: { xs: "12px", sm: "14px" },
                          fontWeight: "bold",
                          padding: { xs: "8px 1.5em", sm: "10px 2em" },
                          minWidth: { xs: "120px", sm: "160px" },
                          transition: "all 0.5s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #388e3c, #66bb6a)",
                            opacity: 0.9,
                          },
                        }}
                      >
                        {loading ? `Saving...` : "Save & activate"}
                      </Button>

                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleDraft}
                        startIcon={<SyncIcon />}
                        sx={{
                          flexGrow: "1",
                          background:
                            "linear-gradient(45deg, #ff9800, #ffc107)",
                          color: "#fff",
                          fontSize: { xs: "12px", sm: "14px" },
                          fontWeight: "bold",
                          padding: { xs: "8px 1.5em", sm: "10px 2em" },
                          minWidth: { xs: "120px", sm: "160px" },
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
                        onClick={() => handleCancel(resetForm)}
                        startIcon={<BlockIcon />}
                        sx={{
                          flexGrow: "1",
                          background:
                            "linear-gradient(45deg, #f44336, #e57373)",
                          color: "#fff",
                          fontSize: { xs: "12px", sm: "14px" },
                          fontWeight: "bold",
                          padding: { xs: "8px 1.5em", sm: "10px 2em" },
                          minWidth: { xs: "120px", sm: "160px" },
                          transition: "all 0.5s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #d32f2f, #ef5350)",
                            opacity: 0.9,
                          },
                        }}
                      >
                        {loading ? `Cancelling...` : "Cancel"}
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

        <AddBotDialogBox
          successBox={successBox}
          handleSetSuccessBoxClose={handleCloseDialog}
        />
      </Box>
    </SkeletonTheme>
  );
};

export default AddBot;
