import { Box, useTheme, IconButton, InputBase, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PendingRequest, ResolvedRequests } from "../../data/humanHandoffsData";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const HumanHandoffs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const handleCheckboxChange = (ids) => {
    // submittion code
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
          // p="0 2em"
          p={isNonMobile ? "0 2em" : "0 0 0 2em"}
          m=".5em"
          gap="1em"
        >
          <Typography variant="h3" fontWeight="bold">
            Pending Requests
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "1em",
              width: isNonMobile ? undefined : "100%",
            }}
          >
            <Box
              display="flex"
              backgroundColor={colors.grey[500]}
              borderRadius="0px"
              sx={{
                width: "100%",
                borderRadius: "25px",
                backgroundColor: colors.grey[200],
                border: `1px solid white`,
                color: "#000",
                "&:focus": { backgroundColor: colors.grey[100] },
              }}
            >
              <InputBase
                sx={{ ml: 2, p: "0 1em", flex: 1, color: "#000" }}
                placeholder="Search"
              />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
            <IconButton
              sx={{
                display: isNonMobile ? "none" : undefined,
              }}
              onClick={() => console.log("Filter By Clicked")}
            >
              <MoreVertIcon />
            </IconButton>
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
                display: isNonMobile ? "flex" : "none",
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
            padding: "16px",
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
        pt=".5em"
        mt={6}
        >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          // p="0 2em"
          p={isNonMobile ? "0 2em" : "0 0 0 2em"}
          m=".5em"
          gap="1em"
        >
          <Typography variant="h3" fontWeight="bold">
            Resolved Requests
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "1em",
              width: isNonMobile ? undefined : "100%",
            }}
          >
            <Box
              display="flex"
              backgroundColor={colors.grey[500]}
              borderRadius="0px"
              sx={{
                width: "100%",
                borderRadius: "25px",
                backgroundColor: colors.grey[200],
                border: `1px solid white`,
                color: "#000",
                "&:focus": { backgroundColor: colors.grey[100] },
              }}
            >
              <InputBase
                sx={{ ml: 2, p: "0 1em", flex: 1, color: "#000" }}
                placeholder="Search"
              />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
            <IconButton
              sx={{
                display: isNonMobile ? "none" : undefined,
              }}
              onClick={() => console.log("Filter By Clicked")}
            >
              <MoreVertIcon />
            </IconButton>
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
                display: isNonMobile ? "flex" : "none",
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
            padding: "16px",
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