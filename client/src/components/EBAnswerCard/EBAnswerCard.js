import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import "./EBAnswerCard.css";

const EBAnswerCard = ({ text }) => {
  const { isQuestionAsked, fortune } = useGlobalContext();

  return (
    <div
      className={`${isQuestionAsked ? "answer-card fade-in " : "answer-card"}`}
    >
      <p className="answer-card-text">{fortune}</p>
    </div>
  );
};

export default EBAnswerCard;
