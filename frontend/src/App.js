import "./App.css";
import BarChart from "./components/BarChart";
import Footer from "./components/footer/Footer";
import PieChart from "./components/PieChart";
import Table from "./components/table/Table";
import TraceChart from "./components/TraceChart";

import IntroModal from "./components/IntroModal";

import 'bootstrap/dist/css/bootstrap.css';

import FullheightIframeMap from './components/Mapiframe'

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <a href="/"><img src="/logo.png" alt="CreativeNet: ML based optimiser for lift repair works" /></a>
        <p>
        <IntroModal />
        </p>
      </header>

      <div>      
        <FullheightIframeMap />
      


        <h2>Table of service repair recommendation evaluations</h2>
        <p>Here we present the outcome of our algorithm. The field "Positive feedback" is evaluation by our ML algorithm. You can also sort the table by clicking on field names.</p>
        <Table />
      </div>

      <Footer />

      {/* <TraceChart
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
      <BarChart /> */}
    </div>
  );
}

export default App;
