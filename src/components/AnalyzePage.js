import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./AnalyzePage.css";

const AnalyzePage = () => {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);

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

    axios
      .post("http://localhost:3000/analyze", formData)
      .then((response) => {
        const analysisId = response.data.analysisId;
        axios
          .get(`http://localhost:3000/analysis/${analysisId}`)
          .then((resultResponse) => {
            setResult(resultResponse.data); // This assumes the returned data is your desired result.
          })
          .catch((error) => {
            console.error("Error fetching the analysis results:", error);
          });
      })
      .catch((error) => {
        console.error("Error during image upload:", error);
      });
  };

  console.log(result);

  return (
    <div className="container">
      <div className="how-it-works">
        <h2>How it works</h2>
        <ol className="no-numbers">
          <li>Take a picture or obtain a digital copy of your lung xray.</li>
          <li>
            Upload the image by dragging and dropping or searching for a file.
          </li>
          <li>Click Analyze to see your results.</li>
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
            style={{ width: "500px", height: "auto" }} // adjust the size as per your requirement
          />
        )}
      </div>
      {!result && (
        <button className="analyze-btn" onClick={handleSubmit}>
          Analyze
        </button>
      )}

      {/* Display the result */}
      {result && result.preds && (
        <div className="analysis-section">
          <h3 className="results-label">Analysis Results</h3>
          <div className="results-container">
            {Object.entries(result.preds)
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
    </div>
  );
};

export default AnalyzePage;
