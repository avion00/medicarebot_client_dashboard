import { Box, Button, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import botsData from "./ActiveBotsData.json";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bots, setBots] = useState([]);
  const [deactivatedBots, setDeactivatedBots] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setBots(botsData);
    const inactiveBots = botsData.filter((bot) => bot.status === "Inactive");
    setDeactivatedBots(
      inactiveBots.map((bot) => ({
        name: bot.name,
        deactivationDate: bot.deactivationDate || "Unknown Date",
      }))
    );
  }, []);

  const handleReactivate = (name) => {
    setDeactivatedBots((prevDeactivated) =>
      prevDeactivated.filter((bot) => bot.name !== name)
    );
    localStorage.setItem("botsData", JSON.stringify(bots)); // Update local storage
  };

  const handleCheckboxChange = (name) => {
    setCheckedItems((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      }
      return [...prev, name];
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setCheckedItems([]);
    } else {
      const allNames = deactivatedBots.map((bot) => bot.name);
      setCheckedItems(allNames);
    }
    setSelectAll((prev) => !prev);
  };

  const handleReactivateAll = () => {
    checkedItems.forEach((name) => handleReactivate(name));
    setCheckedItems([]);
    setSelectAll(false);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box>
        <section className="deactivated-bots">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: "1em 1.5em",
              backgroundColor: "#0f3c4c",
              color: "#fff",
              margin: "0",
            }}
          >
            Deactivated Bots
          </h2>
          <div
            className="deactivated-container"
            style={{
              border: "1px solid rgb(125, 125, 125, 0.2)",
              boxShadow: "2px 2px 50px 2px rgb(125, 125, 125, 0.2)",
              borderRadius: ".75em",
              padding: "0",
              margin: "1.5em 0",
            }}
          >
            <h3
              style={{
                padding: ".75em 1.25em",
                backgroundColor: "rgb(37,150,190, .2)",
                borderRadius: ".5em .5em 0 0",
                display: "flex",
                alignItems: "center",
                gap: ".5em",
              }}
            >
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                style={{
                  width: ".8em",
                  height: ".8em",
                }}
              />
              Select All Deactivated Bots
            </h3>
            <ul
              className="deactivated-list"
              style={{
                padding: "0 1em",
                display: "flex",
                flexDirection: "column",
                // gap: '.25em',
              }}
            >
              {deactivatedBots.map((bot, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".75em",
                    padding: ".4em .65em",
                    borderBottom: "1px solid rgba(125, 125, 125, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgb(125, 125, 125, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "inherit";
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".75em",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(bot.name)}
                      onChange={() => handleCheckboxChange(bot.name)}
                      style={{
                        width: ".9em",
                        height: ".9em",
                      }}
                    />
                    {bot.name} - Deactivated on {bot.deactivationDate}
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="reactivate-bot"
              onClick={handleReactivateAll}
              style={{
                margin: "1em 1em 1.5em 2.25em",
                padding: ".65em 1.5em",
                backgroundColor: "#0f3c4c",
                color: "#fff",
              }}
            >
              Reactivate Selected Bots
            </button>
          </div>
        </section>
      </Box>
    </Box>
  );
};

export default Dashboard;
