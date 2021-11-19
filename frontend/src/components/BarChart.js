import React from "react";

import Plot from "react-plotly.js";

class BarChart extends React.Component {

  render() {

    return (

      <Plot

        data={[

          // {

          //   x: [1, 2, 3],

          //   y: [2, 6, 3],

          //   type: "scatter",

          //   mode: "lines+markers",

          //   marker: { color: "red" },

          // },

          { type: "bar", x: ["manual check"], y: [1400], name: "Without our solution" },
          { type: "bar", x: ["our solution"], y: [700], name: "With our solution"},

        ]}

        layout={{ width: 640, height: 480, title: "Some made-up stats" }}

      />

    );

  }

}

export default BarChart;