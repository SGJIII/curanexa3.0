import React, { Component } from "react";
import AnalyzePage from "./components/AnalyzePage";
import AnalysisPage from "./components/AnalysisPage";
import ImagesPage from "./components/ImagesPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AnalyzePage />
        <AnalysisPage />
        <ImagesPage />
      </div>
    );
  }
}

export default App;
