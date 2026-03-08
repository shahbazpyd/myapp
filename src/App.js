import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import "./components/dashboard/Dashboard.css";
import Home from "./components/Home/Home"
import "./components/Home/Home.css"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
}
export default App;
