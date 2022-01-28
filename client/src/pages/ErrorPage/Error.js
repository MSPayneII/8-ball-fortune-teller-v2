import React from "react";
import { Link } from "react-router-dom";
import pageErrorImg from "../../assets/images/undraw_page_not_found.svg";
import "./Error.css";

const Error = () => {
  return (
    <main className="full-page error-page-container">
      <div>
        <img
          src={pageErrorImg}
          alt="page not found error"
          className="error-page-img"
        />
        <h1 className="error-page-title">Sorry, we cannot find that page!</h1>
        <Link to="/">Back Home</Link>
      </div>
    </main>
  );
};

export default Error;
