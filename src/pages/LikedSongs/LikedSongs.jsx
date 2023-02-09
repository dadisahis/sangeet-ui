import React, { useCallback, useContext, useState } from "react";
import { trackContext } from "../../context/trackContext";
import "./likedsongs.scss";
import { useEffect } from "react";
import { getTracks } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import Playlist from "../../components/Playlist/Playlist";
import Loader from "../../components/Loader/Loader";
function LikedSongs() {
  const { state: tracks } = useContext(trackContext);
  const { user } = useContext(AuthContext);
  const [trackList, setTrackList] = useState(null);
  let screenSize = window.screen.width;
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
  }, []);
  return (
    <div
      className="likedSongs"
      style={{
        height:
          tracks.len > 0 && tracks[0].name && screenSize < 750
            ? `calc(100vh - 140px)`
            : tracks[0].name || screenSize < 750
            ? `calc(100vh-80px)`
            : "100vh",
      }}
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
