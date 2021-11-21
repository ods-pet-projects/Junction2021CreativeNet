import React from "react";

import Plot from "react-plotly.js";

import * as d3 from "d3";

class TraceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const self = this;

    d3.csv(`/data/${this.props.csv_file}`)
      .then(function (data_stats) {
        self.setState({
          data: data_stats,
        });
      })
      .catch(function (err) {
        throw err;
      });
  }

  render() {
    return (
      <Plot
        data={[
          {
            y: this.state.data.map((p) => p[this.props.y_var_name]),
            x: this.state.data.map((p, i) => i), // we could also, alternatively, get equipment_id instead of its index but that makes the plot look heavy

            mode: "lines+markers",

            marker: { color: "red" },
          },
        ]}
        layout={{
          width: 640,
          height: 480,
          title: this.props.plot_title,

          yaxis: {
            title: {
              text: this.props.y_label,
            },
          },
          xaxis: {
            title: {
              text: this.props.x_label,
            },
          },
        }}
      />
    );
  }
}

export default TraceChart;
