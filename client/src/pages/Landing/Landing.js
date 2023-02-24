import React from "react";
import { Link } from "react-router-dom";

import landingimage from "../../assets/images/customlandingpage.svg";
import "./Landing.css";

const Landing = () => {
  return (
    <main className="container">
      <nav></nav>

      <div className="container page">
        <div className="details">
          <img
            src={landingimage}
            alt="landing page"
            className="img landing-img"
          />
          <h1>Want to know your fortune?</h1>

          <p>
            Login/register for an account and ask the 8-Ball Fortune Teller a
            yes or no question. Concentrate on your question and see what your
            future holds.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
