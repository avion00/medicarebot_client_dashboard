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
import { tokens } from "../../theme";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Add useLocation
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
  const { id } = useParams(); // Get the `id` from the URL
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Initial form values
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
  });

  const token = sessionStorage.getItem("authToken");

  // Fetch lead data when the component mounts
  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        // Check if row data is passed via state
        if (location.state) {
          setInitialValues(location.state); // Use passed data
        } else {
          // Fetch data from the API if not passed
          const response = await axios.get(
            `https://app.medicarebot.live/edit-lead/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data) {
            setInitialValues(response.data); // Set fetched data
          }
        }
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };

    fetchLeadData();
  }, [id, token, location.state]);

  // Handle form submission
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
        enableReinitialize // Reinitialize the form when initialValues change
        initialValues={initialValues}
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
                {/* Full Name */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
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

                {/* Email */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
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

                {/* Mobile Number */}
                <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="mobile-number-label">
                    Mobile Number
                  </InputLabel>
                  <PhoneInput
                    country={"us"} // Default country
                    value={`+${values.country_code}${values.mobile_number}`}
                    onChange={(value) => {
                      const [countryCode, mobileNumber] = value.split(" ");
                      setFieldValue(
                        "country_code",
                        countryCode.replace("+", "")
                      );
                      setFieldValue("mobile_number", mobileNumber);
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "56px",
                      paddingLeft: "60px",
                    }}
                  />
                </FormControl>

                {/* City */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* State */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Country */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  error={!!touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Company Name */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company_name}
                  name="company_name"
                  error={!!touched.company_name && !!errors.company_name}
                  helperText={touched.company_name && errors.company_name}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Job Title */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Job Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.job_title}
                  name="job_title"
                  error={!!touched.job_title && !!errors.job_title}
                  helperText={touched.job_title && errors.job_title}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* Company Size */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Company Size"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.company_size}
                  name="company_size"
                  error={!!touched.company_size && !!errors.company_size}
                  helperText={touched.company_size && errors.company_size}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting || loading}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    <>
                      <EditIcon sx={{ mr: "10px" }} />
                      Update Partner
                    </>
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={notificationType} sx={{ width: "100%" }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPartners;
