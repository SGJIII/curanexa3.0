import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./AnalyzePage.css";
import sendEvent from "../analytics.js";

const AnalyzePage = () => {
  console.log("Component rendering"); // This will log every time the component renders

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);

  const op_threshs = {
    Atelectasis: 0.07422872,
    Consolidation: 0.038290843,
    Infiltration: 0.09814756,
    Pneumothorax: 0.0098118475,
    Edema: 0.023601074,
    Emphysema: 0.0022490358,
    Fibrosis: 0.010060724,
    Effusion: 0.103246614,
    Pneumonia: 0.056810737,
    Pleural_Thickening: 0.026791653,
    Cardiomegaly: 0.050318155,
    Nodule: 0.023985857,
    Mass: 0.01939503,
    Hernia: 0.042889766,
    "Lung Lesion": 0.053369623,
    Fracture: 0.035975814,
    "Lung Opacity": 0.20204692,
    "Enlarged Cardiomediastinum": 0.05015312,
  };

  const ppv80_thres = {
    Atelectasis: 0.72715247,
    Consolidation: 0.8885005,
    Infiltration: 0.92493945,
    Pneumothorax: 0.6527224,
    Edema: 0.68707734,
    Emphysema: 0.7304924,
    Fibrosis: 0.7272054,
    Effusion: 0.6127343,
    Pneumonia: 0.9878492,
    Pleural_Thickening: 0.61979693,
    Cardiomegaly: 0.66309816,
    Nodule: 0.7853459,
    Mass: 0.930661,
    Hernia: 0.93645346,
    "Lung Lesion": 0.6788558,
    Fracture: 0.6547198,
    "Lung Opacity": 0.61614525,
    "Enlarged Cardiomediastinum": 0.8489876,
  };

  const categorizePathologies = (results) => {
    let highlyLikely = [];
    let possible = [];
    let likelyRuledOut = [];

    Object.entries(results).forEach(([condition, confidence]) => {
      if (confidence >= ppv80_thres[condition]) {
        highlyLikely.push({ condition, confidence });
      } else if (confidence >= op_threshs[condition]) {
        possible.push({ condition, confidence });
      } else {
        likelyRuledOut.push({ condition, confidence });
      }
    });

    // Sort each category by confidence in descending order
    highlyLikely = highlyLikely.sort((a, b) => b.confidence - a.confidence);
    possible = possible.sort((a, b) => b.confidence - a.confidence);
    likelyRuledOut = likelyRuledOut.sort((a, b) => b.confidence - a.confidence);

    return { highlyLikely, possible, likelyRuledOut };
  };

  useEffect(() => {
    console.log("Result object:", result); // Log the result state to see if it is updated correctly

    if (result) {
      console.log("Preds object:", result.preds); // Log the preds object

      if (typeof result.preds === "object") {
        Object.entries(result.preds).forEach(([condition, value]) => {
          console.log(`${condition}: ${value}`); // Log each condition separately
        });
      } else {
        console.log("Preds is not an object");
      }
    }
  }, [result]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", files[0]);
    setLoading(true); // Set loading to true when the request starts

    axios
      .post(
        "https://gentle-springs-57358-d1f77df02123.herokuapp.com/analyze",
        formData
      )
      .then((response) => {
        const parsedData = JSON.parse(response.data); // Parse the response text as JSON
        setResult(parsedData.preds); // Handle analysis results directly
        console.log("Result set:", parsedData.preds); // Check if the result is being set correctly
        sendEvent("receive_results", "Analysis", "Received Results", "success"); // Track successful result event with Google Analytics
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error during image upload:", error);
        sendEvent(
          "analysis_error",
          "Analysis",
          "Error during analysis",
          "error"
        ); // Track the error event with Google Analytics
        setLoading(false);
      });
  };

  console.log(result);

  return (
    <div className="container">
      <div className="how-it-works">
        <h2>How it works</h2>
        <ol className="no-numbers">
          <li>Take a picture or obtain a digital copy of a chest x-ray.</li>
          <li>
            Upload the image by dragging and dropping or searching for the file.
          </li>
          <li>Click Analyze to see your results.</li>
          <li className="disclaimer">
            *All images and data are automatically deleted after analysis
          </li>
        </ol>
      </div>
      <div
        {...getRootProps({
          className: `dropzone ${files.length > 0 ? "no-border" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <>
            <p>Drag and Drop Image Here</p>
            <p>or</p>
            <button className="browse-btn">Browse Files</button>
          </>
        ) : (
          <img
            src={files[0].preview}
            alt={files[0].name}
            //style={{ width: "500px", height: "auto" }} // adjust the size as per your requirement
          />
        )}
      </div>
      {!result && !loading && (
        <button className="analyze-btn" onClick={handleSubmit}>
          Analyze
        </button>
      )}
      {loading && ( // Render the loading spinner when loading is true
        <div className="loading-container">
          <img src="/spinner.gif" alt="Loading..." />
        </div>
      )}
      {/* Display the result */}
      {result &&
        (() => {
          const { highlyLikely, possible, likelyRuledOut } =
            categorizePathologies(result);

          return (
            <div className="analysis-section full-width">
              {/* Section 1: Highly Likely */}
              <section className="results-section">
                <h4 className="categorie-title">Highly Likely:</h4>
                {highlyLikely.length > 0 ? (
                  <>
                    <p className="categorie-description">
                      These pathologies have at least an 80% likelihood of being
                      present.
                    </p>
                    <div className="results-grid">
                      {highlyLikely.map(({ condition, confidence }) => (
                        <div className="result-item" key={condition}>
                          <p className="condition-and-percentage">
                            {condition}: {(confidence * 100).toFixed(2)}%
                          </p>
                          <div className="percentage-bar">
                            <div
                              className="filled-bar"
                              style={{ width: `${confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="categorie-description">
                    There are no pathologies with a high likelihood of being
                    present.
                  </p>
                )}
              </section>

              {/* Section 2: Possible */}
              {possible.length > 0 && (
                <section className="results-section">
                  <h4 className="categorie-title">More testing needed:</h4>
                  <p className="categorie-description">
                    These pathologies could not be ruled out due to the high
                    sensitivity of this model.
                  </p>
                  <div className="results-grid">
                    {possible.map(({ condition, confidence }) => (
                      <div className="result-item" key={condition}>
                        <p className="condition-and-percentage">
                          {condition}: {(confidence * 100).toFixed(2)}%
                        </p>
                        <div className="percentage-bar">
                          <div
                            className="filled-bar"
                            style={{ width: `${confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 3: Likely Ruled Out */}
              <section className="results-section">
                <h4 className="categorie-title">Likely Ruled Out:</h4>
                {likelyRuledOut.length > 0 ? (
                  <>
                    <p className="categorie-description">
                      These pathologies are likely ruled out.
                    </p>
                    <div className="results-grid">
                      {likelyRuledOut.map(({ condition, confidence }) => (
                        <div className="result-item" key={condition}>
                          <p className="condition-and-percentage">
                            {condition}: {(confidence * 100).toFixed(2)}%
                          </p>
                          <div className="percentage-bar">
                            <div
                              className="filled-bar"
                              style={{ width: `${confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="categorie-description">
                    No pathologies could be ruled out.
                  </p>
                )}
              </section>
            </div>
          );
        })()}

      {/*}
      {result && (
        <div className="analysis-section">
          <h3 className="results-label">Analysis Results</h3>
          <div className="results-container">
            {console.log("Rendering result:", result)}{" "}
            {/* Check if the result is being passed correctly
            {Object.entries(result)
              .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort in descending order
              .map(([key, value]) => (
                <div className="result-item" key={key}>
                  <p className="condition-and-percentage">
                    {key}: {(value * 100).toFixed(2)}%
                  </p>
                  <div className="percentage-bar">
                    <div
                      className="filled-bar"
                      style={{ width: `${value * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      */}
    </div>
  );
};

export default AnalyzePage;
