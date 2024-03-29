import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeWrapped from "./pages/Home/Home";
import ArtistPageWrapped from "./pages/ArtistPage/ArtistPage";
import Login from "./pages/Login/Login";
import LikedSongs from "./pages/LikedSongs/LikedSongs";
import CustomPlaylist from "./pages/CustomPlaylist/CustomPlaylist";
import ListPlaylist from "./pages/ListPlaylist/ListPlaylist";
import Register from "./pages/Register/Register";
import ProfilePageWrapped from "./pages/ProfilePage/ProfilePage";
import Conversations from "./pages/Conversations/Conversations";
import Soundbar from "./components/Soundbar/Soundbar";
import { trackContext } from "./context/trackContext";
import { useContext } from "react";

function App() {
  const { state: tracks } = useContext(trackContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeWrapped />} />
          <Route path="/artist/:id" element={<ArtistPageWrapped />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<ProfilePageWrapped />} />
          <Route path="/liked-songs" element={<LikedSongs />} />
          <Route path="/list-playlist" element={<ListPlaylist />} />
          <Route path="/playlist/:id" element={<CustomPlaylist />} />
          <Route path="/conversations" element={<Conversations />} />
        </Routes>
      </BrowserRouter>
      <div className="bottom_container">
        {tracks && tracks[0].name ? <Soundbar /> : null}
      </div>
    </>
  );
}

export default App;
