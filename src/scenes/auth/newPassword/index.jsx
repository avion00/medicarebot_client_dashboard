import { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
  Snackbar,
  CircularProgress,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import { tokens, ColorModeContext } from "../../../theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const NewPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const colorMode = useContext(ColorModeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedToken = queryParams.get("token");
    if (extractedToken) {
      localStorage.setItem("resetToken", extractedToken);
      setToken(extractedToken);
    }
  }, [location.search]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleFormSubmit = async (values) => {
    console.log("upper token", token);
    console.log("rest token", token);

    const storedToken = localStorage.getItem("resetToken");
    console.log("upper token", token);
    console.log("store token", storedToken);
    if (!storedToken) {
      setErrorSnackbar(true);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://app.medicarebot.live//newPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: storedToken,
            new_password: values.password,
          }),
        }
      );
      console.log("try token", token);
      console.log("try store token", storedToken);

      const result = await response.json();

      if (response.ok) {
        if (remember) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify({
              password: values.password,
            })
          );
        }
        setOpenSnackbar(true);
        setTimeout(() => {
          localStorage.removeItem("resetToken");
          navigate("/login");
        }, 1500);
      } else {
        setErrorSnackbar(true);
        alert(result.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorSnackbar(true);
      console.log("catch token", token);
      console.log("catch token", storedToken);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setErrorSnackbar(false);
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
            title="GENERATE YOUR NEW PASSWORD"
            subtitle="make your new password"
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
            <Header title="Set Your New Password" />
          </Box>

          <Box>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={passwordSchema}
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
                  <Box display="grid" gap="20px">
                    <TextField
                      fullWidth
                      variant="filled"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={touched.password && !!errors.password}
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
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type={showConfirmPassword ? "text" : "password"}
                      label="Confirm Password"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      sx={{
                        gridColumn: "span 4",
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: colors.blueAccent[500],
                          fontWeight: "bold",
                        },
                      }}
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{
                              marginRight: "1em",
                            }}
                          >
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box mt="1em">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
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
                  <Box mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disabled={isSubmitting}
                      style={{
                        padding: " .8em 2em",
                        fontWeight: "700",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          Changing Password{" "}
                          <CircularProgress size={18} sx={{ ml: 1 }} />
                        </>
                      ) : (
                        "Save New Password"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Password changed successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbar}
        autoHideDuration={8000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Reset link expired or invalid. Try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default NewPassword;
