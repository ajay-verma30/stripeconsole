import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Console from "./Pages/Console";
import RecordDetails from "./Pages/RecordDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/console" element={<Console/>}></Route>
            <Route path="/details/:id" element={<RecordDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
