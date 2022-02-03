import React, { useState, useEffect } from "react";
import { MagicEightball, FormInput, Alert } from "../../../components";
import { GiEightBall } from "react-icons/gi";
import "./EightballDisplay.css";
import { useGlobalContext } from "../../../context/globalContext";

const Eightball = () => {
  const {
    user,
    showAlert,
    displayAlert,
    getFortune,
    isQuestionAsked,
    resetIsQuestionAsked,
  } = useGlobalContext();
  const [userQuestion, setUserQuestion] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const checkSize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleChange = (e) => {
    setUserQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userQuestion) {
      displayAlert();
      return;
    }

    getFortune(userQuestion, user);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);

    const showAnswerTimer = setTimeout(() => {
      resetIsQuestionAsked();
    }, 7000);
    return () => {
      window.removeEventListener("resize", checkSize);

      clearTimeout(showAnswerTimer);
    };
  }, [isQuestionAsked, resetIsQuestionAsked]);

  return (
    <main className="eightball-display">
      {showAlert && <Alert />}

      <label htmlFor="Question" className="user-question-input-label">
        Question
      </label>

      <div className="user-question-container">
        <FormInput
          type="text"
          name=""
          value={userQuestion}
          handleChange={handleChange}
          placeholder={"Enter Question Here"}
          userQuestionInput={true}
        />
        <button
          className={
            isQuestionAsked
              ? "btn user-question-btn btn-disabled"
              : "btn user-question-btn"
          }
          onClick={handleSubmit}
          disabled={isQuestionAsked}
        >
          {screenWidth < 992 ? (
            <GiEightBall className="submit-question-icon" />
          ) : (
            "Submit"
          )}
        </button>
      </div>

      <MagicEightball />
    </main>
  );
};

export default Eightball;
