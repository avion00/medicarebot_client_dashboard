import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (values) => {
    // Here you would handle the password change logic, such as an API call

    // If password change is successful, open the Snackbar
    setOpenSnackbar(true);

    // Optional: Navigate after a brief delay to allow the user to see the message
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500); // Navigate after 1.5 seconds
  };

  const initialValues = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  };

  const checkoutSchema = yup.object().shape({
    oldpassword: yup.string().required("Old password is required"),
    newpassword: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .notOneOf(
        [yup.ref("oldpassword")],
        "New password cannot be the same as the old password"
      )
      .required("New password is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("newpassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <Box m="20px">
      <Header title="CHANGE PASSWORD" subtitle="Change your password" />

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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Old Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oldpassword}
                name="oldpassword"
                error={!!touched.oldpassword && !!errors.oldpassword}
                helperText={touched.oldpassword && errors.oldpassword}
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

              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newpassword}
                name="newpassword"
                error={!!touched.newpassword && !!errors.newpassword}
                helperText={touched.newpassword && errors.newpassword}
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

              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmpassword}
                name="confirmpassword"
                error={!!touched.confirmpassword && !!errors.confirmpassword}
                helperText={touched.confirmpassword && errors.confirmpassword}
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
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Change Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Snackbar for showing success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={9000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position the Snackbar at the top center
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have successfully changed your password!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
