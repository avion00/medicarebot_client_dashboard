import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import InteractionsDataJson from "../../data/interactionData.json";
import useMediaQuery from "@mui/material/useMediaQuery";

const ChatHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [customerLogs, setCustomerLogs] = useState([]);
  const [chatHistories, setChatHistories] = useState([]);
  const [offlineMessages, setOfflineMessages] = useState([]);

  useEffect(() => {
    setCustomerLogs(InteractionsDataJson.customerLogs);
    setChatHistories(InteractionsDataJson.chatHistories);
    setOfflineMessages(InteractionsDataJson.offlineMessages);
  }, []);

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  const renderTable = (title, data, columns) => (
    <Box
      gridColumn="span 1"
      gridRow="span 1"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      mt={3}
      sx={{
        flexGrow: "1",
        width: isNonMobile ? "25%" : "100%",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        p="16px"
      >
        <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
          {title}
        </Typography>
      </Box>
      {data.map((row, i) => {
        const { formattedDate, formattedTime } = formatDateAndTime(
          row.timestamp
        );
        return (
          <Box
            key={`${row.id}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Box
                color={colors.blueAccent[400]}
                fontWeight="700"
                height="25px"
                overflow="hidden"
                fontSize="15px"
              >
                {row.customer}
              </Box>

              {columns.includes("action") && (
                <Box
                  sx={{
                    color: colors.greenAccent[400],
                    overflow: "hidden",
                    height: "25px",
                  }}
                >
                  {row.action}
                </Box>
              )}
              {columns.includes("message") && (
                <Box
                  sx={{
                    color: colors.greenAccent[400],
                    height: "25px",
                    overflow: "hidden",
                  }}
                >
                  {row.message}
                </Box>
              )}
            </Box>
            <Box textAlign="right">
              <Box color={colors.grey[200]} fontSize="14px">
                {formattedDate}
              </Box>
              <Box color={colors.grey[200]} fontSize="13px">
                {formattedTime}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box m="20px" mb="0">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header title="CHAT LOGS" subtitle="Chat Logs Management Dashboard" />
        <Box>
          <Button
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: isNonMobile ? "10px 20px" : ".5em",
              // marginBottom: isNonMobile ? "inherit" : "1.5em",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1em",
          height: "100%",
          maxHeight: "70dvh",
          flexWrap: "wrap",
        }}
      >
        {/* Customer Logs */}
        {renderTable("Customer Logs", customerLogs, ["customer", "action"])}

        {/* Chat History */}
        {renderTable("Chat History", chatHistories, ["customer", "message"])}

        {/* Offline Messages */}
        {renderTable("Offline Messages", offlineMessages, [
          "customer",
          "message",
        ])}
      </Box>
    </Box>
  );
};

export default ChatHistory;
