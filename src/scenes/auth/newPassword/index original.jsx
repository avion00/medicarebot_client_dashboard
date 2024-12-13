import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
  Snackbar,
  CircularProgress,
  Alert
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import { tokens, ColorModeContext } from "../../../theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
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
  const [isSubmitting, setIsSubmitting] = useState(false); // For handling button text and animation
  const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar notification
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleFormSubmit = (values) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOpenSnackbar(true); 
      setTimeout(() => navigate("/login"), 1500); 
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
                  <Box mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disabled={isSubmitting}
                      style={{
                        padding: ' .8em 2em',
                        fontWeight: '700',
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
          variant="filled"
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.greenAccent[200],
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          Password changed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@#$%&]/, "Password must contain at least one symbol (@#$%&)")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};
export default NewPassword;
