import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { CRMData } from "../../data/viewCRMData"; // Ensure this is the correct path
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const ViewCRM = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define columns based on the keys in your JSON file
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "companySize", headerName: "Company Size", flex: 1 },
    { field: "industry", headerName: "Industry", flex: 1 },
    { field: "interest", headerName: "Interest", flex: 1 },
    { field: "budgetFrom", headerName: "Budget From", flex: 1 },
    { field: "budgetTo", headerName: "Budget To", flex: 1 },
    {
      field: "timelineToPurchase",
      headerName: "Timeline to Purchase",
      flex: 1,
    },
    {
      field: "preferredContactMethod",
      headerName: "Preferred Contact",
      flex: 1,
    },
    {
      field: "painPointsChallanges",
      headerName: "Pain Points / Challenges",
      flex: 1.5,
    },
    { field: "existingSolution", headerName: "Existing Solution", flex: 1.5 },
    { field: "howTheyFoundYou", headerName: "How They Found You", flex: 1 },
    {
      field: "marketingCommunication",
      headerName: "Marketing Communication",
      flex: 1.5,
    },
    { field: "preferredFrequency", headerName: "Preferred Frequency", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="VIEW CRM" subtitle="List of CRM for Future Reference" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={CRMData} // Connect the JSON data here
          columns={columns} // Connect the defined columns
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewCRM;
