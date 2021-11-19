import React from "react";

import Plot from "react-plotly.js";

class PieChart extends React.Component {


  render() {

    const data = [{
        values: [46, 28, 26],
        labels: ['ML models', 'Visualisations', 'Hustlin\''],
        type: 'pie'
      }];

    const layout = {
        height: 400,
        width: 500,
        title: "Our idea consists of"
      };

    return (

      <Plot
        data={data}
        layout={layout}

      />

    );

  }

}

export default PieChart;