import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Console from "./Pages/Console";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/console" element={<Console/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
