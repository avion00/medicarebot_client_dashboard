import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import data from "./data.json";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [exportFormat, setExportFormat] = useState("PDF");

  const handleFormatChange = (event) => {
    setExportFormat(event.target.value);
  };

  // ✅ Function to export as PDF
  const handlePDFExport = () => {
    const pdf = new jsPDF();
    autoTable(pdf, {
      head: [["Date", "Amount"]],
      body: data.billingData.map(({ date, amount }) => [date, amount]),
    });
    pdf.save("billing_report.pdf");
  };

  // ✅ Function to export as CSV
  const handleCSVExport = () => {
    const csvData =
      "Date,Amount\n" +
      data.billingData
        .map(({ date, amount }) => `${date},${amount}`)
        .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "billing_report.csv");
  };

  // ✅ Function to export as Excel
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
        backgroundColor: colors.primary[400],
        padding: "1em",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        px={3}
        py={2}
        color={colors.grey[100]}
      >
        Report and Performance Analytics
      </Typography>

      {/* ✅ Table with scrollable body */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 300, overflowY: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.billingData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{
        display: 'flex',
        // justifyContent: "flex-start",
        alignItems: "center",
        // border: '1px solid red',
        mt:"1em",
        gap: "2em"
      }}>
        <FormControl variant="outlined" sx={{ minWidth: 120, }}>
          <Select value={exportFormat} onChange={handleFormatChange}>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="CSV">CSV</MenuItem>
            <MenuItem value="Excel">Excel</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          // sx={{ margin: "1.5em" }}
          sx={{
            padding: '1em 2em',
            backgroundColor: colors.grey[400]
          }}
        >
          Download Report
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;
