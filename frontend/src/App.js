import "./App.css";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Table from "./components/Table";
import TraceChart from "./components/TraceChart";

function App() {
  return (
    <div className="App">
      <div>
        <Table />
      </div>
      <header className="App-header">Team CreativeNet</header>
      <p>We are making an ML-based optimiser.</p>
      <TraceChart
        csv_file="equipment_id_train_counts.csv"
        plot_title="Equipment ID train counts"
        x_label="Equipment number (in a series)"
        y_label="Frequency"
        y_var_name="0"
      />
      <p />
      <TraceChart
        csv_file="completion_date_count_cases.csv"
        plot_title="Cases by completion date (temporal)"
        x_label="Completion (in a sorted series)"
        y_label="Number of cases"
        y_var_name="equipment_id"
      />
      <p />

      <TraceChart
        csv_file="completion_date.csv"
        plot_title="Cases by completion date (sorted by number of cases)"
        x_label="Completion date (in a series sorted by number of cases)"
        y_label="Number of cases"
        y_var_name="0"
      />
      <p />
      <PieChart
        plot_title="Action recommendations by category"
        csv_file="action_recommendation_category.csv"
        x_var_name="action_recommendation_category"
        y_var_name="0"
      />
      <p>More details will come later.</p>
      <p>
        For now, another fake plot (for which we have not found real data yet):
      </p>
      <BarChart />
    </div>
  );
}

export default App;
