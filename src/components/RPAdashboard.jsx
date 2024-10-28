import React, { useState } from "react";
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  Box,
  useTheme,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import jsPDF from "jspdf"; // Corrected import
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import data from "../data/ReportData.json";
import { tokens } from "../theme";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { billingData } = data;
  const [exportFormat, setExportFormat] = useState("PDF");

  const handleFormatChange = (event) => {
    setExportFormat(event.target.value);
  };

  // Function to export as PDF
  const handlePDFExport = () => {
    const pdf = new jsPDF();
    autoTable(pdf, {
      head: [["Date", "Amount"]],
      body: data.billingData.map(({ date, amount }) => [date, amount]),
    });
    pdf.save("billing_report.pdf");
  };

  // Function to export as CSV
  const handleCSVExport = () => {
    const csvData = data.billingData
      .map(({ date, amount }) => `${date},${amount}`)
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "billing_report.csv");
  };

  // Function to export as Excel
  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.billingData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Billing Data");
    XLSX.writeFile(workbook, "billing_report.xlsx");
  };

  const handleDownload = () => {
    if (exportFormat === "PDF") {
      handlePDFExport();
    } else if (exportFormat === "CSV") {
      handleCSVExport();
    } else if (exportFormat === "Excel") {
      handleExcelExport();
    }
  };

  return (
    <Box
      sx={{
        color: colors.grey[100],
        backgroundColor: "none",
        minWidth: "300px",
        flexGrow: "1",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: colors.grey[100],
          margin: "1em 0",
        }}
      >
        Report and Performance Analytics Dashboard
      </Typography>

      <List
        style={{
          backgroundColor: colors.primary[400],
          maxHeight: "350px",
          overflow: "auto",
        }}
      >
        {billingData.map(({ date, amount }, index) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                padding: "0.75em 1.25em",
                borderBottom: `4px solid ${colors.primary[500]}`,
                "&:hover": {
                  backgroundColor: colors.blueAccent[800],
                  transition: "background-color 0.3s ease",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.grey[100],
                    fontWeight: 500,
                  }}
                >
                  Date: {date}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.greenAccent[100],
                    fontWeight: 500,
                  }}
                >
                  Amount: ${amount}
                </Typography>
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      <Box
        mt="1em"
        sx={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
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
              fontSize: "1.2rem", // Small icon size
            },
          }}
        >
          <Select
            value={exportFormat}
            onChange={handleFormatChange}
            displayEmpty
            sx={{
              color: colors.grey[100],
              fontWeight: "500",
              fontSize: "0.875rem", // Smaller text size
              "&:focus": {
                backgroundColor: "transparent",
              },
            }}
          >
            <MenuItem value="" disabled>
              <em style={{ fontSize: "0.875rem" }}>Select Format</em>{" "}
              {/* Smaller placeholder text */}
            </MenuItem>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="CSV">CSV</MenuItem>
            <MenuItem value="Excel">Excel</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={handleDownload}
          color="secondary"
          variant="outlined"
          style={{
            borderRadius: "20px",
            marginRight: "8px",
          }}
        >
          Download Reports
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;
