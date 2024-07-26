import React from "react";
import "./PollingResults.css";

const PollingResults = ({ results }) => {
  return (
    <div className="results-container">
      <h2>Polling results</h2>
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <div className="result-option">
            <span>{result.option}</span>
            <span>{result.percentage}%</span>
          </div>
          <div
            className="result-bar"
            style={{ width: `${result.percentage}%` }}
          ></div>
        </div>
      ))}
      <div className="waiting-message">Waiting for new answer</div>
    </div>
  );
};

export default PollingResults;
