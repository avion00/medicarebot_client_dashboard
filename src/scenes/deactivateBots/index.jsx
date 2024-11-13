import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import botsData from "../../data/ActiveBotsData.json"; // Import JSON file
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

const DeactivateBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [deactivatedBots, setDeactivatedBots] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    // Filter inactive bots from the JSON data
    const inactiveBots = botsData.filter((bot) => bot.status === "Inactive");
    setDeactivatedBots(inactiveBots);
  }, []);

  const handleReactivateSelected = () => {
    const updatedData = deactivatedBots.map((bot) => {
      if (checkedItems.includes(bot.name)) {
        return { ...bot, status: "Active" };
      }
      return bot;
    });

    const filteredData = updatedData.filter((bot) => bot.status === "Inactive");
    setDeactivatedBots(filteredData);
    setCheckedItems([]);

    // Update the JSON file would require an API call or similar method
    localStorage.setItem("botsData", JSON.stringify(updatedData));
  };

  const handleCheckboxChange = (ids) => {
    setCheckedItems(
      ids.map((id) => deactivatedBots.find((bot) => bot.id === id).name)
    );
  };

  const deactiveData = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 1,
    },
    {
      field: "lastTrained",
      headerName: "Last Trained",
      flex: 1,
    },
    {
      field: "usageFrequency",
      headerName: "Usage Frequency",
      flex: 1,
    },
    {
      field: "responseAccuracy",
      headerName: "Response Accuracy",
      flex: 1,
    },
    {
      field: "supportLanguages",
      headerName: "Supported Languages",
      flex: 1,
    },
    {
      field: "performanceScore",
      headerName: "Performance Score",
      flex: 1,
    },
    {
      field: "responseTime",
      headerName: "Response Time",
      flex: 1,
    },
    {
      field: "averageSessionLength",
      headerName: "Avg. Session Length",
      flex: 1,
    },
    {
      field: "totalInteractions",
      headerName: "Total Interactions",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
        <Header
          title="DEACTIVATE BOTS"
          subtitle="Manage your Deactivated Bots"
        />

        <Box>
          <Button
            onClick={handleReactivateSelected}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: isNonMobile ? "10px 20px" : ".5em",
            }}
          >
            <RotateLeftIcon sx={{ mr: "10px" }} />
            Reactivate selected bots
          </Button>
        </Box>
      </Box>

      <Box
        m="40px 0 0 0"
        height="65vh"
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={deactivatedBots}
          columns={deactiveData}
          getRowId={(row) => row.id}
          onSelectionModelChange={handleCheckboxChange}
        />
      </Box>
    </Box>
  );
};

export default DeactivateBots;
