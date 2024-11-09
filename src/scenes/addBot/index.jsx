import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
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
import AddIcon from "@mui/icons-material/Add";

const AddBot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    setSnackbarOpen(true);
    navigate("/addbot");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBotImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file ? file.name : "");
  };

  const initialValues = {
    botName: "",
    botImage: "",
    status: "",
  };

  const checkoutSchema = yup.object().shape({
    botName: yup.string().required("Bot Name is required"),
    botImage: yup.string().required("Bot Image is required"),
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ACTIVE BOTS" subtitle="List of Active Bots" />
        <Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            ADD NEW BOT
          </Button>
        </Box>
      </Box>

      <Box>
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
                  label="Bot Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.botName}
                  name="botName"
                  error={!!touched.botName && !!errors.botName}
                  helperText={touched.botName && errors.botName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  label="Bot Image"
                  variant="filled"
                  type="text"
                  name="botImage"
                  value={selectedImage}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          backgroundColor: "transparent",
                          color: "white",
                          textTransform: "none",
                          boxShadow: "none",
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <input
                          type="file"
                          hidden
                          name="botImage"
                          onChange={(e) => {
                            handleBotImageUpload(e);
                            handleChange(e);
                          }}
                        />
                      </Button>
                    ),
                  }}
                  onBlur={handleBlur}
                  error={!!touched.botImage && !!errors.botImage}
                  helperText={touched.botImage && errors.botImage}
                  sx={{
                    position: "relative",
                    width: "100%",
                    flexGrow: "1",
                    gridColumn: "span 2",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: colors.primary[400],
                      color: colors.grey[100],
                    },
                  }}
                />

                {/* Additional form fields for Bot Status or other inputs */}
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                >
                  <InputLabel id="status" sx={{ color: colors.primary[100] }}>
                    Status
                  </InputLabel>
                  <Select
                    labelId="status"
                    id="state"
                    value={values.status}
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                  >
                    <MenuItem value={10}>Active</MenuItem>
                    <MenuItem value={20}>Deactive</MenuItem>
                  </Select>
                  {touched.status && errors.status ? (
                    <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                      {errors.status}
                    </Box>
                  ) : null}{" "}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Usage Frequency"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.usageFrequency}
                  name="usageFrequency"
                  error={!!touched.usageFrequency && !!errors.usageFrequency}
                  helperText={touched.usageFrequency && errors.usageFrequency}
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Response Accuracy"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.responseAccuracy}
                  name="responseAccuracy"
                  error={
                    !!touched.responseAccuracy && !!errors.responseAccuracy
                  }
                  helperText={
                    touched.responseAccuracy && errors.responseAccuracy
                  }
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                >
                  <InputLabel
                    id="language-support"
                    sx={{ color: colors.primary[100] }}
                  >
                    Language Support
                  </InputLabel>
                  <Select
                    labelId="language-support"
                    id="lang-support"
                    value={values.languageSupport}
                    name="languageSupport"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched.languageSupport && !!errors.languageSupport
                    }
                  >
                    <MenuItem value={10}>English</MenuItem>
                    <MenuItem value={20}>Italy</MenuItem>
                    <MenuItem value={30}>Spanish</MenuItem>
                  </Select>
                  {touched.languageSupport && errors.languageSupport ? (
                    <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                      {errors.languageSupport}
                    </Box>
                  ) : null}{" "}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Performance Score"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.performanceScore}
                  name="performanceScore"
                  error={
                    !!touched.performanceScore && !!errors.performanceScore
                  }
                  helperText={
                    touched.performanceScore && errors.performanceScore
                  }
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Response Time"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.responseTime}
                  name="responseTime"
                  error={!!touched.responseTime && !!errors.responseTime}
                  helperText={touched.responseTime && errors.responseTime}
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Average Length"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.averageLenth}
                  name="responseTime"
                  error={!!touched.averageLenth && !!errors.averageLenth}
                  helperText={touched.averageLenth && errors.averageLenth}
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Total Interactions"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalInteractions}
                  name="responseTime"
                  error={
                    !!touched.totalInteractions && !!errors.totalInteractions
                  }
                  helperText={
                    touched.totalInteractions && errors.totalInteractions
                  }
                  sx={{
                    gridColumn: "span 1",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: colors.blueAccent[500],
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="start" mt="2em">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ gridColumn: "span 1", padding: ".8em 2em", fontWeight: 'bold' }}
                >
                  Add New Bot
                </Button>
              </Box>
            </form>
          )}
        </Formik>

        {/* Snackbar notification */}
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={4000}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "500",
              color: colors.greenAccent[200],
            }}
          >
            Congratulations, you have created new bot {initialValues.botName}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddBot;
