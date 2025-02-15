import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import DetailCard from "../../components/DetailCard";
import DetailItem from "../../components/DetailItem";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const AllBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const isTab = useMediaQuery("(min-width: 1200px)");
  const isSmallTab = useMediaQuery("(min-width: 961px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();

  const [botData, setBotData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBot, setSelectedBot] = useState(null);
  const [dialogError, setDialogError] = useState(null);

  // Snackbar state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Individual loading states for each bot's "Send Email" button
  const [loadingState, setLoadingState] = useState({});

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
          const botsWithStatus = response.data.bots.map((bot) => ({
            ...bot,
            status: "Inactive",
          }));
          setBotData(botsWithStatus);
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

  const handleToggle = (id) => {
    setBotData((prevData) =>
      prevData.map((row) =>
        row.bot_id === id
          ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" }
          : row
      )
    );
  };

  const handleView = (id) => {
    const selected = botData.find((bot) => bot.bot_id === id);
    if (selected) {
      setSelectedBot(selected);
    } else {
      setDialogError("Bot details not found");
    }
  };

  const handleDelete = async (botId) => {
    if (!botId) return;

    try {
      const response = await axios.delete(
        "https://app.medicarebot.live/delete-bots",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { bot_ids: [botId] },
        }
      );

      // Extract server message and deleted bot IDs
      const { message, deleted_bot_ids } = response.data;

      setBotData((prevBots) =>
        prevBots.filter((bot) => !deleted_bot_ids.includes(bot.bot_id))
      );

      // Show success message in Snackbar
      setNotificationType("success");
      setNotificationMessage(message || "Bot deleted successfully.");
    } catch (error) {
      setNotificationType("error");
      setNotificationMessage(
        error.response?.data?.message || "Failed to delete bot."
      );
    } finally {
      setShowNotification(true);
    }
  };

  const handleCloseDialog = () => {
    setSelectedBot(null);
    setDialogError(null);
  };

  // Send Email Function
  const sendEmail = async (id) => {
    const selected = botData.find((bot) => bot.bot_id === id); // Find the bot by bot_id
    if (selected) {
      try {
        // Set loading state for the specific bot
        setLoadingState((prev) => ({ ...prev, [id]: true }));

        const response = await axios.post(
          "https://app.medicarebot.live/activate-email-bot",
          {
            bot_id: selected.bot_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setNotificationType("success");
          setNotificationMessage("Email sent successfully!");
          setShowNotification(true);
        } else {
          setNotificationType("error");
          setNotificationMessage("The bot is inactive or does not exist");
          setShowNotification(true);
        }
      } catch (err) {
        setNotificationType("error");
        setNotificationMessage("An error occurred while sending the email.");
        setShowNotification(true);
        console.error(err);
      } finally {
        // Reset loading state for the specific bot
        setLoadingState((prev) => ({ ...prev, [id]: false }));
      }
    } else {
      setDialogError("Bot details not found"); // Handle case where bot is not found
    }
  };

  // Calculate Total, Active, and Inactive Bots
  const totalBots = botData.length;
  const activeBots = botData.filter((bot) => bot.status === "Active").length;
  const inactiveBots = totalBots - activeBots;

  // Calculate Progress
  const progressPercentage = (activeBots / totalBots) * 100;
  const progressAngle = (progressPercentage / 100) * 360;

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setShowNotification(false);
  };

  // copy the clipboard

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedBotId, setCopiedBotId] = useState("");

  const handleCopyBotId = (botId) => {
    navigator.clipboard.writeText(botId);
    setCopiedBotId(botId);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // DataGrid Columns
  const columns = [
    {
      field: "primary_id",
      headerName: "S.N",
      flex: isMobile ? 0.1 : 0.2,
      headerAlign: "center",
      minWidth: 50,
      align: "center",
      valueGetter: (params) => params.api.getRowIndex(params.id) + 1,
    },
    {
      field: "id",
      headerName: "Bot ID",
      flex: isMobile ? 0.5 : 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            color: colors.blueAccent[200],
            transition: "all 0.3s ease-out",
            "&:hover": { color: colors.blueAccent[500] },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleCopyBotId(params.value)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Bot Name",
      flex: isMobile ? 0.35 : 0.5,
      minWidth: 100,
      cellClassName: "bot-name-column--cell",
    },

    {
      field: "type",
      headerName: "Channel",
      flex: 0.35,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "language_support",
      headerName: "Language Support",
      flex: 0.5,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body2" color={colors.blueAccent[100]}>
          {params.row.language_support
            ? params.row.language_support.join(", ")
            : "N/A"}
        </Typography>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      flex: isMobile ? 0.3 : 0.4,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isActive = params.row.status === "Active";
        return (
          <Typography
            variant="h6"
            sx={{
              backgroundColor: isActive
                ? colors.greenAccent[700]
                : colors.redAccent[700],
              borderRadius: "25px",
              padding: "2px 8px",
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMobile ? 0.25 : 0.5,
      headerAlign: "center",
      minWidth: 80,
      align: "center",
      renderCell: (params) => (
        <Box display="flex" gap={isNonMobile ? "0.5em" : ".1em"}>
          <IconButton
            onClick={() => handleEdit(params.row.bot_id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[300] }}
          >
            <EditIcon sx={{ fontSize: isNonMobile ? "16px" : "14px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleView(params.row.bot_id)}
            aria-label="view"
          >
            <VisibilityIcon
              color="success"
              sx={{ fontSize: isNonMobile ? "16px" : "14px" }}
            />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.bot_id)}
            aria-label="delete"
          >
            <DeleteIcon
              color="error"
              sx={{
                fontSize: isNonMobile ? "16px" : "14px",
              }}
            />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "Start/Stop",
      headerName: "Start/Stop",
      flex: isMobile ? 0.25 : 0.4,
      headerAlign: "center",
      minWidth: 80,
      align: "center",
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
    {
      field: "send email",
      headerName: "Email Send",
      flex: isMobile ? 0.25 : 0.35,
      headerAlign: "center",
      minWidth: 50,
      align: "center",
      renderCell: (params) => {
        if (params.row.type !== "Email") {
          return null;
        }

        return (
          <Box display="flex" gap=".5em">
            <IconButton
              onClick={() => sendEmail(params.row.bot_id)}
              aria-label="send"
              sx={{ color: colors.greenAccent[300] }}
              disabled={loadingState[params.row.bot_id]}
            >
              {loadingState[params.row.bot_id] ? (
                <CircularProgress
                  size={16}
                  sx={{ color: colors.greenAccent[300] }}
                />
              ) : (
                <SendIcon sx={{ fontSize: "16px" }} />
              )}
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="10px"
      >
        <Header
          title="ALL BOTS OVERVIEW"
          subtitle="Welcome to All Bots Overview"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: isNonMobile ? "auto" : "100%",
          }}
        >
          <Button
            onClick={() => navigate("/addbot")}
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb: isNonMobile ? "0em" : "1em",
              transition: "all 0.5s ease",
              "&:hover": {
                opacity: ".7",
              },
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New Bot
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="140px"
        columnGap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn={
            isTab
              ? "span 4"
              : isSmallTab
              ? "span 6"
              : isNonMobile
              ? "span 8"
              : "span 12"
          }
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          overflow="auto"
        >
          <Box
            gridRow="span 2"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            p={{ xs: "20px", md: "30px" }}
          >
            <Box
              sx={{
                background: `conic-gradient(
                  ${colors.blueAccent[400]} 0deg ${progressAngle}deg, 
                  ${colors.redAccent[500]} ${progressAngle}deg 360deg
                )`,
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "60%",
                  height: "60%",
                  background: colors.primary[400],
                  borderRadius: "50%",
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: "2em",
                left: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "2",
              }}
            >
              <Typography
                variant="h5"
                color={colors.redAccent[500]}
                fontWeight="bold"
              >
                {inactiveBots}
              </Typography>
              <Typography
                variant="h6"
                color={colors.redAccent[500]}
                fontWeight="medium"
              >
                Inactive Bots
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "2",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[200]}
                fontWeight="bold"
              >
                {totalBots}
              </Typography>
              <Typography
                variant="h6"
                color={colors.grey[200]}
                fontWeight="medium"
              >
                Total Bots
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: "2em",
                top: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "2",
              }}
            >
              <Typography
                variant="h5"
                color={colors.blueAccent[400]}
                fontWeight="bold"
              >
                {activeBots}
              </Typography>
              <Typography
                variant="h6"
                color={colors.blueAccent[400]}
                fontWeight="medium"
              >
                Active Bots
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          mt="20px"
          backgroundColor={colors.primary[400]}
        >
          <Box>
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
          </Box>
          <Box
            gridColumn="span 12"
            height="380px"
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
              // checkboxSelection
              rows={botData.map((bot) => ({ ...bot, id: bot.bot_id }))}
              columns={columns}
              rowHeight={40}
              headerHeight={40}
              loading={loading}
              pagination
              rowsPerPageOptions={[25, 50, 100]}
            />

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: "100%" }}
              >
                You copied your bot ID: {copiedBotId}
              </Alert>
            </Snackbar>

            <Snackbar
              open={showNotification}
              autoHideDuration={6000}
              onClose={handleCloseNotification}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseNotification}
                severity={notificationType}
                sx={{ width: "100%" }}
              >
                {notificationMessage}
              </Alert>
            </Snackbar>

            <Snackbar
              open={showNotification}
              autoHideDuration={6000}
              onClose={() => setShowNotification(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setShowNotification(false)}
                severity={notificationType}
                sx={{ width: "100%" }}
              >
                {notificationMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>

      {/* Bot Details Dialog */}
      <Dialog
        open={!!selectedBot} // Open when selectedBot is not null
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "1em",
            boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.4)",
            border: `1px solid ${colors.grey[700]}`,
          },
        }}
      >
        <DialogContent
          dividers
          sx={{
            backgroundColor: colors.primary[400],
            padding: isNonMobile ? "2em" : "1em 0",
          }}
        >
          {dialogError ? (
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: "#EF5350",
                fontWeight: "500",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              {dialogError}
            </Typography>
          ) : (
            selectedBot && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DetailCard
                    title="Basic Information"
                    icon={
                      <InfoIcon sx={{ color: "#4CAF50", fontSize: "24px" }} />
                    }
                  >
                    <DetailItem
                      label="Bot ID"
                      value={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            position: "relative",
                            cursor: "pointer",
                            "&:hover .copy-icon": {
                              opacity: 1,
                              transform: "translateX(0)", // Moves icon into view smoothly
                            },
                          }}
                          onClick={() => handleCopyBotId(selectedBot.bot_id)}
                        >
                          <Typography variant="body2">
                            {selectedBot.bot_id}
                          </Typography>

                          {/* Copy Icon (Initially Hidden) */}
                          <IconButton
                            className="copy-icon"
                            sx={{
                              opacity: 0, // Hidden by default
                              transform: "translateX(10px)", // Moves icon out of view
                              transition:
                                "opacity 0.3s ease, transform 0.3s ease",
                              color: colors.blueAccent[200],
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                    />

                    <DetailItem label="Name" value={selectedBot.name} />
                    <DetailItem label="Type" value={selectedBot.type} />
                    <DetailItem
                      label="Status"
                      value={selectedBot.status}
                      color={
                        selectedBot.status === "Active" ? "success" : "error"
                      }
                    />
                    <DetailItem
                      label="Description"
                      value={selectedBot.description}
                    />
                  </DetailCard>
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailCard
                    title="Additional Information"
                    icon={
                      <DescriptionIcon
                        sx={{ color: colors.blueAccent[500], fontSize: "24px" }}
                      />
                    }
                  >
                    <DetailItem
                      label="Template"
                      value={selectedBot.pretrained_template}
                    />
                    <DetailItem
                      label="Role Description"
                      value={selectedBot.role_description}
                    />
                    <DetailItem
                      label="Expectation"
                      value={selectedBot.expectation}
                    />
                    <DetailItem
                      label="Languages"
                      value={
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {selectedBot.language_support?.map((lang) => (
                            <Chip
                              key={lang}
                              label={lang.toUpperCase()}
                              size="small"
                              sx={{
                                background:
                                  "linear-gradient(-45deg, #062994, #0E72E1)",
                                color: "white",
                              }}
                            />
                          ))}
                        </Box>
                      }
                    />
                    <DetailItem
                      label="Website ID"
                      value={selectedBot.website_id}
                    />
                  </DetailCard>
                </Grid>
              </Grid>
            )
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AllBots;
