import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./hoc.scss";

const HOC = ({ children }) => {
  return (
    <div className="container">
      <div className="top_wrapper">
        <div className="top_Container">
          <Navbar />
        </div>
        <div className="middle_container">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default HOC;
