import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Analyze from "./components/AnalyzePage";
import Analysis from "./components/AnalysisPage";
import Images from "./components/ImagesPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Analyze</Link> | <Link to="/Images">Images</Link> |{" "}
          <Link to="/Analysis">Analysis</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Analyze />} />
          <Route path="/Analysis" element={<Analysis />} />
          <Route path="/Images" element={<Images />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
