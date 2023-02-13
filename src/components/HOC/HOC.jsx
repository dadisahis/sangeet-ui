import React, { useContext, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Soundbar from "../../components/Soundbar/Soundbar";
import { trackContext } from "../../context/trackContext";
import "./hoc.scss";

const HOC = ({ children }) => {
  const { state: tracks } = useContext(trackContext);
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
      <div className="bottom_container">
        {tracks && tracks[0].name ? <Soundbar /> : null}
      </div>
    </div>
  );
};

export default HOC;
