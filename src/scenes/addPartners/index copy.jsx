import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";

const AddCRM = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    setSnackbarOpen(true);
    navigate("/addbot");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlefullNameChange = (event, handleChange) => {
    handleChange(event);
  };
  const handleEmailChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCityChange = (event, handleChange) => {
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


  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    companyName: "",
    industry: "",
    jobTitle: "",
    companySize: "",
    interest: "",
    budgetFrom: "",
    budgetTo: "",
    timelineToPurchase: "",
    preferredContactMethod: "",

   
  };

  const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("Bot Name is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    companyName: yup.string().required("Company Name is required"),
    jobTitle: yup.string().required("Job Title is required"),
    companySize: yup.string().required("Company size is required"),
    industry: yup.string().required("Industry size is required"),
    interest: yup.string().required("Interest/Service of Interest is required"),
    budgetFrom: yup.string().required("Budget From is required"),
    budgetTo: yup.string().required("Budget To is required"),
    timelineToPurchase: yup.string().required("Timeline to purchase is required"),
    preferredContactMethod: yup.string().required("Preferred Contact Method is required"),
  });

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header title="ADD NEW CRM" subtitle="Add your new CRM" />
        <Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: isNonMobile ? undefined : "2em",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            ADD NEW CRM
          </Button>
        </Box>
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
                      gridColumn: "span 2",
                      width: "100%",
                    }}
                  >
                    <PhoneInput
                      country={"us"}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                      }}
                      containerStyle={{
                        width: `65%`,
                        height: "100%",
                        border: "none",
                      }}
                      inputStyle={{
                        width: "100%",
                        marginLeft: "54%",
                        height: "52px",
                        padding: "10px",
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
                    type="number"
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
                  Create New CRM
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
                  Congratulations, you have created Your CRM:
                  <strong>{values.fullName}</strong>
                </Alert>
              </Snackbar>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddCRM;
