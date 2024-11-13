import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useMediaQuery from "@mui/material/useMediaQuery";

import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { saveAs } from "file-saver";
import JsPDF from "jspdf"; 
import * as XLSX from "xlsx"; 
import data from "../../data/billingData.json"; 

const Billing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [subscriptions, setSubscriptions] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [conversationCosts, setConversationCosts] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState(""); // State to manage download format
  const [costDownloadFormat, setCostDownloadFormat] = useState(""); // State for conversation cost download format

  useEffect(() => {
    setSubscriptions(data.subscriptions);
    setBillingHistory(data.billingHistory);
    setConversationCosts(data.conversationCosts);
  }, []);

  // CSV Download
  const downloadCSV = (dataArray, filename) => {
    const csvContent = [
      Object.keys(dataArray[0]).join(","),
      ...dataArray.map((e) => Object.values(e).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  };

  // Excel Download
  const downloadExcel = (dataArray, filename) => {
    const ws = XLSX.utils.json_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  // PDF Download
  const downloadPDF = (dataArray, filename) => {
    const doc = new JsPDF();
    doc.text("Billing History", 14, 16);
    let y = 30;
    dataArray.forEach((item) => {
      doc.text(
        `Date: ${item.date}, Amount: $${item.amount}, Plan: ${item.plan}`,
        14,
        y
      );
      y += 10;
    });
    doc.save(filename);
  };

  // Handle download for billing history
  const handleDownloadBilling = () => {
    const filename = "billing_history";
    if (downloadFormat === "CSV") {
      downloadCSV(billingHistory, `${filename}.csv`);
    } else if (downloadFormat === "Excel") {
      downloadExcel(billingHistory, `${filename}.xlsx`);
    } else if (downloadFormat === "PDF") {
      downloadPDF(billingHistory, `${filename}.pdf`);
    } else {
      alert("Please select a download format for billing history!");
    }
  };

  // Handle download for conversation costs
  const handleDownloadCosts = () => {
    const filename = "conversation_costs";
    if (costDownloadFormat === "CSV") {
      downloadCSV(conversationCosts, `${filename}.csv`);
    } else if (costDownloadFormat === "Excel") {
      downloadExcel(conversationCosts, `${filename}.xlsx`);
    } else if (costDownloadFormat === "PDF") {
      downloadPDF(conversationCosts, `${filename}.pdf`);
    } else {
      alert("Please select a download format for conversation costs!");
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header title="BILLING" subtitle="Welcome to your Billing dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: isNonMobile ? "10px 20px" : ".5em",
              // marginBottom: isNonMobile ? "inherit" : "1.5em",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box>
        {/* subscription plan */}
        <Box>
          <Typography variant="h3" mt="1em" fontWeight="700">
            Subscription Plan
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1em",
              margin: "2em 0",
            }}
          >
            {subscriptions.map((subscription) => (
              <Box
                key={subscription.id}
                sx={{
                  flexGrow: 1,
                  // minWidth: "320px",
                  // maxWidth: "360px",
                  padding: "2em",
                  borderRadius: "16px",
                  backgroundColor: colors.primary[400],
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Plan Header */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{
                      color: colors.greenAccent[400],
                      fontSize: "1.8em",
                      mb: "0.5em",
                    }}
                  >
                    {subscription.plan}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.grey[300], fontSize: "0.9em" }}
                  >
                    Perfect for growing businesses
                  </Typography>
                </Box>

                {/* Price Section */}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    padding: "1em 1.5em",
                    borderRadius: "12px",
                    backgroundColor: colors.blueAccent[800],
                    margin: "1em 0",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5em",
                      color: colors.grey[300],
                      fontWeight: "700",
                      marginRight: "0.5em",
                    }}
                  >
                    ${subscription.price}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1em",
                      color: colors.grey[500],
                    }}
                  >
                    / {subscription.billingCycle}
                  </Typography>
                </Box>

                {/* Features List */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: colors.grey[200],
                      mb: "0.5em",
                    }}
                  >
                    Features Included
                  </Typography>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      lineHeight: "1.4",
                      color: colors.grey[300],
                    }}
                  >
                    {subscription.features.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5em 0",
                          borderBottom:
                            index !== subscription.features.length - 1
                              ? `1px solid ${colors.grey[800]}`
                              : "none",
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            color: colors.greenAccent[500],
                            fontSize: "1.1rem",
                            marginRight: "0.5em",
                          }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Box>

                {/* Billing Cycle and CTA */}
                <Box
                  sx={{
                    mt: 3,
                    padding: "1em",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      padding: "0.75em 2em",
                      fontWeight: "600",
                      borderRadius: "8px",
                      backgroundColor: colors.greenAccent[500],
                      color: colors.grey[900],
                      "&:hover": {
                        backgroundColor: colors.greenAccent[800],
                        color: colors.grey[300],
                      },
                    }}
                  >
                    Choose Plan
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.grey[500],
                      fontSize: "0.8rem",
                      mt: "0.5em",
                    }}
                  >
                    Cancel anytime
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Billing History and conversation cost */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1em",
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            <Box gridColumn="span 2" gridRow="span 2" overflow="auto">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
                backgroundColor={colors.primary[400]}
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h4"
                  fontWeight="600"
                >
                  Billing History
                </Typography>
              </Box>
              {/* Header Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor={colors.primary[400]}
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box width="30%" textAlign="left">
                  <Typography
                    color={colors.blueAccent[500]}
                    variant="h5"
                    fontWeight="700"
                  >
                    Date
                  </Typography>
                </Box>
                <Box
                  width="30%"
                  textAlign="center"
                  sx={{ fontWeight: "700", color: colors.blueAccent[500] }}
                >
                  Plan
                </Box>
                <Box
                  width="30%"
                  textAlign="center"
                  sx={{ fontWeight: "700", color: colors.blueAccent[500] }}
                >
                  Amount
                </Box>
              </Box>

              {/* Billing History Data Rows */}
              {billingHistory.map((bill, index) => (
                <Box
                  key={`${index}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  backgroundColor={colors.primary[400]}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box width="30%" textAlign="left">
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h6"
                      fontWeight="600"
                    >
                      {bill.date}
                    </Typography>
                  </Box>
                  <Box width="30%" textAlign="center" color={colors.grey[100]}>
                    {bill.plan}
                  </Box>
                  <Box width="30%" textAlign="center" color={colors.grey[100]}>
                    {bill.amount}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Form Controls */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 100,
                margin: "1em",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.primary[400],
                  borderRadius: "20px",
                  padding: "0px 8px",
                  "& fieldset": {
                    borderColor: colors.grey[600],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.greenAccent[600],
                  },
                },
                "& .MuiSelect-icon": {
                  color: colors.grey[100],
                  fontSize: "1.2rem",
                },
              }}
            >
              <Select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value)}
                displayEmpty
                sx={{
                  color: colors.grey[100],
                  fontWeight: "500",
                  fontSize: "14px",
                  "&:focus": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em style={{ fontSize: "14px", fontStyle: "normal" }}>
                    Select Format
                  </em>
                </MenuItem>
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="CSV">CSV</MenuItem>
                <MenuItem value="Excel">Excel</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={handleDownloadBilling}
              color="secondary"
              variant="outlined"
              style={{
                marginTop: "1.3em",
                borderRadius: "20px",
                marginRight: "8px",
              }}
            >
              Download Bills
            </Button>
          </Box>

          <Box
            sx={{
              flexGrow: "1",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            <Box gridColumn="span 2" gridRow="span 2" overflow="auto">
              {/* Title Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
                backgroundColor={colors.primary[400]}
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h4"
                  fontWeight="600"
                >
                  Conversation Costs
                </Typography>
              </Box>

              {/* Header Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor={colors.primary[400]}
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box width="50%" textAlign="left">
                  <Typography
                    color={colors.blueAccent[500]}
                    variant="h5"
                    fontWeight="700"
                  >
                    Date
                  </Typography>
                </Box>
                <Box
                  width="50%"
                  textAlign="center"
                  sx={{ fontWeight: "700", color: colors.blueAccent[500] }}
                >
                  Cost
                </Box>
              </Box>

              {/* Data Rows */}
              {conversationCosts.map((cost, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  backgroundColor={colors.primary[400]}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box width="50%" textAlign="left">
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h6"
                      fontWeight="600"
                    >
                      {cost.date}
                    </Typography>
                  </Box>
                  <Box width="50%" textAlign="center" color={colors.grey[100]}>
                    {cost.cost}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Format Selector */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 100,
                margin: "1em",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.primary[400],
                  borderRadius: "20px",
                  padding: "0px 8px",
                  "& fieldset": {
                    borderColor: colors.grey[600],
                  },
                  "&:hover fieldset": {
                    borderColor: colors.greenAccent[400],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.greenAccent[600],
                  },
                },
                "& .MuiSelect-icon": {
                  color: colors.grey[100],
                  fontSize: "1.2rem",
                },
              }}
            >
              <Select
                value={costDownloadFormat}
                onChange={(e) => setCostDownloadFormat(e.target.value)}
                displayEmpty
                sx={{
                  color: colors.grey[100],
                  fontWeight: "500",
                  fontSize: "14px",
                  "&:focus": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em style={{ fontSize: "14px", fontStyle: "normal" }}>
                    Select Format
                  </em>
                </MenuItem>
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="CSV">CSV</MenuItem>
                <MenuItem value="Excel">Excel</MenuItem>
              </Select>
            </FormControl>

            {/* Download Button */}
            <Button
              onClick={handleDownloadCosts}
              color="secondary"
              variant="outlined"
              sx={{
                marginTop: "1.3em",
                borderRadius: "20px",
                marginRight: "8px",
              }}
            >
              Download Reports
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Billing;
