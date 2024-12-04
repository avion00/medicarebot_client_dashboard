import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  // Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import GoogleIcon from "@mui/icons-material/Google";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";
import axios from "axios";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const [Usage, setUsage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://app.medicarebot.live/register",
        {
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.username,
          email: values.email,
          country_code: values.countryCode,
          mobile_number: values.phoneNumber,
          company_name: values.companyName,
          city: values.city,
          state: values.state,
          country: values.country,
          medicare_bot_usage: values.botUsage,
          package: values.package,
          password: values.password,
        }
      );

      if (response.data.success) {
        setNotificationType("success");
        setNotificationMessage("Registration successful! Redirecting...");
        setShowNotification(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error(response.data.message || "Registration failed.");
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

  // const buttonStyles = {
  //   flexGrow: 1,
  //   padding: ".75em 1em",
  //   borderColor: colors.grey[900],
  //   color: colors.blueAccent[100],
  //   borderRadius: "3px",
  // };

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    countryCode: "+977",
    phoneNumber: "",
    companyName: "",
    city: "",
    state: "",
    country: "",
    botUsage: "",
    package: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    companyName: yup.string().required("Company name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    botUsage: yup.string().required("Bot usage is required"),
    package: yup.string().required("Package is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

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
      <Box
        style={{
          position: "absolute",
          top: "3em",
          right: "3em",
        }}
      >
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
        <Header
          title="WELCOME TO MEDICARE BOT"
          subtitle="Please Register to continue"
        />
      </Box>

      <Box
        m="20px"
        sx={{
          paddingTop: isNonMobile ? "10.4em" : "0",
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
            <Header title="REGISTER PAGE" />
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
                to="/login"
              >
                <ArrowForwardIcon />
                Already have Account?
              </Link>
            </Box>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
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
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
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
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
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
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
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
                    type="email"
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
                    }}
                  />
                  <Box
                    sx={{ gridColumn: "span 4", display: "flex", gap: "1em" }}
                  >
                    <Box
                      sx={{
                        gridColumn: "span 4",
                        width: "100%",
                      }}
                    >
                      <PhoneInput
                        country={"us"}
                        value={values.phoneNumber}
                        onChange={(value) =>
                          handleChange({
                            target: { name: "phoneNumber", value },
                          })
                        }
                        onBlur={handleBlur}
                        name="phoneNumber"
                        inputProps={{
                          name: "phone",
                          required: true,
                        }}
                        containerStyle={{
                          width: `65%`,
                          height: "100%",
                          // padding: "10px",
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
                  </Box>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Company Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.companyName}
                    name="companyName"
                    error={!!touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      gap: "1em",
                    }}
                  >
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
                      sx={{
                        gridColumn: "span 1",
                        flexGrow: "1",
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
                      onChange={handleChange}
                      value={values.state}
                      name="state"
                      error={!!touched.state && !!errors.state}
                      helperText={touched.state && errors.state}
                      sx={{
                        gridColumn: "span 1",
                        flexGrow: "1",
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
                      onChange={handleChange}
                      value={values.country}
                      name="country"
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                      sx={{
                        gridColumn: "span 1",
                        flexGrow: "1",
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: colors.blueAccent[500],
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Box>

                  {/* <FormControl
                    fullWidth
                    variant="filled"
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <InputLabel
                      id="bot-usage-label"
                      sx={{ color: colors.primary[100] }}
                    >
                      Medicare Bot Usage
                    </InputLabel>
                    <Select
                      labelId="bot-usage-label"
                      id="bot-usage"
                      value={values.botUsage} // Corrected to use 'botUsage'
                      name="botUsage" // This must match initial values and validation schema
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.botUsage && !!errors.botUsage}
                    >
                      <MenuItem value={10}>Personal Use</MenuItem>
                      <MenuItem value={20}>For Client</MenuItem>
                      <MenuItem value={30}>As an Agent</MenuItem>
                    </Select>
                    {touched.botUsage && errors.botUsage ? (
                      <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                        {errors.botUsage}
                      </Box>
                    ) : null}{" "}
                  </FormControl> */}

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Bot Usage"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.botUsage}
                    name="botUsage"
                    error={!!touched.botUsage && !!errors.botUsage}
                    helperText={touched.botUsage && errors.botUsage}
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
                    label="Package"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.package}
                    name="package"
                    error={!!touched.package && !!errors.package}
                    helperText={touched.package && errors.package}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="filled"
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
                        <InputAdornment position="end">
                          <IconButton
                            sx={{ marginRight: "0" }}
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{ marginRight: "0" }}
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
                      justifyContent: "start",
                      padding: "0 .5em",
                      marginBottom: "1em",
                      width: "100%",
                    }}
                  >
                    {/* Remember Me Section */}
                    <Box>
                      <FormGroup>
                        <FormControlLabel
                          required
                          control={
                            <Checkbox
                              sx={{
                                color: colors.blueAccent[100], // Default color
                                "&.Mui-checked": {
                                  color: colors.blueAccent[100],
                                },
                              }}
                            />
                          }
                          label={
                            <span style={{ color: colors.blueAccent[100] }}>
                              Aggre with
                            </span>
                          }
                          sx={{
                            color: colors.blueAccent[200], // Ensure label color is set for default
                          }}
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
                      onClick={() => {
                        // Handle forget password logic here
                      }}
                    >
                      Terms & Condition
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={
                      loading ? (
                        <CircularProgress
                          size={24}
                          sx={{ color: colors.grey[100] }}
                        />
                      ) : (
                        <ArrowForwardIcon />
                      )
                    }
                    disabled={loading}
                    sx={{ mt: 3, width: "100%", py: 1.5 }}
                  >
                    {loading
                      ? `Registering...`
                      : "Register"}
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
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt="20px"
                  gap="1em"
                  sx={{
                    marginBottom: "2em",
                  }}
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
  );
};

export default Register;
