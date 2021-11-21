import React from "react";

import Plot from "react-plotly.js";

import * as d3 from "d3";

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const self = this;

    d3.csv(`/data/${this.props.csv_file}`)
      .then(function (data_stats) {
        console.log(data_stats);
        self.setState({
          data: data_stats,
        });
      })
      .catch(function (err) {
        throw err;
      });
  }

  render() {
    const data = [
      {
        values: this.state.data.map((p) => p[this.props.y_var_name]),
        labels: this.state.data.map((p) => p[this.props.x_var_name]),
        type: "pie",
      },
    ];

    const layout = {
      height: 400,
      width: 500,
      title: this.props.plot_title,
    };

    return <Plot data={data} layout={layout} />;
  }
}

export default PieChart;
