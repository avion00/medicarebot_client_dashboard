import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
  // Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import GoogleIcon from "@mui/icons-material/Google";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const [Usage, setUsage] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    navigate("/login");
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
    phoneNumber: "",
    companyName: "",
    city: "",
    state: "",
    country: "",
    botUsage: "", // Change this to match the form field name
    password: "",
    confirmPassword: "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    companyName: yup.string().required("Company name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    botUsage: yup.string().required("Bot usage is required"), // Make sure to validate botUsage
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
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: true,
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
                    {/* <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Phone number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      name="phoneNumber"
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      sx={{
                        gridColumn: "span 3",
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: colors.blueAccent[500],
                          fontWeight: "bold",
                        },
                      }}
                    /> */}
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

                  <FormControl
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
                  </FormControl>

                  <TextField
                    fullWidth
                    variant="filled"
                    type={showPassword ? "text" : "password"}
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
                    type={showPassword ? "text" : "password"}
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
                    startIcon={<LoginIcon />}
                    sx={{ gridColumn: "span 4", width: "100%", padding: "1em" }}
                  >
                    Continue
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
    </Box>
  );
};

export default Register;
