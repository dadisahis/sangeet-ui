import React, { useState, useContext, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./contextmenu.scss";
import { AuthContext } from "../../context/authContext";
import { getPlaylists } from "../../api/api";
import { updatePlaylist } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContextMenu({ songInfo, handleAddToQueue, handlePlayNext }) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [playlistList, setPlaylistList] = useState([]);
  const getPlaylistList = () => {
    const data = getPlaylists({ user_id: user._id });
    data.then((list) => {
      setPlaylistList(list);
    });
  };
  const handleAddToPlaylist = (songInfo, playList) => {
    const isTrackPresent = () => {
      if (playList.tracks.some((item) => item._id === songInfo._id)) {
        return true;
      } else {
        return false;
      }
    };
    if (!isTrackPresent()) {
      const playlistInfo = {
        ...playList,
        tracks: [...playList.tracks, songInfo],
      };
      const data = updatePlaylist(playlistInfo, playList._id);
      data.then(() => {
        toast(`Added ${songInfo.name} to ${playList.name}!`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
    } else {
      toast(`Song ${songInfo.name} is already there in ${playList.name}!`, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "toast_notification",
      });
    }
  };
  useEffect(() => {
    getPlaylistList();
  }, []);
  return (
    <div className="more_options" onClick={() => setOpen(!open)}>
      <MoreHorizIcon />
      {open ? (
        <div className="options_container">
          <div
            className="option"
            onMouseOver={() => {
              setOpenPlaylist(true);
            }}
            onMouseOut={() => {
              setOpenPlaylist(false);
            }}
          >
            <p>Add to playlist</p>
            {openPlaylist ? (
              <div className="playlist_options_container">
                {playlistList &&
                  playlistList.map((playlist) => (
                    <div
                      className="playlist_option"
                      onClick={() => {
                        handleAddToPlaylist(songInfo, playlist);
                      }}
                    >
                      <p>{playlist.name}</p>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
          <div
            className="option"
            onClick={() => {
              handleAddToQueue(songInfo);
            }}
          >
            <p>Add to queue</p>
          </div>
          <div
            className="option"
            onClick={() => {
              handlePlayNext(songInfo);
            }}
          >
            <p>Play next</p>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default ContextMenu;
