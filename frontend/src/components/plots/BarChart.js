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
        data={this.props.data}
        layout={{
          width: 640,
          height: 480,
          title: "SHAP values of the ML model",
        }}
      />
    );
  }
}

export default BarChart;
