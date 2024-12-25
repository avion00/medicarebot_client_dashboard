import {
  Box,
  useTheme,
  // Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
// import { GridToolbar } from "@mui/x-data-grid";
import { LeadsData } from "../../data/viewLeadsData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:768px)");

  const [removeLeaders, setRemoveLeaders] = useState([]);
  const [
    // checkedItems,
     setCheckedItems] = useState([]);

  useEffect(() => {
    // Filter inactive bots from the JSON data
    const learders = LeadsData.filter((bot) => bot.status === "Inactive");
    setRemoveLeaders(learders);
  }, []);

  const handleCheckboxChange = (ids) => {
    setCheckedItems(
      ids.map((id) => removeLeaders.find((bot) => bot.id === id).name)
    );
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.25 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "city", headerName: "City", flex: 0.75 },
    { field: "country", headerName: "Country", flex: 0.75 },
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "companySize", headerName: "Company Size", flex: 0.75 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap=".25em" justifyContent="center">
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[200] }}
          >
            <EditIcon sx={{ fontSize: "14px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleReactivateSingle(params.row.id)}
            aria-label="view"
            sx={{ color: colors.grey[100] }}
          >
            <VisibilityIcon sx={{ fontSize: "14px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleReactivateSingle(params.row.id)}
            aria-label="view"
            sx={{ color: colors.grey[100] }}
          >
            <DeleteIcon sx={{ fontSize: "14px", color: colors.redAccent[400] }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // const handleRemoveLeadsSelected = () => {
  //   const updatedData = removeLeaders.map((bot) => {
  //     if (checkedItems.includes(bot.name)) {
  //       return { ...bot, status: "Active" };
  //     }
  //     return bot;
  //   });

  //   const filteredData = updatedData.filter((bot) => bot.status === "Inactive");
  //   setRemoveLeaders(filteredData);
  //   setCheckedItems([]);

  //   // Update the JSON file would require an API call or similar method
  //   localStorage.setItem("botsData", JSON.stringify(updatedData));
  // };

  const handleReactivateSingle = (id) => {
    const updatedBots = removeLeaders.map((bot) =>
      bot.id === id ? { ...bot, status: "Active" } : bot
    );

    // Remove the reactivated bot from the deactivatedBots list
    const remainingBots = updatedBots.filter(
      (bot) => bot.status === "Inactive"
    );

    setRemoveLeaders(remainingBots);

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
          title="VIEW PARTNERS"
          subtitle="List of Partners for Future Reference"
/>

        {/* <Box>
          <Button
            onClick={handleRemoveLeadsSelected}
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
        </Box> */}
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
            rows={LeadsData}
            columns={columns}
            getRowId={(row) => row.id}
            onSelectionModelChange={handleCheckboxChange}
            rowHeight={40}
            headerHeight={40}
            // components={{
            //   Toolbar: (props) => (
            //     <GridToolbar
            //       {...props}
            //       sx={{
            //         color: colors.greenAccent[200], 
            //       }}
            //     />
            //   ),
            // }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPartners;
