import React, { useCallback, useContext, useState } from "react";
import { trackContext } from "../../context/trackContext";
import "./likedsongs.scss";
import { useEffect } from "react";
import { getTracks } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import Loader from "../../components/Loader/Loader";
import PlaylistWrapped from "../../components/Playlist/Playlist";
function LikedSongs() {
  const { state: tracks } = useContext(trackContext);
  const { user } = useContext(AuthContext);
  let screenSize = window.screen.width;
  return (
    <div className="likedSongs">
      <PlaylistWrapped isCustom={false} />
    </div>
  );
}

export default LikedSongs;
