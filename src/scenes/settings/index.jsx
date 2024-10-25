import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

import React, { useState } from "react";
import "./style.css";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [configResponse, setConfigResponse] = useState("");
  const [crawlingStatus, setCrawlingStatus] = useState("");
  const [analyticsData, setAnalyticsData] = useState("");
  const [feedbackList, setFeedbackList] = useState("");
  const [activityLogs, setActivityLogs] = useState("");
  const [advancedSettings, setAdvancedSettings] = useState({
    responseTime: "",
    supportedLanguages: [],
  });
  const [crawlSettings, setCrawlSettings] = useState({
    depth: "",
    includeSitemap: false,
  });
  const [botAppearance, setBotAppearance] = useState({
    colorScheme: "",
    fontStyle: "",
  });
  const [feedback, setFeedback] = useState("");

  // Event Handlers
  const configureBots = () => {
    // Handle bot configuration
  };

  const startCrawling = () => {
    // Handle website crawling
  };

  const customizeBot = () => {
    // Handle bot customization
  };

  const generateCode = () => {
    // Handle code generation
  };

  const fetchAnalytics = () => {
    // Fetch analytics
  };

  const fetchFeedback = () => {
    // Fetch user feedback
  };

  const fetchLogs = () => {
    // Fetch activity logs
  };

  const saveCrawlingSettings = () => {
    // Save crawling settings
  };

  const submitFeedback = () => {
    // Handle feedback submission
  };

  const exportAnalytics = () => {
    // Export analytics data
  };

  const exportLogs = () => {
    // Export activity logs
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvancedSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCrawlSettingChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCrawlSettings((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBotAppearanceChange = (e) => {
    const { name, value } = e.target;
    setBotAppearance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeedbackInput = (e) => {
    setFeedback(e.target.value);
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
        <div>
          <div className="main container bot_settings" style={{}}>
            {/* Configure Bots */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                Configure Bots
              </h3>
              <label
                style={{
                  padding: "1.5em .75em",
                  fontWeight: "600",
                  fontSize: "1em",
                }}
              >
                Select Channels:
              </label>
              <select
                className="select_channels"
                multiple
                style={{
                  width: "98%",
                  padding: "0",
                  margin: " .5em",
                  backgroundColor: "rgb(37,150,190, .06)",
                  color: "inherit",
                  overflow: "auto",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.3)",
                }}
              >
                <option
                  style={{
                    padding: ".5em 1em",
                    borderBottom: "5px solid rgb(125, 125, 125, 0.5)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Webchat
                </option>
                <option
                  style={{
                    padding: ".5em 1em",
                    borderBottom: "5px solid rgb(125, 125, 125, 0.5)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Email
                </option>
                <option
                  style={{
                    padding: ".5em 1em",
                    borderBottom: "5px solid rgb(125, 125, 125, 0.5)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  WhatsApp
                </option>
                <option
                  style={{
                    padding: ".5em 1em",
                    borderBottom: "5px solid rgb(125, 125, 125, 0.5)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Messenger
                </option>
                <option
                  style={{
                    padding: ".5em 1em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Telegram
                </option>
              </select>
              <button
                style={{
                  padding: ".65em 1.25em",
                  margin: ".5em",
                  backgroundColor: "#165a72",
                  color: "white",
                  border: "none",
                }}
                onClick={configureBots}
              >
                Configure Bots
              </button>
              <p>{configResponse}</p>

              <h4
                style={{
                  margin: "2em .5em",
                  marginBottom: "1em",
                  padding: " 0 .5em",
                  fontWeight: "600",
                  fontSize: "1em",
                  fontFamily: "Inter",
                }}
              >
                Advanced Bot Settings
              </h4>
              <label
                style={{
                  padding: ".15em 1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "600",
                }}
              >
                Response Time (ms):
              </label>
              <input
                type="number"
                name="responseTime"
                value={advancedSettings.responseTime}
                onChange={handleInputChange}
                style={{
                  padding: ".35em 1em",
                  fontFamily: "Inter, sans-serif",
                  margin: "0 0 .75em 1em",
                  backgroundColor: "rgb(37,150,190,.08)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.3)",
                }}
              />
              <label
                style={{
                  padding: ".15em 1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "600",
                }}
              >
                Supported Languages:
              </label>
              <input
                type="text"
                name="supportedLanguages"
                value={advancedSettings.supportedLanguages}
                onChange={handleInputChange}
                placeholder="Comma separated"
                style={{
                  padding: ".35em 1em",
                  fontFamily: "Inter, sans-serif",
                  margin: "0 0 .75em 1em",
                  backgroundColor: "rgb(37,150,190,.1)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.3)",
                }}
              />
            </section>

            {/* Website Crawling */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                Website Crawling
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1em",
                  padding: "1em .5em",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter website URL"
                  style={{
                    padding: ".5em 1em",
                    backgroundColor: "rgb(37,150,190,.08)",
                    color: "inherit",
                    borderRadius: ".25em",
                    border: "1px solid rgb(125, 125, 125, 0.5)",
                    flex: "1",
                    maxWidth: "750px",
                  }}
                />
                <label
                  style={{
                    padding: " 0 .5em",
                    fontWeight: "600",
                    fontSize: "1.1em",
                  }}
                >
                  Crawl Depth:
                </label>
                <input
                  type="number"
                  name="depth"
                  value={crawlSettings.depth}
                  onChange={handleCrawlSettingChange}
                  style={{
                    padding: ".5em 1em",
                    backgroundColor: "rgb(37,150,190,.08)",
                    color: "inherit",
                    borderRadius: ".25em",
                    border: "1px solid rgb(125, 125, 125, 0.5)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  flexWrap: "wrap",
                  gap: "1em",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <input
                    type="checkbox"
                    name="includeSitemap"
                    checked={crawlSettings.includeSitemap}
                    onChange={handleCrawlSettingChange}
                    style={{
                      margin: "0 0 0 .5em",
                      border: "1px solid rgb(125, 125, 125, 0.5)",
                    }}
                  />{" "}
                  Include Sitemap
                </label>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                  }}
                  onClick={startCrawling}
                >
                  Start Crawling
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    marginLeft: "10px",
                  }}
                  onClick={saveCrawlingSettings}
                >
                  Save Crawling Settings
                </button>
                <p>{crawlingStatus}</p>
              </div>
            </section>

            {/* Bot Customization */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                Bot Customization
              </h3>
              <label
                style={{
                  padding: " 0 .5em",
                  fontWeight: "600",
                  fontSize: "1.1em",
                  margin: "1em",
                }}
              >
                Avatar:
              </label>
              <input
                type="file"
                style={{
                  padding: ".5em 1em",
                  margin: ".5em 1em",
                  backgroundColor: "rgb(37,150,190, 0.07)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.5)",
                  width: "fit-content",
                }}
              />
              <label
                style={{
                  padding: " 0 .5em",
                  fontWeight: "600",
                  fontSize: "1.1em",
                  margin: "1em",
                }}
              >
                Icon:
              </label>
              <input
                type="file"
                style={{
                  padding: ".5em 1em",
                  margin: ".5em 1em",
                  backgroundColor: "rgb(37,150,190, 0.07)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.5)",
                  width: "fit-content",
                }}
              />
              <label
                style={{
                  padding: " 0 .5em",
                  fontWeight: "600",
                  fontSize: "1.1em",
                  margin: "1em",
                }}
              >
                Color Scheme:
              </label>
              <input
                type="text"
                name="colorScheme"
                value={botAppearance.colorScheme}
                onChange={handleBotAppearanceChange}
                placeholder="e.g., #ff0000"
                style={{
                  padding: ".5em 1em",
                  margin: ".5em 1em",
                  backgroundColor: "rgb(37,150,190, 0.07)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.5)",
                }}
              />
              <label
                style={{
                  padding: " 0 .5em",
                  fontWeight: "600",
                  fontSize: "1.1em",
                  margin: "1em",
                }}
              >
                Font Style:
              </label>
              <input
                type="text"
                name="fontStyle"
                value={botAppearance.fontStyle}
                onChange={handleBotAppearanceChange}
                placeholder="e.g., Arial"
                style={{
                  padding: ".5em 1em",
                  margin: ".5em 1em",
                  backgroundColor: "rgb(37,150,190, 0.07)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.5)",
                }}
              />
              <button
                style={{
                  padding: ".65em 1.25em",
                  margin: ".5em .7em",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                }}
                onClick={customizeBot}
              >
                Customize Bot
              </button>
            </section>

            {/* Code Integration */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                Code Integration
              </h3>
              <textarea
                type="text"
                placeholder="Enter custom platform (e.g., WordPress)"
                style={{
                  width: "99%",
                  height: "200px",
                  fontFamily: "Inter, sans-serif",
                  padding: ".5em 1em",
                  margin: " .75em 0 1em .5em",
                  backgroundColor: "rgb(37,150,190, 0.08)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.5)",
                }}
              />
              <button
                style={{
                  padding: "0.65em 1em",
                  margin: ".7em",
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                }}
                onClick={generateCode}
              >
                Generate Code Snippet
              </button>
            </section>

            {/* Bot Analytics */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                Bot Analytics
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1em",
                  padding: ".5em",
                }}
              >
                <button
                  style={{
                    padding: ".6em 1em",
                    backgroundColor: "#17a2b8",
                    color: "white",
                    border: "none",
                  }}
                  onClick={fetchAnalytics}
                >
                  Fetch Analytics
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    border: "none",
                    marginLeft: "10px",
                  }}
                  onClick={exportAnalytics}
                >
                  Export Analytics
                </button>
                <p>{analyticsData}</p>
              </div>
            </section>

            {/* User Feedback */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                User Feedback
              </h3>
              <textarea
                value={feedback}
                onChange={handleFeedbackInput}
                placeholder="Enter feedback"
                style={{
                  width: "99%",
                  height: "200px",
                  fontFamily: "Inter, sans-serif",
                  padding: ".5em 1em",
                  margin: " .75em 0 1em .5em",
                  backgroundColor: "rgb(37,150,190, 0.08)",
                  color: "inherit",
                  borderRadius: ".25em",
                  border: "1px solid rgb(125, 125, 125, 0.5)",
                }}
              ></textarea>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1em",
                  padding: ".5em",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                  }}
                  onClick={submitFeedback}
                >
                  Submit Feedback
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                    border: "none",
                    marginLeft: "10px",
                  }}
                  onClick={fetchFeedback}
                >
                  Fetch Feedback
                </button>
                <p>{feedbackList}</p>
              </div>
            </section>

            {/* Activity Logs */}
            <section
              style={{
                border: "1px solid rgb(125, 125, 125, 0.1)",
                borderRadius: ".5em",
                boxShadow: "2px 2px 20px 5px rgb(125, 125, 125, 0.15)",
                margin: "1.5em 1em",
                padding: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "800",
                  backgroundColor: "rgb(37,150,190, .2)",
                  padding: "1em 2em",
                  borderRadius: ".25em .25em 0 0",
                }}
              >
                Activity Logs
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1em",
                  padding: ".5em",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                  }}
                  onClick={fetchLogs}
                >
                  Fetch Logs
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    border: "none",
                    marginLeft: "10px",
                  }}
                  onClick={exportLogs}
                >
                  Export Logs
                </button>
                <p>{activityLogs}</p>
              </div>
            </section>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
