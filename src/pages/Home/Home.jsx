import React, { useContext, useState } from "react";
import "./home.scss";
import InfoList from "../../components/InfoList/InfoList";
import AlbumCarousel from "../../components/AlbumCarousel/AlbumCarousel";
import PlaylistTiles from "../../components/PlaylistTiles/PlaylistTiles";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Loader from "../../components/Loader/Loader";
import HOC from "../../components/HOC/HOC";
const Home = () => {
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  function setLoaderState(state) {
    setLoader(state);
  }

  return (
    <div className="home">
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
  );
};
const HomeWrapped = () => {
  return <HOC children={<Home />} />;
};

export default HomeWrapped;
