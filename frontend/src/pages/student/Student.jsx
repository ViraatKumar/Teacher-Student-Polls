import React, { useState, useEffect } from "react";
import { socket } from "../../socket.js";
import PollingResults from "../Results/PollingResults.js";
import Chat from "../../components/Chat.js";
import "./student.css";

export const Student = () => {
  const [name, setName] = useState(null);
  const [isNamed, setIsNamed] = useState(false);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleQuestions = (data) => {
      if (data.question && data.options) {
        setQuestion(data.question);
        setOptions(data.options);
        setSelectedOptions(new Array(data.options.length).fill(false)); // Reset selected option for new question
      }
    };

    const handleResults = (data) => {
      setResults(data.results);
    };

    socket.on("test-question", handleQuestions);
    socket.on("poll-results", handleResults);

    return () => {
      socket.off("test-question", handleQuestions);
      socket.off("poll-results", handleResults);
    };
  }, []);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleOptionChange = (index) => {
    const newSelections = [...selectedOptions];
    newSelections[index] = !newSelections[index];
    setSelectedOptions(newSelections);
  };
  const submitName = () => {
    setIsNamed(true);
  };
  const handleSubmit = () => {
    let isCorrect = true;

    options.forEach((option, index) => {
      if (option.isCorrect !== selectedOptions[index]) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      console.log("Right answer");
      alert("Right answer");
    } else {
      console.log("Wrong answer");
      alert("Wrong answer");
    }

    // socket.emit("submit-answer", {
    //   question,
    //   selectedOptions,
    // });
  };

  return (
    <div>
      {isNamed ? (
        <div className="container">
          <Chat name={name} />
          {question ? (
            <div>
              <h1 className="question">Q. {question}</h1>
              <div className="options-container">
                {options.map((option, index) => (
                  <div key={index} className="option">
                    <input
                      type="checkbox"
                      checked={selectedOptions[index]}
                      onChange={() => handleOptionChange(index)}
                    />
                    <label>{option.value}</label>
                  </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          ) : (
            <h3>Waiting for Teacher to ask question..</h3>
          )}

          {results.length > 0 && <PollingResults results={results} />}
        </div>
      ) : (
        <div>
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="Enter your name..."
          />
          <button onClick={submitName}> Continue...</button>
        </div>
      )}
    </div>
  );
};
