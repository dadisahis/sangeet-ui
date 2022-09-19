import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Soundbar from "../../components/Soundbar/Soundbar";
import "./artistpage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  getArtist,
  getArtistTracks,
  updateUser,
  getArtistAlbums,
} from "../../api/api";
import { useEffect, useContext, useState } from "react";
import { trackContext } from "../../context/trackContext";
import { updateTracks } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/authContext";
import TrackInfo from "../../components/TrackInfo/TrackInfo";
import Loader from "../../components/Loader/Loader";
import InfoCard from "../../components/InfoCard/InfoCard";

function ArtistPage() {
  const id = window.location.pathname.split("/")[2];
  const { state: tracks } = useContext(trackContext);
  const { user, dispatch: dispatchUser } = useContext(AuthContext);
  const [artistData, setArtistData] = useState(null);
  const [artistTracks, setArtistTracks] = useState(null);
  const [albumList, setAlbumList] = useState(null);
  const getArtistData = (id) => {
    const data = getArtist(id);
    data.then((artist) => {
      setArtistData(artist);
    });
  };
  const getArtistTrack = (id) => {
    const data = getArtistTracks(id);
    data.then((tracks) => {
      setArtistTracks(tracks);
    });
  };
  const getAlbums = (id) => {
    const data = getArtistAlbums(id);
    data.then((albums) => {
      setAlbumList(albums);
    });
  };
  const handleLikedSongs = (item) => {
    if (item.liked_by === null || !item.liked_by.includes(user._id)) {
      const data = updateTracks(
        {
          ...item,
          liked_by: [...item.liked_by, user._id],
        },
        item._id
      );
      data.then((i) => {
        toast("Added to liked songs!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
        getArtistTrack(id);
      });
    } else {
      const updated_liked_by = item.liked_by.filter((i) => {
        return i !== user._id;
      });
      const data = updateTracks(
        {
          ...item,
          liked_by: updated_liked_by,
        },
        item._id
      );
      data.then((i) => {
        toast("Removed from liked songs!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
        getArtistTrack(id);
      });
    }
  };

  const followArtist = () => {
    const artist_id = { user_id: artistData._id };
    user.following_artists.push(artist_id);
    const updatedUser = {
      ...user,
    };
    const data = updateUser(updatedUser, user._id);
    data
      .then((i) => {
        dispatchUser({ type: "UPDATE_USER", payload: i });
        toast(`Followed ${artistData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      })
      .catch(() => {
        toast(`Error in following ${artistData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
  };
  const unFollowArtist = () => {
    user.following_artists = user.following_artists.filter(
      (item) => item.user_id !== artistData._id
    );
    const updatedUser = {
      ...user,
    };
    const data = updateUser(updatedUser, user._id);
    data
      .then((i) => {
        dispatchUser({ type: "UPDATE_USER", payload: i });
        toast(`Unfollowed ${artistData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      })
      .catch(() => {
        toast(`Error in unfollowing ${artistData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
  };

  useEffect(() => {
    getArtistData(id);
    getArtistTrack(id);
    getAlbums(id);
  }, []);

  return (
    <div
      className="artistPage"
      style={{ height: tracks[0].name ? `calc(100vh - 80px)` : "100vh" }}
    >
      <div className="artistPage_wrapper">
        <div className="artistPage_top">
          <Navbar />
        </div>

        <div className="artist_container">
          <Sidebar />
          {artistData && artistTracks ? (
            <div className="artist_wrapper">
              <div className="artist_info_container">
                <div className="cover_pic_container">
                  <div className="blur"></div>
                  <img
                    src={artistData.images[1].url}
                    alt=""
                    className="artistCoverPic"
                  />
                </div>
                <div className="info_wrapper">
                  <div className="img_container">
                    <img
                      src={artistData.images[0].url}
                      alt=""
                      className="artistProfilePic"
                    />
                  </div>
                  <div className="info_container">
                    <p className="name">{artistData.name}</p>
                    <div className="genres_container">
                      <p className="genres_title">Genres: </p>
                      {artistData.genres.length > 0
                        ? artistData.genres.map((item, index) => (
                            <p key={index}>{item}</p>
                          ))
                        : null}
                    </div>
                  </div>
                  {user ? (
                    <div className="follow_button_container">
                      {user.following_artists.length > 0 &&
                      user.following_artists
                        .map((item) => item.user_id === artistData._id)
                        .includes(true) ? (
                        <div className="follow_button ">
                          <div
                            className="button following"
                            onClick={() => unFollowArtist()}
                          >
                            <p>Following</p>
                          </div>
                        </div>
                      ) : (
                        <div className="follow_button">
                          <div
                            className="button"
                            onClick={() => followArtist()}
                          >
                            <p>Follow</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>

              <TrackInfo
                trackList={artistTracks}
                showTitles={true}
                handleLikedSongs={handleLikedSongs}
              />
              <div className="infolist_container">
                <h2>Albums</h2>
                <div className="info_card_container">
                  {albumList
                    ? albumList.map((album) => <InfoCard data={album} />)
                    : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="loader_container">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="artist_bottom">
        {tracks[0].name ? <Soundbar /> : null}
      </div>
    </div>
  );
}

export default ArtistPage;
