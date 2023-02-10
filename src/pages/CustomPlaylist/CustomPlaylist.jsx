import React, { useState } from "react";
import "./customplaylist.scss";
import { useEffect } from "react";

import Playlist from "../../components/Playlist/Playlist";
function CustomPlaylist() {
  const id = window.location.pathname.split("/")[2];

  return (
    <div className="customPlaylist">
      <Playlist isCustom={true} id={id} />
    </div>
  );
}

export default CustomPlaylist;
