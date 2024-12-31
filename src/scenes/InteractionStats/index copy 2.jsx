import React from "react";
import MyResponsiveHeatMap from "../../components/CalendarComponent";
import VisualizationData from "../../data/visualizationData";

function App() {
  return (
    <div style={{ height: "500px" }}>
      <h1>Transportation Heatmap</h1>
      <MyResponsiveHeatMap data={VisualizationData} />
    </div>
  );
}

export default App;
