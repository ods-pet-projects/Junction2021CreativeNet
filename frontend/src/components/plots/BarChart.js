import React from "react";

import Plot from "react-plotly.js";

//import * as d3 from 'd3';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  render() {
    return (
      <Plot
        data={[
          {
            type: "bar",
            x: ["manual check"],
            y: [1400],
            name: "Without our solution",
          },
          {
            type: "bar",
            x: ["our solution"],
            y: [700],
            name: "With our solution",
          },
        ]}
        layout={{ width: 640, height: 480, title: "Some made-up stats" }}
      />
    );
  }
}

export default BarChart;
