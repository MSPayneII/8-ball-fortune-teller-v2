import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components";
import landingimage from "../../assets/images/customlandingpage.svg";
import "./Landing.css";

const Landing = () => {
  return (
    <main className="container">
      <nav>{/* <Logo className="logo" /> */}</nav>

      <div className="container page">
        <div className="details">
          <img
            src={landingimage}
            alt="landing page"
            className="img landing-img"
          />
          <h1>Want to know your fortune?</h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            atque consequatur hic est nam aspernatur dolor magni iste suscipit
            molestias?
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
