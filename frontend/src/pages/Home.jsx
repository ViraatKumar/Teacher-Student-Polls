import React from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";
export const Home = () => {
  const navigate = useNavigate();
  const handleUserSelect = (path) => {
    navigate(path);
  };
  return (
    <div className="container">
      <h1>Select what type of user you are</h1>
      <div className="choose-user">
        <button
          onClick={() => {
            handleUserSelect("/student");
          }}
          className="user-button"
        >
          Student
        </button>
        <button
          onClick={() => {
            handleUserSelect("/teacher");
          }}
          className="user-button"
        >
          Teacher
        </button>
      </div>
    </div>
  );
};
