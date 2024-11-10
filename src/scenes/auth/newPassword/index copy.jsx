import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens, ColorModeContext } from "../../theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleFormSubmit = (values) => {
    console.log(values);
    navigate("/dashboard");
  };

  return (
    <Box>
      <Header
        title="Set Your New Password"
        subtitle="Enter a secure password"
      />
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
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
              <Button type="submit" color="secondary" variant="contained">
                Save New Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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
