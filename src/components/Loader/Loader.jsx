import React from "react";
import { Audio } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader_audio">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#C3F8FF"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

export default Loader;
