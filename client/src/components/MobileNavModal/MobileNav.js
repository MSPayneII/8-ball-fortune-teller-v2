import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { FaTimes } from "react-icons/fa";
import { NavLinks } from "../../components";
import { Logo } from "../../components";
import "./MobileNav.css";

const MobileNav = () => {
  const { isMobileNavOpen, toggleMobileNav } = useGlobalContext();
  return (
    <div
      className={`${isMobileNavOpen ? "nav-overlay show-nav" : "nav-overlay"}`}
    >
      <div className="nav-container">
        <button className="close-nav-btn" onClick={toggleMobileNav}>
          <FaTimes />
        </button>
        <Logo className="mobile-nav-logo" />
        <NavLinks toggleMobileNav={toggleMobileNav} />
      </div>
    </div>
  );
};

export default MobileNav;
