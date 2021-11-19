import './App.css';
import BarChart from "./components/BarChart"
import PieChart from "./components/PieChart"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Team CreativeNet
      </header>
      <p>We are making an ML-based optimiser.</p>
      <BarChart />
      <p>More details will come later.</p>
      <PieChart />
    </div>
  );
}

export default App;
