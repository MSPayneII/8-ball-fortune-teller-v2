import React from "react";
import { Link } from "react-router-dom";
import { links } from "../../utils/mainLinks";
import "./NavLinks.css";

const NavLinks = ({ toggleMobileNav, largeScreen }) => {
  return (
    <div>
      <ul className="links">
        {links.map((link) => {
          const { id, path, text, icon } = link;

          return (
            <li key={id}>
              <Link
                to={path}
                onClick={toggleMobileNav}
                className={`${largeScreen ? "link largeScreenMargin" : "link"}`}
              >
                {icon}
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavLinks;
