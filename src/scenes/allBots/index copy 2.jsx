import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  Switch,
} from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const AllBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 768px)");

  const [botData, setBotData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://app.medicarebot.live/list-bots",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.bots) {
          setBotData(response.data.bots);
        } else {
          throw new Error("Failed to fetch bots");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, [token]);

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const handleView = (id) => {
    console.log("View clicked for ID:", id);
  };

  const handleToggle = (id) => {
    setBotData((prevData) =>
      prevData.map((row) =>
        row.bot_id === id
          ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" }
          : row
      )
    );
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Bot Name",
      flex: 0.75,
      cellClassName: "bot-name-column--cell",
    },
    {
      field: "type",
      headerName: "Channel",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => {
        const isActive =
          params.row.status === "active" || params.row.status === "Active";
        return (
          <Typography
            variant="h6"
            sx={{
              backgroundColor: isActive
                ? colors.greenAccent[700]
                : colors.redAccent[700],
              borderRadius: "20px",
              padding: "2px 10px",
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: "lastInteraction",
      headerName: "Last Interaction",
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="h6" color={colors.blueAccent[100]}>
          {params.row.lastInteraction}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" gap=".5em">
          <IconButton
            onClick={() => handleEdit(params.row.bot_id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[300] }}
          >
            <EditIcon sx={{ fontSize: "16px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleView(params.row.bot_id)}
            aria-label="view"
            sx={{ color: colors.grey[200] }}
          >
            <VisibilityIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "Start/Stop",
      headerName: "Start/Stop",
      flex: 0.5,
      renderCell: (params) => {
        const isOn = params.row.status === "Active";
        return (
          <Box display="flex" alignItems="center">
            <Switch
              checked={isOn}
              onChange={() => handleToggle(params.row.bot_id)}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                "&.Mui-checked": {
                  color: "green",
                  transition: "all .3s ease-out",
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: isOn
                    ? colors.greenAccent[700]
                    : colors.redAccent[700],
                },
                "& .MuiSwitch-track": {
                  backgroundColor: isOn
                    ? colors.greenAccent[700]
                    : colors.redAccent[700],
                },
              }}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        columnGap="20px"
      >
        <Box
          gridColumn="span 12"
          mt="20px"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            backgroundColor={colors.grey[500]}
            borderRadius="25px"
            width="220px"
            sx={{
              margin: "0.5em 3em",
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
            height="380px"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.primary[400],
                borderBottom: `1px solid ${colors.grey[700]}`,
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `1px solid ${colors.grey[700]}`,
                backgroundColor: colors.primary[400],
                height: "40px",
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={botData.map((bot) => ({ ...bot, id: bot.bot_id }))}
              columns={columns}
              rowHeight={40}
              headerHeight={40}
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllBots;
