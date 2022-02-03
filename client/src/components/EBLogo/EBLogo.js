import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import "./EBLogo.css";

const EBLogo = () => {
  const { isQuestionAsked } = useGlobalContext();
  return (
    <div
      className={`${
        isQuestionAsked
          ? "eb-logo-container eb-logo-fade-out"
          : "eb-logo-container eb-logo-fade-in"
      }`}
    >
      <p className="eb-logo-number">8</p>
    </div>
  );
};

export default EBLogo;
