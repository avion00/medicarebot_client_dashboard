import { Box, useTheme, IconButton, InputBase, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PendingRequest, ResolvedRequests } from "../../data/humanHandoffsData";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const HumanHandoffs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [deactivatedBots, setDeactivatedBots] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    // Filter inactive bots from the JSON data
    const inactiveBots = PendingRequest.filter(
      (bot) => bot.status === "Inactive"
    );
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

  const PendingColumns = [
    { field: "customerName", headerName: "Customer Name/ID", flex: 1 },
    {
      field: "timeStamp",
      headerName: "Time Stamp",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "esclationReason",
      headerName: "Reason of Esclation",
      flex: 1,
    },
    {
      field: "botName",
      headerName: "Bot Name",
      flex: 1,
    },

    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
    },
  ];



  const ResolvedColumns = [
    { field: "customerName", headerName: "Customer Name/ID", flex: 1 },
    {
      field: "resolvedOn",
      headerName: "Eesolved On",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "resolutionDetails",
      headerName: "Resolution Details",
      flex: 1,
    },
    {
      field: "botName",
      headerName: "Bot Name",
      flex: 1,
    },

    {
      field: "resolutionTime",
      headerName: "Resolution Time",
      flex: 1,
    },
    
  ];



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
          title="HUMAN HANDSOFFS"
          subtitle="View and manage requests that require human intervention"
        />
      </Box>
      <Box gridColumn="span 12" backgroundColor={colors.primary[400]} pt=".5em">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          p="0 2em"
        >
          <Typography variant="h3" fontWeight="bold">
            Pending Requests
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "1em",
            }}
          >
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
              onClick={() => console.log("Filter By Clicked")}
              sx={{
                flex: 0.25,
                padding: "0.6em 1em ",
                width: "fit-content",
                position: "relative",
                background: "linear-gradient(45deg, #062994, #0E72E1)",
                color: "#fff",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".5em",
                cursor: "pointer",
              }}
            >
              <FilterAltIcon />
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                width="60px"
              >
                Filter By
              </Typography>
              <ArrowDropDownIcon />
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 12"
          height="240px"
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
            rows={PendingRequest}
            columns={PendingColumns}
            getRowId={(row) => row.id}
            onSelectionModelChange={handleCheckboxChange}
            rowHeight={40}
            headerHeight={40}
          />
        </Box>
      </Box>

      <Box
        gridColumn="span 12"
        backgroundColor={colors.primary[400]}
        mt={6}
        pt=".5em"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          p="0 2em"
        >
          <Typography variant="h3" fontWeight="bold">
            Resolved Requests
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "1em",
            }}
          >
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
              onClick={() => console.log("Filter By Clicked")}
              sx={{
                flex: 0.25,
                padding: "0.6em 1em ",
                width: "fit-content",
                position: "relative",
                background: "linear-gradient(45deg, #062994, #0E72E1)",
                color: "#fff",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".5em",
                cursor: "pointer",
              }}
            >
              <FilterAltIcon />
              <Typography
                variant="h6"
                fontWeight="bold"
                textAlign="center"
                width="60px"
              >
                Filter By
              </Typography>
              <ArrowDropDownIcon />
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 12"
          height="240px"
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
            rows={ResolvedRequests}
            columns={ResolvedColumns}
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

export default HumanHandoffs;