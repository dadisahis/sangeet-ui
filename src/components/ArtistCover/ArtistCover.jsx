import React, { useContext } from "react";
import { trackContext } from "../../context/trackContext";
import "./artistcover.scss";

function ArtistCover({ open }) {
  const { audioImg } = useContext(trackContext);
  return (
    <div className="artistCover">
      <div
        className={
          open ? "artistCover_container open" : "artistCover_container"
        }
      >
        <img src={audioImg} alt="" />
      </div>
    </div>
  );
}

export default ArtistCover;
