import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens, ColorModeContext } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OTPPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.otp.join("") === "123456") {
        setNotificationType("success");
        setNotificationMessage("OTP verified successfully!");
        setShowNotification(true);
        setLoading(false);
        setTimeout(() => navigate("/newPassword"), 1500); 
      } else {
        setNotificationType("error");
        setNotificationMessage("Incorrect OTP. Please try again.");
        setShowNotification(true);
        setLoading(false);
      }
    }, 1000);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const otpSchema = yup.object().shape({
    otp: yup
      .array()
      .of(yup.string().length(1, "Each box requires one digit"))
      .required("All fields are required")
      .test("all-filled", "Please fill in all OTP fields", (otp) =>
        otp.every((digit) => digit !== "")
      ),
  });

  const initialValues = {
    otp: ["", "", "", "", "", ""],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
        bgcolor: theme.palette.background.default,
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode} sx={{ mb: 3 }}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Enter Your OTP
      </Typography>
      <Typography variant="subtitle1" sx={{ color: colors.grey[500], mb: 3 }}>
        We have sent a one-time password to your email.
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={otpSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <FieldArray
                name="otp"
                render={() =>
                  values.otp.map((_, index) => (
                    <TextField
                      key={index}
                      type="text"
                      name={`otp.${index}`}
                      value={values.otp[index]}
                      onChange={(e) => {
                        const { value } = e.target;
                        if (/^[0-9]?$/.test(value)) {
                          setFieldValue(`otp.${index}`, value);
                          if (value && index < values.otp.length - 1) {
                            document
                              .querySelector(`input[name='otp.${index + 1}']`)
                              .focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !values.otp[index] &&
                          index > 0
                        ) {
                          setFieldValue(`otp.${index - 1}`, "");
                          document
                            .querySelector(`input[name='otp.${index - 1}']`)
                            .focus();
                        }
                      }}
                      onBlur={handleBlur}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedData = e.clipboardData
                          .getData("Text")
                          .slice(0, 6);
                        pastedData.split("").forEach((char, i) => {
                          if (i < values.otp.length) {
                            setFieldValue(`otp.${i}`, char);
                          }
                        });
                      }}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "1.5em",
                          width: "3rem",
                        },
                      }}
                      variant="outlined"
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: 1,
                          color: colors.grey[100],
                          backgroundColor: colors.primary[400],
                        },
                      }}
                    />
                  ))
                }
              />
            </Box>
            {touched.otp && errors.otp && (
              <Typography variant="body2" color="error" align="center">
                {errors.otp}
              </Typography>
            )}

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={
                loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              disabled={loading}
              sx={{ mt: 3, width: "100%", py: 1.5 }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}
      </Formik>

      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationType}
          variant="filled"
          sx={{
            backgroundColor:
              notificationType === "success"
                ? colors.greenAccent[500]
                : colors.redAccent[500],
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OTPPage;
