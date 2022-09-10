import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import Login from "./pages/Login/Login";
import LikedSongs from "./pages/LikedSongs/LikedSongs";
import CustomPlaylist from "./pages/CustomPlaylist/CustomPlaylist";
import ListPlaylist from "./pages/ListPlaylist/ListPlaylist";
import Register from "./pages/Register/Register";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Conversations from "./pages/Conversations/Conversations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/liked-songs" element={<LikedSongs />} />
        <Route path="/list-playlist" element={<ListPlaylist />} />
        <Route path="/playlist/:id" element={<CustomPlaylist />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
