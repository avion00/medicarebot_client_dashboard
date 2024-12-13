import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { tokens, ColorModeContext } from "../../../theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate, Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import axios from "axios";

const ForgetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success"); // Track type
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://app.medicarebot.live/request_password_reset",
        {
          email: values.email,
        }
      );
      setNotificationMessage(response.data.message);
      setNotificationType("success"); // Set type to success
      setShowNotification(true);
    } catch (error) {
      setNotificationMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setNotificationType("error"); // Set type to error
      setShowNotification(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
  });

  const initialValues = {
    email: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: isNonMobile ? "inherit" : "center",
        flexDirection: isNonMobile ? "row" : "column",
        position: "relative",
        paddingTop: isNonMobile ? "0" : "7em",
      }}
    >
      <Box style={{ position: "absolute", top: "3em", right: "3em" }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "90%",
          position: isNonMobile ? "sticky" : "relative",
          height: isNonMobile ? "100dvh" : "100%",
          top: "0",
          left: "0",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          textAlign: isNonMobile ? "inherit" : "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Header
            title="RESET YOUR PASSWORD"
            subtitle="No worries, we'll send you instructions for reset"
          />
        </Box>
      </Box>
      <Box
        m="20px"
        sx={{
          width: "90%",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Header title="FORGET PASSWORD" />
            <Box
              sx={{
                color: colors.blueAccent[200],
                marginBottom: "2.5em",
                padding: ".5em",
                cursor: "pointer",
              }}
            >
              <Link
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5em",
                }}
                to="/register"
              >
                <ArrowForwardIcon />
                Create New Account
              </Link>
            </Box>
          </Box>

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
                <Box
                  display="grid"
                  gap="1em"
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
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                      marginBottom: "1em",
                    }}
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap="1em" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <LoginIcon />
                      )
                    }
                    sx={{ gridColumn: "span 4", width: "100%", padding: "1em" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending Email..." : "Continue"}
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate("/Login")}
                    startIcon={<KeyboardBackspaceIcon />}
                    sx={{
                      gridColumn: "span 4",
                      width: "100%",
                      padding: "1em",
                      border: `1px solid ${colors.grey[500]}`,
                    }}
                  >
                    Go Back
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>

      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationType === "success" ? "success" : "error"}
          variant="filled"
          sx={{
            backgroundColor:
              notificationType === "success"
                ? colors.greenAccent[700]
                : colors.redAccent[700],
            color:
              notificationType === "success"
                ? colors.greenAccent[200]
                : colors.redAccent[200],
            fontWeight: "bold",
          }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgetPassword;
