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
import { getTrackObject } from "../../api/api";
import { useEffect } from "react";
function Home() {
  const { user } = useContext(AuthContext);
  const { state: tracks } = useContext(trackContext);
  const [loader, setLoader] = useState(false);
  const [audio, setAudio] = useState(null);
  let screenSize = window.screen.width;
  function setLoaderState(state) {
    setLoader(state);
  }
  const downloadAudio = async () => {
    const data = getTrackObject("63e3b481a82c636650eb7d2a");
    data.then((audioData) => {
      console.log(audioData[0]);
      // var raw = window.atob(audio);
      // var arr = new Uint8Array(new ArrayBuffer(audio.length));
      // for (var i = 0; i < audio.length; i++) {
      //   arr[i] = raw.charCodeAt(i);
      // }
      // let blob = new Blob([arr], { type: "audio/mp3" });
      // let audioURL = window.URL.createObjectURL(blob);
      // console.log(audioURL);
      // // item = { ...item, trackObject: audioURL };
      // // audioRef.current.src = audioURL;
      setAudio(audioData);
    });
  };
  useEffect(() => {
    downloadAudio();
  }, []);

  return (
    <div
      className="home"
      style={{
        height:
          tracks[0].name && screenSize < 750
            ? `calc(100vh - 140px)`
            : tracks[0].name || screenSize < 750
            ? `calc(100vh-80px)`
            : "100vh",
      }}
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
