import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WheelPage from "./pages/WheelPage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import "./App.css"; // Import CSS for styling

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Wheel</Link>
            </li>
            <li className="nav-item">
              <Link to="/setup">Setup</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/" element={<WheelPage />} />
          </Routes>
        </div>
        <footer className="footer">
          <p>Made by benwata777</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
