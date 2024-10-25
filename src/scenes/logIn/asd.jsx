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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [Usage, setUsage] = useState(""); 

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

  const handleUsageChange = (event) => {
    setUsage(event.target.value);
  };

  // Validation schema using Yup
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
    botUsage: yup.string().required("Bot usage is required"),


    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

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
    botUsage: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
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
        m="20px"
        sx={{
          marginTop: "10.4em",
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
            <Header title="REGISTER PAGE" />
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
                href="/login"
              >
                <ArrowForwardIcon />
                Already have Account?
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
                      id="bot-usage"
                      sx={{
                        color: colors.primary[100],
                      }}
                    >
                      Medicare Bot Usage
                    </InputLabel>
                    <Select
                      labelId="bot-usage"
                      id="usage-select"
                      value={values.usage}
                      name="Medicare Bot Usage"
                      label="Medicare Bot Usage"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.usage && !!errors.usage}
                      helperText={touched.usage && errors.usage}
                    >
                      <MenuItem value={10}>Personal Use</MenuItem>
                      <MenuItem value={20}>For Client</MenuItem>
                      <MenuItem value={30}>As an Agent</MenuItem>
                    </Select>
                  </FormControl>

                  
                
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

                
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
