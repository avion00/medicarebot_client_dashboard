import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";

const EditProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    console.log(values);
    navigate("/login");
  };

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
    <Box m="20px">
      <Header title="EDIT PROFILE" subtitle="Redesign Your Profile" />

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
              <Box sx={{ gridColumn: "span 4", display: "flex", gap: "1em" }}>
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
            </Box>
            <Box display="flex" justifyContent="start" mt="20px" ml="1em">
              <Button
                type="submit"
                color="secondary"
                variant="outlined"
                startIcon={<LoginIcon />}
                style={{
                  borderRadius: "20px",
                  marginRight: "8px",
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
