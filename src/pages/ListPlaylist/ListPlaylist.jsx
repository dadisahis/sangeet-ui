import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../../api/api";
import InfoCard from "../../components/InfoCard/InfoCard";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Soundbar from "../../components/Soundbar/Soundbar";
import { AuthContext } from "../../context/authContext";
import { trackContext } from "../../context/trackContext";
import "./listplaylist.scss";

function ListPlaylist() {
  const { user } = useContext(AuthContext);
  const { state: tracks, dispatch } = useContext(trackContext);
  const [playlistList, setPlaylistList] = useState([]);
  const getPlaylistList = () => {
    const data = getPlaylists({ user_id: user._id });
    data.then((list) => {
      setPlaylistList(list);
    });
  };
  useEffect(() => {
    getPlaylistList();
  }, []);
  return (
    <div
      className="listPlaylist"
      style={{ height: tracks[0].name ? `calc(100vh - 80px)` : "100vh" }}
    >
      <div className="listPlaylist_wrapper">
        <div className="listPlaylist_top">
          <Navbar />
        </div>
        <div className="listPlaylist_container">
          <Sidebar />
          {playlistList.length > 0 ? (
            <div className="listPlaylist_container_right">
              <h1>Playlists</h1>
              <div className="list_container">
                {playlistList.map((item) => (
                  <Link to={`/playlist/${item._id}`}>
                    <InfoCard data={item} />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="loader_container">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="listPlaylist_bottom">
        {tracks[0].name && <Soundbar />}
      </div>
    </div>
  );
}

export default ListPlaylist;
