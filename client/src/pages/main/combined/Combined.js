import React from "react";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../../../context/globalContext";
import { Header } from "../../../components";

const Combined = () => {
  const { user } = useGlobalContext();

  return (
    <main>
      <div>
        <Header />
      </div>

      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Combined;
