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
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomizeGraph = ({ onBack, botData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

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
            padding: isNonMobile? "1em" : '1em 0',

            fontWeight: "600",
            borderBottom: `1px solid ${colors.grey[600]}`,
            // width: "calc(100% - 500px)",
            width: isNonMobile ? "calc(100% - 500px)" : "100%",
          }}
        >
          Customize Your Graph
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: isNonMobile? "end" : "start",
            
            gap: "1em",
            // margin: "-2.5em 0 1.5em 0",
            margin: isNonMobile ? "-2.5em 0 1.5em 0 " : "2em 0em",
            // float: "right"
          }}
        >
          <FormControl
            fullWidth
            style={{ width: isNonMobile ? "220px" : "120px" }}
          >
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
            <Select
              value={chartType}
              sx={{ borderRadius: "0" }}
              onChange={handleChartTypeChange}
            >
              <MenuItem value="LineChart">Line Chart</MenuItem>
              <MenuItem value="BarChart">Bar Chart</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            style={{ width: isNonMobile ? "220px" : "120px" }}
          >
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
            <Select
              value={dataKey}
              sx={{ borderRadius: "0" }}
              onChange={handleDataKeyChange}
            >
              <MenuItem value="responses">Responses</MenuItem>
              <MenuItem value="successRate">Success Rate</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          {chartType === "LineChart" ? (
            <LineChart data={botData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[100]} />
              <XAxis dataKey="name" stroke={colors.greenAccent[100]} />
              <YAxis stroke={colors.grey[100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.blueAccent[700],
                  border: `1px solid ${colors.grey[700]}`,
                  borderRadius: ".5em",
                  fontSize: "12px",
                  color: colors.grey[100],
                }}
                itemStyle={{ color: colors.textPrimary }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors.blueAccent[500]}
                strokeWidth={2}
                activeDot={{ r: 4 }}
                dot={{ r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={botData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.blueAccent[700],
                  border: `1px solid ${colors.grey[700]}`,
                  borderRadius: ".5em",
                  fontSize: "12px",
                  color: colors.grey[100],
                }}
                itemStyle={{ color: colors.textPrimary }}
              />
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
