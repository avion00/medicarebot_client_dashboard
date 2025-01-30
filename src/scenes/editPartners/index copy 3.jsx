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
import * as yup from "yup";
import { tokens } from "../../theme";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "react-phone-input-2/lib/style.css";
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
  const [initialValues, setInitialValues] = useState({
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
  });

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
      await axios.put(`https://app.medicarebot.live/edit-lead/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotificationType("success");
      setNotificationMessage("Lead updated successfully!");
      setTimeout(() => {
        navigate("/viewPartners");
      }, 2000);
    } catch (error) {
      setNotificationType("error");
      setNotificationMessage("Error updating lead. Please try again.");
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
        validationSchema={checkoutSchema}
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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  name="fullname"
                  error={!!touched.fullname && !!errors.fullname}
                  helperText={touched.fullname && errors.fullname}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
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
