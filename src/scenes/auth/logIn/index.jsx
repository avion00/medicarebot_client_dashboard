import { useContext, useState, useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  // Divider
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { tokens, ColorModeContext } from "../../../theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";

// Initial values for Formik
// const initialValues = {
//   username: "",
//   password: "",
// };

// Validation schema using Yup
const checkoutSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LogIn = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate(); // Initialize navigate hook

  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [savedUsername, setSavedUsername] = useState("");

  // ✅ Load saved credentials from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setSavedUsername(storedUsername);
      setRememberMe(true);
    }
  }, []);

  // ✅ When "Remember Me" is unchecked, clear stored username
  useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem("username");
      setSavedUsername("");
    }
  }, [rememberMe]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("https://app.buy2rent.eu/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

      setNotificationType("success");
      setNotificationMessage(` ${data.message} ~ ${values.username}`);
      setShowNotification(true);

      // Store token in cookies and local storage
      document.cookie = `authToken=${data.token};path=/;secure`;
      sessionStorage.setItem("authToken", data.token);

      // ✅ Save only username in localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("username", values.username);
      }

      // Wait for 3 seconds before navigating
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error.message);

      setNotificationType("error");
      setNotificationMessage(
        error.message || "An error occurred. Please try again."
      );
      setShowNotification(true);
    } finally {
      setSubmitting(false);
    }
  };

  // const buttonStyles = {
  //   flexGrow: 1,
  //   padding: ".75em 1em",
  //   borderColor: colors.grey[900],
  //   color: colors.blueAccent[100],
  //   borderRadius: "3px",
  // };

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
        <Box
          sx={{
            marginTop: "-5em",
            paddingLeft: isNonMobile ? "2em" : "0",
            // width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: isNonMobile ? "undefined" : "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              width: "200px",
              alignItems: "center",
              alignContent: "center",
              marginTop: isNonMobile ? "0" : "2em",
              marginLeft: "-.5em",
              marginBottom: ".5em",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              src="/Medicare-Logo.png"
              alt="Medicare bot logo"
            />
          </Typography>
          <Header
            title="WELCOME TO MEDICARE BOT"
            subtitle="Please Login to continue"
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
              // alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Header
              style={{
                fontSize: isNonMobile ? "1em" : "0.5em",
              }}
              title="LOGIN"
            />

            <Box
              sx={{
                color: colors.blueAccent[200],
                marginTop: isNonMobile ? "1.5em" : " 0.5em",
                // padding: ".5em",
                cursor: "pointer",
                // display: "flex",
                // justifyContent: "start",
                // alignContent: "start",
                // justifyItems: "start",
                // alignItems: "start",
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
            initialValues={{ username: savedUsername, password: "" }}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} action="">
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
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    autoComplete="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
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
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    autoComplete="current-password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{
                      gridColumn: "span 4",
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 .5em",
                      marginBottom: "1em",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <FormGroup>
                        <FormControlLabel
                          required
                          control={
                            <Checkbox
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              sx={{
                                color: colors.blueAccent[100],
                                "&.Mui-checked": {
                                  color: colors.blueAccent[100],
                                },
                              }}
                            />
                          }
                          label={
                            <span style={{ color: colors.blueAccent[100] }}>
                              Remember
                            </span>
                          }
                          sx={{ color: colors.blueAccent[200] }}
                        />
                      </FormGroup>
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        color: colors.blueAccent[200],
                        textDecoration: "none",
                        opacity: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          textDecoration: "underline",
                          opacity: 0.7,
                        },
                      }}
                    >
                      <Link
                        to="/forgetPassword"
                        style={{
                          all: "unset",
                          display: "flex",
                          alignItems: "center",
                          gap: ".5em",
                          color: colors.blueAccent[200],
                        }}
                      >
                        Forget Password?
                      </Link>
                    </Box>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="start" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      background: "linear-gradient(45deg, #062994, #0E72E1)",
                      color: "#fff",
                      width: isNonMobile ? "50%" : "100%",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        opacity: 0.7,
                      },
                    }}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <LoginIcon />
                      )
                    }
                  >
                    {isSubmitting ? "Logging in…" : "Log In"}
                  </Button>
                </Box>
                {/* Horizontal line and centered text */}

                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "20px 0",
                  }}
                >
                  <Divider sx={{ flexGrow: 1 }} />
                  <span
                    style={{ margin: ".5em", color: colors.blueAccent[100] }}
                  >
                    or sign in with
                  </span>
                  <Divider sx={{ flexGrow: 1 }} />
                </Box> */}

                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  mt="20px"
                  gap="1em"
                >
                  <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{
                      ...buttonStyles,
                      backgroundColor: colors.redAccent[700],
                      "&:hover": {
                        backgroundColor: colors.primary[400],
                      },
                    }}
                    onClick={() => {
                      // Handle Google sign-in logic here
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<TwitterIcon />}
                    sx={{
                      ...buttonStyles,
                      backgroundColor: colors.greenAccent[700],
                      "&:hover": {
                        backgroundColor: colors.primary[400],
                      },
                    }}
                    onClick={() => {
                      // Handle Twitter sign-in logic here
                    }}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{
                      ...buttonStyles,
                      backgroundColor: colors.grey[700],
                      "&:hover": {
                        backgroundColor: colors.primary[400],
                      },
                    }}
                    onClick={() => {
                      // Handle GitHub sign-in logic here
                    }}
                  >
                    GitHub
                  </Button>
                </Box> */}
              </form>
            )}
          </Formik>
        </Box>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notificationType}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LogIn;
