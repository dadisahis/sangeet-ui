import React, { useState, useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Switch } from "@mui/material";
import "./sidebar.scss";
import { createPlaylist } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [playList, setPlaylist] = useState({
    name: "",
    user_id: user ? user._id : "",
    images: [
      {
        url: "https://i.pinimg.com/originals/ba/8f/f4/ba8ff45ef8e1093acf119aeef48b9d15.jpg",
      },
    ],
    type: "public_playlist",
    is_liked: false,
    isPrivate: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (e) => {
    setPlaylist((prev) =>
      e.target.id === "isPrivate"
        ? {
            ...prev,
            [e.target.id]: e.target.checked,
            type: e.target.checked ? "private_playlist" : `public_playlist`,
          }
        : { ...prev, [e.target.id]: e.target.value }
    );
  };
  const handleClick = () => {
    const data = createPlaylist(playList);
    setOpenModal(!openModal);
    data.then((item) => {
      navigate("/list-playlist");
    });
  };
  console.log(playList);
  return (
    <div className="sidebar">
      {openModal ? (
        <div className="sidebar_playlist_modal_container">
          <div className="input_parent_container">
            <div className="input_container">
              <p>Name</p>
              <input
                type="text"
                placeholder="Playlist Name"
                id="name"
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="input_container">
              <p>Description</p>
              <input
                type="text"
                placeholder="Add a description(optional)"
                id="description"
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="input_container">
              <p>Set Playlist as Private</p>
              <Switch
                checked={playList.isPrivate || false}
                id="isPrivate"
                onChange={handleChange}
                className="input switch"
                size="medium"
                color="success"
              />
            </div>
            <div className="submit_button">
              <Button className="inputButton" onClick={handleClick}>
                <p>Create Playlist</p>
              </Button>
            </div>
          </div>
          <div
            className="close_icon"
            onClick={() => {
              setOpenModal(!openModal);
            }}
          >
            <CloseIcon />
          </div>
        </div>
      ) : null}
      <div className="sidebar_container">
        <div className="sidebar_top">
          <div className="sidebar_items">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="sidebar_item">
                <HomeIcon />
              </div>
            </Link>
            <div className="sidebar_item">
              <SearchIcon />
            </div>
            <Link to={user ? "/list-playlist" : "/login"}>
              <div className="sidebar_item">
                <LibraryMusicIcon />
              </div>
            </Link>

            <div
              className="sidebar_item type"
              onClick={() => (user ? setOpenModal(!openModal) : null)}
            >
              <AddBoxIcon />
            </div>

            <Link to={user ? "/liked-songs" : "/login"}>
              <div className="sidebar_item">
                <FavoriteBorderIcon />
              </div>
            </Link>

            {user ? (
              <Link to={`/conversations`}>
                <div className="sidebar_item type">
                  <ChatIcon />
                </div>
              </Link>
            ) : null}
            {user ? (
              <Link to={`/user/${user._id}`}>
                <div className="sidebar_item">
                  <AccountCircleIcon />
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
