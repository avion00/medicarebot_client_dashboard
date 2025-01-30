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
    fullname: "",
    email: "",
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
