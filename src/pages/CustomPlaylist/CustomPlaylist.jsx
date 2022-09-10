import React, { useState } from "react";
import "./customplaylist.scss";
import { useEffect } from "react";
import { getPlaylistById } from "../../api/api";
import Playlist from "../../components/Playlist/Playlist";
function CustomPlaylist() {
  const id = window.location.pathname.split("/")[2];
  const [playlist, setPlaylist] = useState(null);
  const getPlaylist = (id) => {
    const data = getPlaylistById(id);
    data.then((track) => {
      setPlaylist(track);
    });
  };
  useEffect(() => {
    getPlaylist(id);
  }, []);
  return (
    <div className="customPlaylist">
      <Playlist
        playlistObj={playlist}
        getTracks={getPlaylist}
        isCustom={true}
        id={id}
      />
    </div>
  );
}

export default CustomPlaylist;
