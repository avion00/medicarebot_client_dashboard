import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { saveAs } from "file-saver"; // For saving files
import JsPDF from "jspdf"; // For generating PDFs
import * as XLSX from "xlsx"; // For generating Excel files
import data from "./data.json"; // Import the JSON data

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box>
        <div>
          <div className="main container">
            {/* Subscription Plans */}
            <Card style={{ margin: "2em 1em", padding: "0.5em" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    padding: "0 .5em",
                    fontSize: "1em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Subscription Plans
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            padding: ".5em",
                          }}
                        >
                          Plan
                        </TableCell>
                        <TableCell
                          style={{
                            padding: ".5em",
                          }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          style={{
                            padding: ".5em",
                          }}
                        >
                          Features
                        </TableCell>
                        <TableCell
                          style={{
                            padding: ".5em",
                          }}
                        >
                          Billing Cycle
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {subscription.plan}
                          </TableCell>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            ${subscription.price}
                          </TableCell>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {subscription.features.join(", ")}
                          </TableCell>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {subscription.billingCycle}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card style={{ margin: "1em", padding: ".5em" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    padding: "0 .5em",
                    fontSize: "1em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Billing History
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            padding: "1em .5em",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "1em .5em",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "1em .5em",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Plan
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {billingHistory.map((bill, index) => (
                        <TableRow key={index}>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {bill.date}
                          </TableCell>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            ${bill.amount}
                          </TableCell>
                          <TableCell
                            style={{
                              padding: "1em .5em",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {bill.plan}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Download Format Selection for Billing History */}
                <FormControl
                  variant="outlined"
                  style={{ marginTop: "10px", minWidth: 120 }}
                >
                  <InputLabel>Download Format</InputLabel>
                  <Select
                    value={downloadFormat}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    label="Download Format"
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="CSV">CSV</MenuItem>
                    <MenuItem value="Excel">Excel</MenuItem>
                    <MenuItem value="PDF">PDF</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={handleDownloadBilling}
                >
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Conversation Costs */}
            <Card
              style={{
                margin: "1em",
                padding: ".5em",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    padding: "0 .5em",
                    fontSize: "1em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Conversation Costs
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Cost</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conversationCosts.map((cost, index) => (
                        <TableRow key={index}>
                          <TableCell>{cost.date}</TableCell>
                          <TableCell>${cost.cost}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Download Format Selection for Conversation Costs */}
                <FormControl
                  variant="outlined"
                  style={{ marginTop: "10px", minWidth: 120 }}
                >
                  <InputLabel>Download Format</InputLabel>
                  <Select
                    value={costDownloadFormat}
                    onChange={(e) => setCostDownloadFormat(e.target.value)}
                    label="Download Format"
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="CSV">CSV</MenuItem>
                    <MenuItem value="Excel">Excel</MenuItem>
                    <MenuItem value="PDF">PDF</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={handleDownloadCosts}
                >
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
