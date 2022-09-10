import React, { useState } from "react";
import "./searchbox.scss";
import SearchIcon from "@mui/icons-material/Search";
import { search } from "../../api/api";
import { useEffect } from "react";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import InfoCard from "../InfoCard/InfoCard";
import { Link } from "react-router-dom";
function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  const searchItems = () => {
    const tracks = search(searchQuery, "track");
    const album = search(searchQuery, "album");
    const artists = search(searchQuery, "artist");
    const user = search(searchQuery, "user");
    tracks.then((data) => {
      setTracks(data);
    });
    album.then((data) => {
      setAlbums(data);
    });
    artists.then((data) => {
      setArtists(data);
    });
    user.then((data) => {
      setUsers(data);
    });
  };

  useEffect(() => {
    searchItems();
  }, [searchQuery]);
  return (
    <div className="searchbox">
      <div className="searchbox_container">
        <input
          type="text"
          className="searchbox_input"
          placeholder="Search for songs,artists and much more"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <div className="searchButton">
          <SearchIcon />
        </div>
      </div>
      {searchQuery.length > 2 &&
      (artists.length > 0 ||
        tracks.length > 0 ||
        albums.length > 0 ||
        users.length > 0) ? (
        <div className="searchResults_container">
          {artists.length > 0 && (
            <div className="result_item">
              <p>Artists</p>
              {artists.map((item) => (
                <Link to={`/artist/${item._id}`}>
                  <SearchResultItem data={item} />
                </Link>
              ))}
            </div>
          )}
          {tracks.length > 0 && (
            <div className="result_item">
              <p>Tracks</p>
              {tracks.map((item) => (
                <SearchResultItem data={item} isNotArtist={true} />
              ))}
            </div>
          )}
          {albums.length > 0 && (
            <div className="result_item">
              <p>Albums</p>
              {albums.map((item) => (
                <SearchResultItem data={item} />
              ))}
            </div>
          )}
          {users.length > 0 && (
            <div className="result_item">
              <p>Profiles</p>
              {users.map((item) => (
                <Link to={`/user/${item._id}`}>
                  <SearchResultItem data={item} />
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBox;
