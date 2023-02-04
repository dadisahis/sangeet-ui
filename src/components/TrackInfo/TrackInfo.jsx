import React from "react";
import { useEffect, useContext, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContextMenu from "../ContextMenu/ContextMenu";
import { AuthContext } from "../../context/authContext";
import { trackContext } from "../../context/trackContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./trackinfo.scss";

function TrackInfo({
  trackList,
  showTitles,
  handleLikedSongs,
  playlists,
  title,
}) {
  const { state: tracks, dispatch } = useContext(trackContext);
  const { user } = useContext(AuthContext);

  const [openOptions, setOpenOptions] = useState(
    new Array(trackList.length).fill(false)
  );
  const handleClick = (item) => {
    dispatch({ type: "CHANGE_TRACK", payload: [item] });
  };

  const handleAddToQueue = (item) => {
    tracks.push(item);
    dispatch({ type: "ADD_TO_QUEUE", payload: tracks });
  };
  const handlePlayNext = (item) => {
    tracks.splice(1, 0, item);
    dispatch({ type: "PLAY_NEXT", payload: tracks });
  };

  return (
    <div className="trackInfo_container">
      {showTitles ? (
        <h3 className="popular_tracks_title">
          {" "}
          {title ? title : "Popular Tracks by the artist"}
        </h3>
      ) : null}
      <table className="tracktable_container">
        {/* {showTitles ? (
          <thead className="track_container">
            <td width={290}>
              <p className="table_header">Song</p>
            </td>
            <td width={105}>
              <p className="table_header">Total Plays</p>
            </td>
            <td width={130}>
              <p className="table_header">Time</p>
            </td>
            <td width={300}>
              <p className="table_header">Album</p>
            </td>
          </thead>
        ) : null} */}
        {trackList.map((item, index) => (
          <tr
            className={
              index % 2 === 0 ? "track_container even" : "track_container"
            }
            onClick={() => handleClick(item)}
            key={index}
          >
            <td className="table_data">
              <div className="trackName">
                {item.albums.length > 0 ? (
                  <img src={item.albums[0].album_image} alt="" />
                ) : (
                  <img
                    src="https://economictimes.indiatimes.com/thumb/msid-73612807,width-1200,height-900,resizemode-4,imgsize-212384/vinyl-records_istock.jpg?from=mdr"
                    alt=""
                  />
                )}
                <div className="track_details">
                  <p>{item.name}</p>
                  {item.artists.length > 0 ? (
                    <p className="track_artist_name">
                      {item.artists[0].artist_name}
                    </p>
                  ) : null}
                </div>
              </div>
            </td>

            <td className="table_data medium small">
              <p>{`${item.total_plays.toLocaleString("en-US")}`}</p>
            </td>

            <td className="table_data small">
              <p>{item.duration}</p>
            </td>
            {item.albums.length > 0 ? (
              <td className="table_data small">
                <div className="trackName">
                  <p>{item.albums[0].album_name}</p>
                </div>
              </td>
            ) : null}
            {user ? (
              <>
                <td className="table_data">
                  <div
                    className={
                      item.liked_by && user && item.liked_by.includes(user._id)
                        ? "liked_component true"
                        : "liked_component"
                    }
                    onClick={() => {
                      handleLikedSongs(item);
                    }}
                  >
                    <FavoriteIcon />
                  </div>
                </td>
                <td className="table_data">
                  <ContextMenu
                    songInfo={item}
                    handleAddToQueue={handleAddToQueue}
                    handlePlayNext={handlePlayNext}
                  />
                </td>
              </>
            ) : null}
          </tr>
        ))}
      </table>
      <ToastContainer />
    </div>
  );
}

export default TrackInfo;
