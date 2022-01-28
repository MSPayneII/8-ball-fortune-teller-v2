import React from "react";
import { useGlobalContext } from "../context/globalContext";

const Alert = () => {
  // bring in my global functions
  const { alertType, alertText } = useGlobalContext();

  //the type of alert dynamically changes based on the global state of showAlert
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
