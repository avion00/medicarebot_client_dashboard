import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import React, { useEffect, useState } from "react";
import botsData from "../../data/ActiveBotsData.json";
import "./ActiveBots.css";
import ViewListIcon from "@mui/icons-material/ViewList";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import UpdateIcon from "@mui/icons-material/Update";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import QueryStatsIcon from "@mui/icons-material/QueryStats";


const ActiveBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bots, setBots] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setBots(botsData);
  }, []);

  const handleViewAllClick = () => {
    setShowAll(true);
  };

  const handleDeactivate = (id) => {
    setBots((prevBots) =>
      prevBots.map((bot) =>
        bot.id === id ? { ...bot, status: "Inactive" } : bot
      )
    );
  };

  const BotCard = ({ bot }) => (
    <div
      className="bot-card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1em",
        backgroundColor: colors.primary[400],
      }}
    >
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={bot.selectedImage || "../../assets/bot.png"}
          alt="Bot Profile"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px sold rgb(125, 125, 125, 0.3)",
            margin: "1em",
          }}
        />
        <Box
          style={{
            fontSize: "1.5em",
            flexGrow: "1",
            padding: ".5em",
            fontWeight: "800",
          }}
        >
          {bot.name}
        </Box>
        <Box
          style={{
            flexGrow: "1",
            alignContent: "start",
            padding: ".5em",
          }}
        >
          <Box>
            <span style={{ fontWeight: "600", color: colors.blueAccent[400] }}>
              Status:{" "}
            </span>
            <span
              style={{ fontWeight: "800", color: colors.greenAccent[400] }}
              className={`status ${bot.status.toLowerCase()}`}
            >
              {bot.status}
            </span>
          </Box>
          <Box>
            <span style={{ fontWeight: "600", color: colors.blueAccent[400] }}>
              Created On:{" "}
            </span>
            <span>{bot.createdOn}</span>
          </Box>
          <Box>
            <span style={{ fontWeight: "600", color: colors.blueAccent[400] }}>
              Last Trained:{" "}
            </span>
            <span>{bot.lastTrained}</span>
          </Box>
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.blueAccent[400] }}>
              Usage Frequency:{" "}
            </span>
            <span>{bot.usageFrequency}</span>
          </p>
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.blueAccent[400] }}>
              Response Accuracy:{" "}
            </span>
            <span>{bot.responseAccuracy}%</span>
          </p>
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.blueAccent[400] }}>
              Support Languages:{" "}
            </span>
            <span>{bot.supportLanguages.join(", ")}</span>
          </p>
        </Box>
        <div
          className="bot-metrics"
          style={{
            flexGrow: "1",
            alignContent: "start",
            padding: ".5em",
          }}
        >
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.greenAccent[400] }}>
              Performance Score:{" "}
            </span>
            <span className="score">{bot.performanceScore}%</span>
          </p>
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.greenAccent[400] }}>
              Response Time:{" "}
            </span>
            <span>{bot.responseTime}s</span>
          </p>
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.greenAccent[400] }}>
              Average Length:{" "}
            </span>
            <span>{bot.averageSessionLength} mins</span>
          </p>
          <p
            style={{
              fontSize: "1em",
              fontFamily: "Inter",
              margin: "0",
            }}
          >
            <span style={{ fontWeight: "600", color: colors.greenAccent[400] }}>
              Total Interactions:{" "}
            </span>
            <span>{bot.totalInteractions}</span>
          </p>
        </div>
      </Box>
      <div
        className="bot-actions"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          padding: ".5em",
          marginTop: '1em'
        }}
      >
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              textTransform: "capitalize",
            }}
          >
            <ChangeCircleIcon sx={{ mr: "8px" }} />
            Configure
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              textTransform: "capitalize",
            }}
          >
            <UpdateIcon sx={{ mr: "8px" }} />
            Update Training
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => handleDeactivate(bot.id)}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              textTransform: "capitalize",
            }}
          >
            <DoDisturbIcon sx={{ mr: "8px" }} />
            Deactivate
          </Button>
        </Box>

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              textTransform: "capitalize",
            }}
          >
            <QueryStatsIcon sx={{ mr: "8px" }} />
            View Analytics
          </Button>
        </Box>
      </div>
    </div>
  );

  // Filter bots based on status
  const activeBots = bots.filter((bot) => bot.status === "Active");

  // Limit to show only 2 active bots initially
  const displayedBots = showAll ? activeBots : activeBots.slice(0, 2);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box>
        <Header title="ACTIVE BOTS" subtitle="List of Active Bots" />
      </Box>

      <Box>
        <div
          className="bot-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          {displayedBots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
        {activeBots.length > 2 && !showAll && (
          <Box>
            <Button
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 16px",
                float: "right",
                marginTop: "1em",
              }}
              onClick={handleViewAllClick}
            >
              <ViewListIcon sx={{ mr: "10px" }} />
              View All
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ActiveBots;
