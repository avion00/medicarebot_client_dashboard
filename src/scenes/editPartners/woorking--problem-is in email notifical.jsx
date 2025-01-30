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
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
// import * as yup from "yup";
import { tokens } from "../../theme";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";
import axios from "axios";

const EditPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

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

  const [initialValues, setInitialValues] = useState({
    fullname: "",
    email: "",
    country_code: "7",
    mobile_number: "",
    city: "",
    state: "",
    country: "",
    company_name: "",
    job_title: "",
    company_size: "",
    industry: "",
    interest: "",
    budget_from: "",
    budget_to: "",
    timeline_to_purchase: "",
    preferred_contact_method: "",
    pain_points_challenges: "",
    existing_solution: "",
    how_they_found_you: "",
    marketing_communication: "",
    preferred_frequency: "",
  });

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`https://app.medicarebot.live/edit-lead/${id}`)
      .then((response) => {
        setInitialValues(response.data);
      })
      .catch((error) => console.error("Error fetching lead data:", error));
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://app.medicarebot.live/edit-lead/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotificationType("success");
      setNotificationMessage(
        response.data.message || "Lead updated successfully!"
      );

      setTimeout(() => {
        navigate("/viewPartners");
      }, 2000);
    } catch (error) {
      let errorMessage = "Error updating lead. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      setNotificationType("error");
      setNotificationMessage(errorMessage);
      console.error("Error updating lead:", error);
    } finally {
      setLoading(false);
      setShowNotification(true);
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="EDIT PARTNERS" subtitle="Edit Your Partners Details" />
      </Box>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
          isSubmitting,
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
                  value={values.fullname}
                  name="fullname"
                  error={!!touched.fullname && !!errors.fullname}
                  helperText={touched.fullname && errors.fullname}
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
                    gridColumn: "span 2",
                    width: "100%",
                  }}
                >
                  <PhoneInput
                    country={"us"}
                    value={values.mobile_number}
                    onChange={(phone, country) => {
                      // Extract country code and number separately
                      const countryCode = `+${country.dialCode}`;
                      const mobile_number = phone
                        .replace(countryCode, "")
                        .trim();

                      setFieldValue("countryCode", countryCode);
                      setFieldValue("mobile_number", mobile_number);
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
                  {touched.mobile_number && errors.mobile_number && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{
                        mt: 1,
                        display: "block",
                        fontSize: "0.75rem",
                      }}
                    >
                      {errors.mobile_number}
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
                  label="Sate"
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
                  value={values.company_name}
                  name="company_name"
                  error={!!touched.company_name && !!errors.company_name}
                  helperText={touched.company_name && errors.company_name}
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
                  value={values.job_title}
                  name="job_title"
                  error={!!touched.job_title && !!errors.job_title}
                  helperText={touched.job_title && errors.job_title}
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
                  value={values.company_size}
                  name="company_size"
                  error={!!touched.company_size && !!errors.company_size}
                  helperText={touched.company_size && errors.company_size}
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
                  value={values.budget_from}
                  name="budget_from"
                  error={!!touched.budget_from && !!errors.budget_from}
                  helperText={touched.budget_from && errors.budget_from}
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
                  value={values.budget_to}
                  name="budget_to"
                  error={!!touched.budget_to && !!errors.budget_to}
                  helperText={touched.budget_to && errors.budget_to}
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
                    id="timeline_to_purchase"
                    sx={{ color: colors.primary[100] }}
                  >
                    Timeline to purchase
                  </InputLabel>
                  <Select
                    labelId="timeline_to_purchase"
                    id="timeline_to_purchase"
                    value={values.timeline_to_purchase}
                    name="timeline_to_purchase"
                    onChange={(e) =>
                      handleTimelineToPurchaseChange(e, handleChange)
                    }
                    onBlur={handleBlur}
                    error={
                      !!touched.timeline_to_purchase &&
                      !!errors.timeline_to_purchase
                    }
                  >
                    <MenuItem value="Immediate">Immediate</MenuItem>
                    <MenuItem value="1-3_months">1-3 months</MenuItem>
                    <MenuItem value="6+_months">6+ months</MenuItem>
                  </Select>
                  {touched.timeline_to_purchase &&
                    errors.timeline_to_purchase && (
                      <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                        {errors.timeline_to_purchase}
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
                    id="preferred_contact_method"
                    sx={{ color: colors.primary[100] }}
                  >
                    Preferred Contact Method
                  </InputLabel>
                  <Select
                    labelId="preferred_contact_method"
                    id="preferred_contact_method"
                    value={values.preferred_contact_method}
                    name="preferred_contact_method"
                    onChange={(e) =>
                      handlePreferredContactMethodChange(e, handleChange)
                    }
                    onBlur={handleBlur}
                    error={
                      !!touched.preferred_contact_method &&
                      !!errors.preferred_contact_method
                    }
                  >
                    <MenuItem value="Immediate">Facebook</MenuItem>
                    <MenuItem value="Immediate">Youtube</MenuItem>
                    <MenuItem value="twitter">Twitter</MenuItem>
                    <MenuItem value="website">Website</MenuItem>
                    <MenuItem value="ai_tools">Ai Tools</MenuItem>
                  </Select>
                  {touched.preferred_contact_method &&
                    errors.preferred_contact_method && (
                      <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                        {errors.preferred_contact_method}
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
                  value={values.pain_points_challenges}
                  name="pain_points_challenges"
                  error={
                    !!touched.pain_points_challenges &&
                    !!errors.pain_points_challenges
                  }
                  helperText={
                    touched.pain_points_challenges &&
                    errors.pain_points_challenges
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
                  value={values.existing_solution}
                  name="existing_solution"
                  error={
                    !!touched.existing_solution && !!errors.existing_solution
                  }
                  helperText={
                    touched.existing_solution && errors.existing_solution
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
                  onChange={(e) => handleHowTheyFoundYouChange(e, handleChange)}
                  value={values.how_they_found_you}
                  name="how_they_found_you"
                  error={
                    !!touched.how_they_found_you && !!errors.how_they_found_you
                  }
                  helperText={
                    touched.how_they_found_you && errors.how_they_found_you
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
                  value={values.marketing_communication}
                  name="marketing_communication"
                  error={
                    !!touched.marketing_communication &&
                    !!errors.marketing_communication
                  }
                  helperText={
                    touched.marketing_communication &&
                    errors.marketing_communication
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
                  value={values.preferred_frequency}
                  name="preferred_frequency"
                  error={
                    !!touched.preferred_frequency &&
                    !!errors.preferred_frequency
                  }
                  helperText={
                    touched.preferred_frequency && errors.preferred_frequency
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

            <Box display="flex" justifyContent="start" mt="2em">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                startIcon={
                  loading ? <CircularProgress size={20} /> : <EditIcon />
                }
                disabled={loading || isSubmitting}
                sx={{
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
      >
        <Alert severity={notificationType} sx={{ width: "100%" }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPartners;
