import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./AnalyzePage.css";

const AnalyzePage = () => {
  console.log("Component rendering"); // This will log every time the component renders

  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);

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

    axios
      .post(
        "https://gentle-springs-57358-d1f77df02123.herokuapp.com/analyze",
        formData
      )
      .then((response) => {
        const parsedData = JSON.parse(response.data); // Parse the response text as JSON
        setResult(parsedData.preds); // Handle analysis results directly
        console.log("Result set:", parsedData.preds); // Check if the result is being set correctly
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
            //style={{ width: "500px", height: "auto" }} // adjust the size as per your requirement
          />
        )}
      </div>
      {!result && (
        <button className="analyze-btn" onClick={handleSubmit}>
          Analyze
        </button>
      )}

      {/* Display the result */}

      {result && (
        <div className="analysis-section">
          <h3 className="results-label">Analysis Results</h3>
          <div className="results-container">
            {console.log("Rendering result:", result)}{" "}
            {/* Check if the result is being passed correctly*/}
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
    </div>
  );
};

export default AnalyzePage;
