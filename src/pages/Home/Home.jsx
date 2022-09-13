import React, { useContext, useState } from "react";
import "./home.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Soundbar from "../../components/Soundbar/Soundbar";
import InfoList from "../../components/InfoList/InfoList";
import AlbumCarousel from "../../components/AlbumCarousel/AlbumCarousel";
import PlaylistTiles from "../../components/PlaylistTiles/PlaylistTiles";
import { trackContext } from "../../context/trackContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Loader from "../../components/Loader/Loader";
function Home() {
  const { user } = useContext(AuthContext);
  const { state: tracks, dispatch } = useContext(trackContext);
  const [loader, setLoader] = useState(false);
  function setLoaderState(state) {
    setLoader(state);
  }
  console.log(loader);
  return (
    <div
      className="home"
      style={{ height: tracks[0].name ? `calc(100vh - 80px)` : "100vh" }}
    >
      <div className="home_wrapper">
        <div className="home_top">
          <Navbar />
        </div>
        <div className="home_container">
          <Sidebar />
          {!loader ? (
            <div className="home_container_right">
              <AlbumCarousel setLoaderState={setLoaderState} />
              {user ? (
                <div className="playlist_container">
                  <Link to="/liked-songs">
                    <PlaylistTiles
                      background="linear-gradient(50deg, #ff1e00 1%, #ff1e00 25%, white 150%)"
                      textColor="#f79da9"
                      title="Liked Songs"
                    />
                  </Link>
                  <Link to="/list-playlist">
                    <PlaylistTiles
                      background="linear-gradient(50deg, #3FA796 1%, #3FA796 25%, white 150%)"
                      textColor="#95e5db"
                      title="Your Playlists"
                    />
                  </Link>
                </div>
              ) : null}
              <InfoList />
            </div>
          ) : (
            <div className="loader_container">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="home_bottom">{tracks[0].name && <Soundbar />}</div>
    </div>
  );
}

export default Home;
