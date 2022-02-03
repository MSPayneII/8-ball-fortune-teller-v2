import React, { useEffect } from "react";
import { EBLogo, EBAnswerCard } from "../../components";
import { useGlobalContext } from "../../context/globalContext";
import "./MagicEightball.css";

const MagicEightball = () => {
  const { isQuestionAsked } = useGlobalContext();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <figure className={`${isQuestionAsked ? "eightball shake " : "eightball"}`}>
      <div className="answer-display">
        <EBAnswerCard />
        <EBLogo />
      </div>
    </figure>
  );
};

export default MagicEightball;
