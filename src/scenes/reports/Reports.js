import React, { useState } from "react";
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
import jsPDF from "jspdf"; // Corrected import
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import data from "./data.json"; // Import your data from data.json

const Reports = () => {
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
    <div
      style={{
        margin: "1em",
        padding: "1em",
        borderRadius: ".5em",
        boxShadow: "2px 2px 50px 2px rgb(125, 125, 125, 0.2)",
        flexGrow: "1",
        minWidth: "320px",
      }}
    >
      <h2
        style={{
          padding: "0 .5em",
          fontSize: "1em",
          margin: "1em 0",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Report and Performance Analytics Dashboard
      </h2>

      {/* Table to display billing details */}
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "inherit",
          padding: "1em",
        }}
      >
        <Table
          style={{
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  padding: ".5em",
                }}
              >
                Date
              </TableCell>
              <TableCell
                style={{
                  padding: ".5em",
                }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.billingData.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{
                    padding: ".5em",
                  }}
                >
                  {item.date}
                </TableCell>
                <TableCell
                  style={{
                    padding: ".5em",
                  }}
                >
                  {item.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown for format selection */}
      <FormControl
        variant="outlined"
        style={{
          minWidth: 120,
          margin: "1.5em",
        }}
      >
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
        style={{
          margin: "1.5em",
        }}
      >
        Download Report
      </Button>
    </div>
  );
};

export default Reports;
