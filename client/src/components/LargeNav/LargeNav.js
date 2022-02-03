import React from "react";
import { Logo, NavLinks } from "../../components";
import "./LargeNav.css";

const LargeNav = () => {
  const largeScreen = true;
  return (
    <div className="largeNav-container">
      <header>
        <Logo className="nav-logo" />
      </header>

      <NavLinks largeScreen={largeScreen} />
    </div>
  );
};

export default LargeNav;
