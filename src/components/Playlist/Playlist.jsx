import React, { useContext, useEffect, useState } from "react";
import { trackContext } from "../../context/trackContext";
import { AuthContext } from "../../context/authContext";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import TrackInfo from "../../components/TrackInfo/TrackInfo";
import "./playlist.scss";
import {
  deletePlaylist,
  updateTracks,
  getPlaylistById,
  getTracks,
  getTrackObject,
} from "../../api/api";
import Soundbar from "../../components/Soundbar/Soundbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import { Delete } from "@mui/icons-material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
function Playlist({ isCustom, id }) {
  const { state: tracks, dispatch } = useContext(trackContext);
  const { user } = useContext(AuthContext);
  const [playlistObj, setPlaylistObj] = useState(null);
  let screenSize = window.screen.width;
  const navigate = useNavigate();

  const handleAddToQueue = () => {
    let trackList = [];
    playlistObj.tracks.forEach((item) => {
      const audioURL = getTrackObject(item.trackObject);
      item = { ...item, trackObject: audioURL };
      trackList.push(item);
    });

    dispatch({
      type: "ADD_TO_QUEUE",
      payload: trackList,
    });
  };

  const getLikedSongs = () => {
    const data = getTracks({ liked_by: user._id });
    data.then((track) => {
      setPlaylistObj({
        type: "Playlist",
        name: "Liked Songs",
        tracks: track,
      });
    });
  };
  const getPlaylist = (id) => {
    const data = getPlaylistById(id);
    data.then((track) => {
      setPlaylistObj(track);
    });
  };

  const handleDeletePlaylist = (id) => {
    const data = deletePlaylist(id);
    data.then(() => {
      navigate("/list-playlist");
    });
  };
  const handleLikedSongs = (item) => {
    if (item.liked_by === null || !item.liked_by.includes(user._id)) {
      const data = updateTracks(
        {
          ...item,
          liked_by: [...item.liked_by, user._id],
        },
        item._id
      );
      data.then((i) => {
        toast("Added to liked songs!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
    } else {
      const updated_liked_by = item.liked_by.filter((i) => {
        return i !== user._id;
      });
      const data = updateTracks(
        {
          ...item,
          liked_by: updated_liked_by,
        },
        item._id
      );
      data.then((i) => {
        toast("Removed from liked songs!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
    }
    if (isCustom) {
      getTracks(id);
    } else {
      getTracks();
    }
  };

  useEffect(() => {
    if (isCustom) {
      getPlaylist(id);
    } else {
      getLikedSongs();
    }
  }, []);
  return (
    <div
      className="playlist"
      style={{
        height:
          tracks[0].name && screenSize < 750
            ? `calc(100vh - 140px)`
            : tracks[0].name || screenSize < 750
            ? `calc(100vh-80px)`
            : "100vh",
      }}
    >
      <div className="playlist_wrapper">
        <div className="playlist_top">
          <Navbar />
        </div>
        <div className="playlist_container">
          <Sidebar />
          {playlistObj ? (
            <div className="playlist_right_container">
              <div className="right_top">
                {playlistObj.images && playlistObj.images.length > 0 ? (
                  <img src={playlistObj.images[0].url} alt="" />
                ) : (
                  <img
                    src="https://preview.redd.it/rnqa7yhv4il71.jpg?width=960&crop=smart&auto=webp&s=0d197ae907b165bf2c169a9d8f64f5564556fee5"
                    alt=""
                  />
                )}
                <div className="playlist_title_container">
                  <h3>{playlistObj.type.split("_").join(" ")}</h3>
                  <h1>{playlistObj.name}</h1>
                  <p>{playlistObj.tracks.length} songs</p>
                </div>
                <div className="button_container">
                  <div
                    className="button play"
                    onClick={() => handleAddToQueue()}
                  >
                    <PlayArrow />
                  </div>
                  {isCustom && (
                    <div
                      className="button delete"
                      onClick={() => handleDeletePlaylist(playlistObj._id)}
                    >
                      <Delete />
                    </div>
                  )}
                </div>
              </div>
              <div className="right_bottom">
                {playlistObj.tracks.length > 0 ? (
                  <TrackInfo
                    trackList={playlistObj.tracks}
                    showTitles={false}
                    handleLikedSongs={handleLikedSongs}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <div className="loader_container">
              <Loader />
            </div>
          )}
        </div>
      </div>

      <div className="playlist_bottom">
        {tracks[0].name ? (
          <>
            <Soundbar />
          </>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Playlist;
