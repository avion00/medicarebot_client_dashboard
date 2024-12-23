import {
  Box,
  Button,
  useTheme,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import botsData from "../../data/ActiveBotsData.json"; // Import JSON file
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";


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

  const handleCheckboxChange = (ids) => {
    setCheckedItems(
      ids.map((id) => deactivatedBots.find((bot) => bot.id === id).name)
    );
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const deactiveData = [
    { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.75,
      renderCell: (params) => (
        <Typography
          variant="h6"
          sx={{
            backgroundColor: colors.redAccent[700],
            borderRadius: "20px",
            padding: "0px 10px",
          }}
        >
          {params.row.status}
        </Typography>
      ),
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
      field: "totalInteractions",
      headerName: "Total Interactions",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="h6" color={colors.blueAccent[100]}>
          {params.row.totalInteractions}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap=".5em">
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[200] }}
          >
            <EditIcon sx={{ fontSize: "16px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleReactivateSingle(params.row.id)}
            aria-label="view"
            sx={{ color: colors.grey[100] }}
          >
            <RotateLeftIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

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

  const handleReactivateSingle = (id) => {
    const updatedBots = deactivatedBots.map((bot) =>
      bot.id === id ? { ...bot, status: "Active" } : bot
    );

    // Remove the reactivated bot from the deactivatedBots list
    const remainingBots = updatedBots.filter(
      (bot) => bot.status === "Inactive"
    );

    setDeactivatedBots(remainingBots);

    // Update the JSON file (if necessary)
    localStorage.setItem("botsData", JSON.stringify(updatedBots));
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header
          title="DEACTIVATE BOTS"
          subtitle="Manage your Deactivated Bots"
        />

        <Box>
          <Button
            onClick={handleReactivateSelected}
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
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
      <Box gridColumn="span 12" backgroundColor={colors.primary[400]} pt=".5em">
        <Box
          display="flex"
          backgroundColor={colors.grey[500]}
          borderRadius="0px"
          width="250px"
          sx={{
            width: "220px",
            borderRadius: "25px",
            margin: ".5em .5em .5em 3em",
            backgroundColor: "#ccc",
            border: `1px solid white`,
            color: "#000",
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000" }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

        <Box
          gridColumn="span 12"
          height="450px"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.blueAccent[200],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.primary[400],
              borderBottom: `1px solid ${colors.grey[700]}`,
              borderRadius: "0 !important",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${colors.grey[700]}`,
              backgroundColor: colors.primary[400],
              height: "40px !important",
              minHeight: "40px !important",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.blueAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={deactivatedBots}
            columns={deactiveData}
            getRowId={(row) => row.id}
            onSelectionModelChange={handleCheckboxChange}
            rowHeight={40}
            headerHeight={40}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DeactivateBots;
