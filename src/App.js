import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InvalidRoute from "./pages/InvalidRoute";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
