import React from "react";
import { Outlet } from "react-router-dom";

import { Header, LargeNav } from "../../../components";
import "./Combined.css";

const Combined = () => {
  return (
    <main className="combined">
      <LargeNav />

      <div className="combined-layout">
        <div>
          <Header />
          <div className="individual-page">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Combined;
