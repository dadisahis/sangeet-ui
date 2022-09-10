import React, { useContext, useState } from "react";
import { trackContext } from "../../context/trackContext";
import "./likedsongs.scss";
import { useEffect } from "react";
import { getTracks } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import Playlist from "../../components/Playlist/Playlist";
function LikedSongs() {
  const { state: tracks } = useContext(trackContext);
  const { user } = useContext(AuthContext);
  const [trackList, setTrackList] = useState(null);
  const getTrackList = () => {
    const data = getTracks({ liked_by: user._id });
    data.then((track) => {
      setTrackList({
        type: "Playlist",
        name: "Liked Songs",
        tracks: track,
      });
    });
  };
  useEffect(() => {
    getTrackList();
  }, [trackList]);
  return (
    <div
      className="likedSongs"
      style={{ height: tracks[0].name ? `calc(100vh - 80px)` : "100vh" }}
    >
      <Playlist
        playlistObj={trackList}
        getTracks={getTrackList}
        isCustom={false}
      />
    </div>
  );
}

export default LikedSongs;
