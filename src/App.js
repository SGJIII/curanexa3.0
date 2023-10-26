import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AnalyzePage from "./components/AnalyzePage";
import ImagesPage from "./components/ImagesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <header>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            <img src="/logo.png" alt="CuraNexa Logo" className="logo" />
          </a>
        </header>
        <Routes>
          <Route path="/" element={<AnalyzePage />} />
          <Route path="/Images" element={<ImagesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
