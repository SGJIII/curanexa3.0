import React, { Component } from "react";
import axios from "axios";

class AnalyzePage extends Component {
  state = {
    selectedFile: null,
    analysisResult: null,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.selectedFile);

    axios
      .post("http://localhost:3000/analyze", formData)
      .then((response) => {
        console.log(response.data);
        this.setState({ analysisResult: response.data.results });
        // Redirect to AnalysisPage with the analysis results
        this.props.history.push("/Analysis", {
          analysisResult: this.state.analysisResult,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        {
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              background: "white",
            }}
          >
            <div
              style={{
                width: 793,
                height: 362,
                left: 629,
                top: 176,
                position: "absolute",
                background: "#C2EAEF",
                border: "1px #10A3A7 dotted",
              }}
            />
            <div
              style={{
                width: 280,
                height: 853,
                left: 0,
                top: 129,
                position: "absolute",
                background: "white",
              }}
            />
            <div
              style={{
                width: 235,
                height: 514,
                left: 319,
                top: 176,
                position: "absolute",
              }}
            >
              <span
                style={{
                  color: "black",
                  fontSize: 36,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                How it works. <br />
              </span>
              <span
                style={{
                  color: "black",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                <br />
              </span>
              <span
                style={{
                  color: "black",
                  fontSize: 24,
                  fontFamily: "Roboto Flex",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                Take a picture or obtain a digital copy of your lung xray.
                <br />
                Upload the image by dragging and dropping or searching for a
                file.
                <br />
                Click Analyze to see your results
              </span>
            </div>
            <div
              style={{
                width: 90,
                height: 90,
                left: 981,
                top: 220,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 84.01,
                  height: 84,
                  left: 3,
                  top: 6,
                  position: "absolute",
                  background: "#848484",
                }}
              ></div>
            </div>
            <div
              style={{
                width: 486,
                height: 37,
                left: 783,
                top: 331,
                position: "absolute",
                textAlign: "center",
                color: "black",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Drag and Drop Image Here
            </div>
            <div
              style={{
                width: 486,
                height: 37,
                left: 783,
                top: 376,
                position: "absolute",
                textAlign: "center",
                color: "black",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              or
            </div>
            <div
              style={{
                width: 169,
                height: 43,
                left: 937,
                top: 452,
                position: "absolute",
                border: "2px #10A3A7 solid",
              }}
            />
            <div
              style={{
                width: 27,
                height: 27,
                left: 1362,
                top: 32,
                position: "absolute",
                background: "#D9D9D9",
                borderRadius: 9999,
              }}
            />
            <div
              style={{
                width: 75,
                height: 22,
                left: 1400,
                top: 37,
                position: "absolute",
                color: "black",
                fontSize: 12,
                fontFamily: "Inter",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              User
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                left: 47,
                top: 30,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "#D9D9D9",
                  borderRadius: 9999,
                }}
              />
              <img
                style={{
                  width: 170.16,
                  height: 170.16,
                  left: -57,
                  top: -44.7,
                  position: "absolute",
                }}
                src="https://via.placeholder.com/170x170"
                alt="profile"
              />
            </div>
            <div
              style={{
                width: 200,
                height: 53,
                left: 119,
                top: 33,
                position: "absolute",
                color: "black",
                fontSize: 30,
                fontFamily: "Inter",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              CuraNexa
            </div>
            <div
              style={{
                width: 106,
                height: 22,
                left: 970,
                top: 463,
                position: "absolute",
                color: "#10A3A7",
                fontSize: 19,
                fontFamily: "Roboto Flex",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Browse Files
            </div>
            <div
              style={{
                width: 1512,
                height: 0,
                left: 0,
                top: 109,
                position: "absolute",
                border: "1px #DDDDDD solid",
              }}
            ></div>
            <div
              style={{
                width: 873,
                height: 0,
                left: 289,
                top: 109,
                position: "absolute",
                transform: "rotate(90deg)",
                transformOrigin: "0 0",
                border: "1px #DDDDDD solid",
              }}
            ></div>
            <div
              style={{
                width: 150,
                height: 26,
                left: 336,
                top: 50,
                position: "absolute",
              }}
            >
              <span
                style={{
                  color: "#BABABA",
                  fontSize: 12,
                  fontFamily: "Roboto Flex",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                User &gt;{" "}
              </span>
              <span
                style={{
                  color: "#908C8C",
                  fontSize: 12,
                  fontFamily: "Roboto Flex",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                Analyze
              </span>
            </div>
            <div
              style={{
                width: 248,
                height: 49,
                left: 912,
                top: 600,
                position: "absolute",
                background: "#10A3A7",
                borderRadius: 32,
              }}
            />
            <div
              style={{
                width: 112,
                height: 20,
                left: 982,
                top: 615,
                position: "absolute",
                textAlign: "center",
                color: "white",
                fontSize: 21,
                fontFamily: "Roboto Flex",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Analyze
            </div>
            <div
              style={{
                width: 105,
                height: 21,
                left: 93,
                top: 208,
                position: "absolute",
                color: "black",
                fontSize: 15,
                fontFamily: "Roboto Flex",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Analyze
            </div>
            <div
              style={{
                width: 105,
                height: 21,
                left: 93,
                top: 254,
                position: "absolute",
                color: "black",
                fontSize: 15,
                fontFamily: "Roboto Flex",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Images
            </div>
            <div
              style={{
                width: 27,
                height: 20,
                left: 49,
                top: 252,
                position: "absolute",
                background: "#10A3A7",
              }}
            ></div>
            <div
              style={{
                width: 28,
                height: 28,
                left: 49,
                top: 204,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "#10A3A7",
                }}
              ></div>
            </div>
          </div>
        }
        <form onSubmit={this.onFormSubmit}>
          <input type="file" onChange={this.onFileChange} />
          <button type="submit">Analyze</button>
        </form>
      </div>
    );
  }
}

export default AnalyzePage;
