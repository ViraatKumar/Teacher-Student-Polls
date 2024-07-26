import React, { useState } from "react";
import Chat from "../../components/Chat";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import "./teacher.css";
export const Teacher = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ value: "", isCorrect: false }]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionAdd = () => {
    setOptions([...options, { value: "", isCorrect: false }]);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].value = event.target.value;
    setOptions(newOptions);
    setSelectedOption(index);
  };

  const handleCorrectChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = event.target.checked;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ question, options });
    socket.emit("question", { question, options });
    // Add your submit logic here
  };

  return (
    <div className="container">
      <Chat name="teacher" />
      <div className="question">
        <label>Enter Questions and Options</label>
        <br />
        <textarea
          onChange={handleQuestion}
          type="text"
          placeholder="Enter..."
          value={question}
        />
      </div>
      <div className="options">
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Is it Correct</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="questions"
                    onChange={(e) => handleCorrectChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleOptionAdd}>Add another Option +</button>
        <button onClick={handleSubmit}>Ask Question</button>
      </div>
    </div>
  );
};
