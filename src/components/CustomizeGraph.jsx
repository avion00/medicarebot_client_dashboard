import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { tokens } from "../theme";

const CustomizeGraph = ({ onBack, botData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartType, setChartType] = useState("LineChart");
  const [dataKey, setDataKey] = useState("responses");

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDataKeyChange = (event) => {
    setDataKey(event.target.value);
  };

  return (
    <Card
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "0",
        boxShadow: "none",
        overflowY: "auto",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            padding: "1em",
            fontWeight: "600",
            borderBottom: `1px solid ${colors.grey[600]}`,
            width: "calc(100% - 500px)"
          }}
        >
          Customize Your Graph
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "end",
            gap: "1em",
            margin: "-2.5em 0 1.5em 0",
            // float: "right"

          }}
        >
          <FormControl fullWidth style={{ width: "220px" }}>
            <InputLabel
              style={{
                marginTop: "-0.6em",
                color: colors.primary[100],
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Chart Type
            </InputLabel>
            <Select value={chartType} sx={{borderRadius: '0'}} onChange={handleChartTypeChange}>
              <MenuItem value="LineChart">Line Chart</MenuItem>
              <MenuItem value="BarChart">Bar Chart</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ width: "220px" }}>
            <InputLabel
              style={{
                marginTop: "-0.6em",
                color: colors.primary[100],
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Data Key
            </InputLabel>
            <Select value={dataKey} sx={{borderRadius: '0'}} onChange={handleDataKeyChange}>
              <MenuItem value="responses">Responses</MenuItem>
              <MenuItem value="successRate">Success Rate</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          {chartType === "LineChart" ? (
            <LineChart data={botData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors.greenAccent[400]}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : (
            <BarChart data={botData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill={colors.blueAccent[500]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomizeGraph;
