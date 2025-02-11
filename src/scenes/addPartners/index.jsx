import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";
import axios from "axios";

const AddPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handlefullNameChange = (event, handleChange) => {
    handleChange(event);
  };
  const handleEmailChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCityChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleStateChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCountryChange = (event, handleChange) => {
    handleChange(event);
  };

  const HandlePartnerDefinitionChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCompanyNameChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleJobTitleChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCompanySizeChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleIndustryChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleInterestChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleBudgetFromChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleBudgetToChange = (event, handleChange) => {
    handleChange(event);
  };
  const handlePreferredContactMethodChange = (event, handleChange) => {
    handleChange(event);
  };

  const handlePainPointsChallangesChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleExistingSolutionChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleHowTheyFoundYouChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleTimelineToPurchaseChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleMarketingCommunicationChange = (event, handleChange) => {
    handleChange(event);
  };

  const handlePreferredFrequencyChange = (event, handleChange) => {
    handleChange(event);
  };

  // integration

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleFormSubmit = async (values) => {
    setLoading(true);

    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/add-lead",
        {
          fullname: values.fullName,
          email: values.email,
          country_code: values.countryCode,
          mobile_number: values.phoneNumber,
          company_name: values.companyName,
          city: values.city,
          state: values.state,
          country: values.country,
          job_title: values.jobTitle,
          company_size: values.companySize,
          industry: values.industry,
          interest: values.interest,
          budget_from: values.budgetFrom,
          budget_to: values.budgetTo,
          timeline_to_purchase: values.timelineToPurchase,
          preferred_contact_method: values.preferredContactMethod,
          pain_points_challenges: values.painPointsChallanges,
          existing_solution: values.existingSolution,
          how_they_found_you: values.howTheyFoundYou,
          marketing_communication: values.marketingCommunication,
          preferred_frequency: values.preferredFrequency,
          partner_definition: values.partnerDefinition,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setNotificationType("success");
        setNotificationMessage(
          `Lead added successfully! Redirecting in ${countdown}s...`
        );
        setShowNotification(true);

        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          navigate("/viewPartners");
          clearInterval(timer);
        }, 5000);
      }
    } catch (error) {
      setNotificationType("error");
      setNotificationMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const initialValues = {
    fullName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    companyName: "",
    jobTitle: "",
    companySize: "",
    industry: "",
    interest: "",
    budgetFrom: "",
    budgetTo: "",
    timelineToPurchase: "",
    preferredContactMethod: "",
    painPointsChallanges: "",
    existingSolution: "",
    howTheyFoundYou: "",
    marketingCommunication: "",
    preferredFrequency: "",
    partnerDefinition: "",
  };

  const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("Bot Name is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    companyName: yup.string().required("Company Name is required"),
    jobTitle: yup.string().required("Job Title is required"),
    companySize: yup.string().required("Company size is required"),
    partnerDefinition: yup
      .string()
      .required("Partners Definition is required"),

    // these are optional in backend
    industry: yup.string().nullable(),
    interest: yup.string().nullable(),
    budgetFrom: yup.string().nullable(),
    budgetTo: yup.string().nullable(),
    timelineToPurchase: yup.string().nullable(),
    preferredContactMethod: yup.string().nullable(),

    // these are optional in frontend as well
    painPointsChallanges: yup.string().nullable(),
    existingSolution: yup.string().nullable(),
    howTheyFoundYou: yup.string().nullable(),
    marketingCommunication: yup.string().nullable(),
    preferredFrequency: yup.string().nullable(),
  });

  // upload file
  const payload = {
    UploadLeadsviaFile: "",
  };

  const checkoutSchemaaa = yup.object().shape({
    UploadLeadsviaFile: yup.string().nullable(),
  });

  const [UploadLeadsviaFile, setUploadLeadsviaFile] = useState(null);

  const handleUploadLeadsviaFileChange = (event) => {
    const file = event.target.files[0];
    setUploadLeadsviaFile(file || null);
  };

  const handleFormUploadSubmit = async (values, { resetForm }) => {
    if (!UploadLeadsviaFile) {
      setNotificationType("error");
      setNotificationMessage("Please select a file before uploading.");
      setShowNotification(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", UploadLeadsviaFile);

    const token = sessionStorage.getItem("authToken");

    setLoading(true); // Set loading state before request

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/upload-leads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Corrected template literal
          },
        }
      );

      if (response.data?.status === "success") {
        // Ensure correct success key
        setNotificationType("success");
        setNotificationMessage(response.data.message);
        setShowNotification(true);
        resetForm();
        setUploadLeadsviaFile(null);
      } else {
        throw new Error(response.data?.message || "Request failed.");
      }
    } catch (error) {
      setNotificationType("error");
      setNotificationMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setShowNotification(true);
    } finally {
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
        <Header title="ADD NEW PARTNERS" subtitle="Add your new Partners" />

        <Formik
          initialValues={payload}
          validationSchema={checkoutSchemaaa}
          onSubmit={handleFormUploadSubmit}
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

              <Box
                display="flex"
                justifyContent="center"
                gap="20px"
                alignItems="center"
              >
                <Box>
                  <TextField
                    label="Upload Partners via File"
                    variant="filled"
                    type="text"
                    name="UploadLeadsviaFile"
                    value={UploadLeadsviaFile ? UploadLeadsviaFile.name : ""}
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
                            name="UploadLeadsviaFile"
                            onChange={(e) => handleUploadLeadsviaFileChange(e)}
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
                <Box>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <AddIcon />
                      )
                    }
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(45deg, #062994, #0E72E1)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        opacity: loading ? "1" : ".7",
                      },
                    }}
                  >
                    {loading ? "Uploading..." : "Upload File"}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>

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
            setFieldValue,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: colors.grey[100] }}
                >
                  Basic Information
                </Typography>

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
                    label="Full Name"
                    onBlur={handleBlur}
                    onChange={(e) => handlefullNameChange(e, handleChange)}
                    value={values.fullName}
                    name="fullName"
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
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
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={(e) => handleEmailChange(e, handleChange)}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <Box
                    sx={{
                      gridColumn: "span 1",
                      width: "100%",
                    }}
                  >
                    <PhoneInput
                      country={"us"}
                      value={values.phoneNumber}
                      onChange={(phone, country) => {
                        // Extract country code and number separately
                        const countryCode = `+${country.dialCode}`;
                        const phoneNumber = phone
                          .replace(countryCode, "")
                          .trim();

                        setFieldValue("countryCode", countryCode);
                        setFieldValue("phoneNumber", phoneNumber);
                      }}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                      }}
                      containerStyle={{
                        width: "65%",
                        height: "53px",
                        border: "none",
                        // border: '1px solid red'
                      }}
                      inputStyle={{
                        width: "100%",
                        marginLeft: "50%",
                        height: "53px",
                        padding: "10px",
                        paddingLeft: ".5em",
                        fontSize: "14px",
                        borderRadius: "0 .3em 0 0",
                        backgroundColor: colors.primary[400],
                        color: colors.primary[100],
                        border: "none",
                        borderBottom: `1px solid ${colors.primary[100]}`,
                      }}
                      buttonStyle={{
                        width: "50%",
                        backgroundColor: colors.primary[400],
                        borderRadius: " .3em 0 0 0 ",
                        border: "none",
                        borderBottom: `1px solid ${colors.primary[100]}`,
                      }}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{
                          mt: 1,
                          display: "block",
                          fontSize: "0.75rem",
                        }}
                      >
                        {errors.phoneNumber}
                      </Typography>
                    )}
                  </Box>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="City"
                    onBlur={handleBlur}
                    onChange={(e) => handleCityChange(e, handleChange)}
                    value={values.city}
                    name="city"
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
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
                    type="text"
                    label="State"
                    onBlur={handleBlur}
                    onChange={(e) => handleStateChange(e, handleChange)}
                    value={values.state}
                    name="state"
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
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
                    type="text"
                    label="Country"
                    onBlur={handleBlur}
                    onChange={(e) => handleCountryChange(e, handleChange)}
                    value={values.country}
                    name="country"
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Partners Definition
                </Typography>

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
                      id="partnerDefinition"
                      sx={{ color: colors.primary[100] }}
                    >
                      Partners Definition
                    </InputLabel>
                    <Select
                      labelId="partnerDefinition"
                      id="partnerDefinition"
                      value={values.partnerDefinition}
                      name="partnerDefinition"
                      onChange={(e) =>
                        HandlePartnerDefinitionChange(e, handleChange)
                      }
                      onBlur={handleBlur}
                      error={
                        !!touched.partnerDefinition &&
                        !!errors.partnerDefinition
                      }
                    >
                      <MenuItem value="vendors">Vendors</MenuItem>
                      <MenuItem value="clients ">Clients</MenuItem>
                    </Select>
                    {touched.partnerDefinition &&
                      errors.partnerDefinition && (
                        <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                          {errors.partnerDefinition}
                        </Box>
                      )}
                  </FormControl>
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Business Information (for B2B)
                </Typography>

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
                    label="Company Name"
                    onBlur={handleBlur}
                    onChange={(e) => handleCompanyNameChange(e, handleChange)}
                    value={values.companyName}
                    name="companyName"
                    error={!!touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
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
                    label="Job Title"
                    onBlur={handleBlur}
                    onChange={(e) => handleJobTitleChange(e, handleChange)}
                    value={values.jobTitle}
                    name="jobTitle"
                    error={!!touched.jobTitle && !!errors.jobTitle}
                    helperText={touched.jobTitle && errors.jobTitle}
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
                    label="Company Size"
                    onBlur={handleBlur}
                    onChange={(e) => handleCompanySizeChange(e, handleChange)}
                    value={values.companySize}
                    name="companySize"
                    error={!!touched.companySize && !!errors.companySize}
                    helperText={touched.companySize && errors.companySize}
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
                    label="Industry"
                    onBlur={handleBlur}
                    onChange={(e) => handleIndustryChange(e, handleChange)}
                    value={values.industry}
                    name="industry"
                    error={!!touched.industry && !!errors.industry}
                    helperText={touched.industry && errors.industry}
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

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Engagement and Interest
                </Typography>

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
                    label="Interest/Service of Interest"
                    onBlur={handleBlur}
                    onChange={(e) => handleInterestChange(e, handleChange)}
                    value={values.interest}
                    name="interest"
                    error={!!touched.interest && !!errors.interest}
                    helperText={touched.interest && errors.interest}
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Relevant Information
                </Typography>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="500"
                    gutterBottom
                    sx={{
                      mt: "1em",
                      color: colors.grey[100],
                    }}
                  >
                    Budget Range:
                  </Typography>
                </Box>

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
                    type="number"
                    label="From"
                    onBlur={handleBlur}
                    onChange={(e) => handleBudgetFromChange(e, handleChange)}
                    value={values.budgetFrom}
                    name="budgetFrom"
                    error={!!touched.budgetFrom && !!errors.budgetFrom}
                    helperText={touched.budgetFrom && errors.budgetFrom}
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
                    type="number"
                    label="Budget To"
                    onBlur={handleBlur}
                    onChange={(e) => handleBudgetToChange(e, handleChange)}
                    value={values.budgetTo}
                    name="budgetTo"
                    error={!!touched.budgetTo && !!errors.budgetTo}
                    helperText={touched.budgetTo && errors.budgetTo}
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
                      id="timelineTopurchase"
                      sx={{ color: colors.primary[100] }}
                    >
                      Timeline to purchase
                    </InputLabel>
                    <Select
                      labelId="timelineTopurchase"
                      id="timelineTopurchase"
                      value={values.timelineToPurchase}
                      name="timelineToPurchase"
                      onChange={(e) =>
                        handleTimelineToPurchaseChange(e, handleChange)
                      }
                      onBlur={handleBlur}
                      error={
                        !!touched.timelineToPurchase &&
                        !!errors.timelineToPurchase
                      }
                    >
                      <MenuItem value="Immediate">Immediate</MenuItem>
                      <MenuItem value="1-3_months">1-3 months</MenuItem>
                      <MenuItem value="6+_months">6+ months</MenuItem>
                    </Select>
                    {touched.timelineToPurchase &&
                      errors.timelineToPurchase && (
                        <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                          {errors.timelineToPurchase}
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
                      id="preferredContactMethod"
                      sx={{ color: colors.primary[100] }}
                    >
                      Preferred Contact Method
                    </InputLabel>
                    <Select
                      labelId="preferredContactMethod"
                      id="preferredContactMethod"
                      value={values.preferredContactMethod}
                      name="preferredContactMethod"
                      onChange={(e) =>
                        handlePreferredContactMethodChange(e, handleChange)
                      }
                      onBlur={handleBlur}
                      error={
                        !!touched.preferredContactMethod &&
                        !!errors.preferredContactMethod
                      }
                    >
                      <MenuItem value="Immediate">Facebook</MenuItem>
                      <MenuItem value="Immediate">Youtube</MenuItem>
                      <MenuItem value="twitter">Twitter</MenuItem>
                      <MenuItem value="website">Website</MenuItem>
                      <MenuItem value="ai_tools">Ai Tools</MenuItem>
                    </Select>
                    {touched.preferredContactMethod &&
                      errors.preferredContactMethod && (
                        <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                          {errors.preferredContactMethod}
                        </Box>
                      )}
                  </FormControl>
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Qualifying Questions (Optional)
                </Typography>

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
                    label="Pain Points of Challanges"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handlePainPointsChallangesChange(e, handleChange)
                    }
                    value={values.painPointsChallanges}
                    name="painPointsChallanges"
                    error={
                      !!touched.painPointsChallanges &&
                      !!errors.painPointsChallanges
                    }
                    helperText={
                      touched.painPointsChallanges &&
                      errors.painPointsChallanges
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
                    type="text"
                    label="Existing Solution/Competitors"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleExistingSolutionChange(e, handleChange)
                    }
                    value={values.existingSolution}
                    name="existingSolution"
                    error={
                      !!touched.existingSolution && !!errors.existingSolution
                    }
                    helperText={
                      touched.existingSolution && errors.existingSolution
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
                    type="text"
                    label="How they found You"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleHowTheyFoundYouChange(e, handleChange)
                    }
                    value={values.howTheyFoundYou}
                    name="howTheyFoundYou"
                    error={
                      !!touched.howTheyFoundYou && !!errors.howTheyFoundYou
                    }
                    helperText={
                      touched.howTheyFoundYou && errors.howTheyFoundYou
                    }
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Marketing permission and compliance
                </Typography>

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
                    label="Consent to Receive Marketing Communication"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleMarketingCommunicationChange(e, handleChange)
                    }
                    value={values.MarketingCommunication}
                    name="MarketingCommunication"
                    error={
                      !!touched.MarketingCommunication &&
                      !!errors.MarketingCommunication
                    }
                    helperText={
                      touched.MarketingCommunication &&
                      errors.MarketingCommunication
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
                    type="text"
                    label="Preferred Frequency Contact"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handlePreferredFrequencyChange(e, handleChange)
                    }
                    value={values.preferredFrequency}
                    name="preferredFrequency"
                    error={
                      !!touched.preferredFrequency &&
                      !!errors.preferredFrequency
                    }
                    helperText={
                      touched.preferredFrequency && errors.preferredFrequency
                    }
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box mt="2em">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  startIcon={
                    loading ? (
                      <CircularProgress
                        size={24}
                        sx={{ color: colors.grey[100] }}
                      />
                    ) : (
                      <AddIcon />
                    )
                  }
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(45deg, #062994, #0E72E1)",
                    color: "#fff",
                    // width: isNonMobile ? "50%" : "100%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      opacity: ".7",
                    },
                  }}
                >
                  {loading ? `Adding...` : "Add New Partners"}
                </Button>
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
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddPartners;
