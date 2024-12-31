import React from "react";
import { /*Box, Typography,*/ useTheme } from "@mui/material";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { tokens } from "../theme";

const MyResponsiveHeatMap = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 0, right: 0, bottom: 50, left: 40 }}
      valueFormat=">-.2s"
      colors={{
        type: "diverging",
        scheme: "red_yellow_blue",
        divergeAt: 0.5,
        minValue: -100000,
        maxValue: 100000,
      }}
      emptyColor="#555555"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        tickColor: colors.text, // Custom tick color
        legend: "Day", // Modify this legend text
        legendOffset: 46,
        legendTextColor: colors.primary, // Color for axis legend text
        truncateTickAt: 0,
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickColor: colors.greenAccent[400], // Custom tick color
        legend: "Time", // Modify this legend text
        legendPosition: "middle",
        legendOffset: 70,
        legendTextColor: colors.primary, // Color for axis legend text
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickColor: colors.text, // Custom tick color
        legend: "Value", // Modify this legend text
        legendPosition: "middle",
        legendOffset: -72,
        legendTextColor: colors.primary, // Color for axis legend text
        truncateTickAt: 0,
      }}
      legends={[
        {
          anchor: "bottom",
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: "row",
          tickPosition: "after",
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: ">-.2s",
          title: "Value →", // Modify this legend title text
          titleAlign: "start",
          titleOffset: 4,
          textColor: colors.text, // Color for legend text
        },
      ]}
    />
  );
};

export default MyResponsiveHeatMap;
