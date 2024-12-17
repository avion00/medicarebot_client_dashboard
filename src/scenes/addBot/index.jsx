import React,  { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
  IconButton,
  Typography,
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
import UploadIcon from "@mui/icons-material/Upload";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";





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
  { id: 7, label: "Step 7", content: "Upload images", inputType: "image" },
  { id: 8, label: "Step 8", content: "Upload sound", inputType: "audio" },
];







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
    apiKey: "",
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
















 const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Inputs (Multiple fields)
  const [formDataStep1, setFormDataStep1] = useState({
    textInput: "",
    textArea: "",
    numberInput: "",
    imageInput: null,
  });

  // Step 2 Inputs (Multiple fields)
  const [formDataStep2, setFormDataStep2] = useState({
    additionalText: "",
    additionalNumber: "",
    additionalCheckbox: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic
    alert("Form Submitted!");
    console.log({ formDataStep1, formDataStep2 });
  };

  // Handling changes in Step 1
  const handleChangeStep1 = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormDataStep1((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files : type === "checkbox" ? checked : value,
    }));
  };

  // Handling changes in Step 2
  const handleChangeStep2 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataStep2((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };






const [imageOne, setImageOne] = useState(null);
const [isDraggingOne, setIsDraggingOne] = useState(false);

const [imageTwo, setImageTwo] = useState(null);
const [isDraggingTwo, setIsDraggingTwo] = useState(false);

const [imageThree, setImageThree] = useState(null);
const [isDraggingThree, setIsDraggingThree] = useState(false);

const [attachDocuments, setAttachDocuments] = useState("");
const [uploadKnowledgeBase, setuploadKnowledgeBase] = useState("");
  
// document wala ho yo, bujhis,  knowledge base, wala
const handleattachDocumentsChange = (event) => {
  const file = event.target.files[0];
  setAttachDocuments(file ? file.name : "");
};

const handleuploadKnowledgeBaseChange = (event) => {
  const file = event.target.files[0];
  setuploadKnowledgeBase(file ? file.name : "");
};




// three avatar wala image k handle gar
const handleFileOneChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => setImageOne(reader.result); // Get image as a base64 string
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
    reader.onload = () => setImageTwo(reader.result); // Get image as a base64 string
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
    reader.onload = () => setImageTwo(reader.result); // Get image as a base64 string
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
    reader.onload = () => setImageThree(reader.result); // Get image as a base64 string
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
    reader.onload = () => setImageThree(reader.result); // Get image as a base64 string
    reader.readAsDataURL(file);
  }
};

const handleClickThree = () => {
  document.getElementById("imageInputThree").click();
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
                      ? colors.blueAccent[300]
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
                    width: "50px",
                    height: "2px",
                    backgroundColor:
                      currentStep >= step.id + 1
                        ? colors.blueAccent[400]
                        : colors.grey[200], // Fixed this line
                    marginTop: "-1.9em",
                    marginLeft: "3.8em",
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
                      {/* Invisible input field */}
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
                      {/* Invisible input field */}
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
                      {/* Invisible input field */}
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
                      gridColumn: "span 2",
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
                      error={
                        !!touched.usageFrequency && !!errors.usageFrequency
                      }
                      helperText={
                        touched.usageFrequency && errors.usageFrequency
                      }
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
              )}

              {currentStep === 5 && (
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
                /> */}
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
                      error={
                        !!touched.usageFrequency && !!errors.usageFrequency
                      }
                      helperText={
                        touched.usageFrequency && errors.usageFrequency
                      }
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
              )}

              {currentStep === 8 && (
                <Box>
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
                </Box>
              )}

              {/* Navigation Buttons */}
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
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
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
