import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

import { tokens } from "../../theme";
import axios from "axios";

const ConvertCSV = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleUploadFileChange = (event) => {
    const file = event.target.files[0];
    setExcelFile(file || null);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    if (!excelFile) {
      setNotificationType("error");
      setNotificationMessage("Please select an Excel file before converting.");
      setShowNotification(true);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", excelFile);

    // Get Bearer token from sessionStorage
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://app.medicarebot.live/convert-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Trigger CSV download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setNotificationType("success");
      setNotificationMessage("File converted successfully!");
      setShowNotification(true);
      resetForm();
      setExcelFile(null);
    } catch (error) {
      setNotificationType("error");
      setNotificationMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  

  const initialValues = { file: "" };

  return (
    <Box m="20px">
      <Header
        title="Excel to CSV Converter"
        subtitle="Upload an Excel file to convert to CSV"
      />
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              gap="20px"
              alignItems="start"
              mt="20px"
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Upload Excel File"
                value={excelFile ? excelFile.name : ""}
                placeholder="No file selected"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <UploadFileIcon sx={{ color: "#0A74DA" }} />
                    </InputAdornment>
                  ),
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
                        top: 0,
                        left: 0,
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        accept=".xls,.xlsx"
                        onChange={handleUploadFileChange}
                      />
                    </Button>
                  ),
                }}
                sx={{
                  maxWidth: isNonMobile ?  "480px" : "100%",
                  backgroundColor: colors.primary[400],
                  color: colors.primary[100],
                  borderRadius: "8px",
                  textAlign: "start",
                  "& .MuiOutlinedInput-root": {
                    "& input": {
                      textAlign: "start",
                      fontWeight: "bold",
                      color: excelFile ? "#FFFFFF" : "#999999",
                    },
                    "& fieldset": { borderColor: "#4F4F5A" },
                    "&:hover fieldset": { borderColor: "#0A74DA" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0A74DA",
                      borderWidth: "2px",
                    },
                  },
                  position: "relative",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                sx={{
                  width: isNonMobile ? undefined : "100%",
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  transition: "all 0.5s ease",
                  "&:hover": { opacity: loading ? "1" : ".7" },
                }}
              >
                {loading
                  ? `${(<CircularProgress size={20} color="inherit" />)} Converting....`
                  : "Convert & Download"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationType}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConvertCSV;
