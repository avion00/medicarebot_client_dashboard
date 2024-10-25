import { useContext, useState } from "react";

import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens, ColorModeContext } from "../../theme";
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

import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const LogIn = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    navigate("/dashboard");
  };

  const buttonStyles = {
    flexGrow: 1,
    padding: ".75em 1em",
    borderColor: colors.grey[900],
    color: colors.blueAccent[100],
    borderRadius: "3px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "100dvh",
        position: "relative",
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
          width: "300px",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Header
            title="WELCOME TO MEDICARE BOT"
            subtitle="Please Login to continue"
          />
        </Box>
      </Box>
      <Box
        m="20px"
        sx={{
          width: "300px",
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
            <Header title="LOGIN PAGE" />
            <Box
              sx={{
                color: colors.blueAccent[200],
                marginBottom: "2.5em",
                padding: ".5em",
                cursor: "pointer",
              }}
            >
              <a
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5em",
                }}
                href="/register"
              >
                <ArrowForwardIcon />
                Create New Account
              </a>
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
                          style={{
                            marginRight: "1em",
                          }}
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
                              Remember
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
                      Forget Password?
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
                <Box
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

                {/* Social Media Buttons */}
                <Box
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
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default LogIn;
