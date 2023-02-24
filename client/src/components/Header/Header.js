import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { FaAngleDown } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import mobileLogo from "../../assets/images/mobile-logo.svg";

import { MobileNav } from "../../components";

import "./Header.css";

const Header = ({ userName }) => {
  const { user, logOutUser, toggleMobileNav } = useGlobalContext();

  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  return (
    <header className="main-display-header">
      {/* <Logo className="main-display-logo-large" /> */}
      <button className="toggle-btn" onClick={toggleMobileNav}>
        <FiMenu />
      </button>

      <MobileNav />

      <img
        src={mobileLogo}
        className="main-display-logo-mobile"
        alt="mobile logo"
      />

      <h1 className="main-display-title">Main Display</h1>

      <div className="user-btn-container">
        <button
          className="btn profile-btn"
          onClick={() => setShowLogoutBtn(!showLogoutBtn)}
        >
          {user.name} <FaAngleDown className="small-icon" />
        </button>
        <button
          className={`${
            showLogoutBtn
              ? "btn logout-btn logout-delete-account-btn-colors"
              : "btn hide-logout-btn"
          }`}
          onClick={logOutUser}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
