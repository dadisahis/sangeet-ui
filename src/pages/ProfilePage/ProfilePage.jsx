import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Soundbar from "../../components/Soundbar/Soundbar";
import "./profilepage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useContext, useState } from "react";
import { trackContext } from "../../context/trackContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/authContext";
import TrackInfo from "../../components/TrackInfo/TrackInfo";
import InfoCard from "../../components/InfoCard/InfoCard";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserById,
  getPlaylists,
  getFollowers,
  updateUser,
  createConversation,
  getConversations,
} from "../../api/api";
import Loader from "../../components/Loader/Loader";
import HOC from "../../components/HOC/HOC";

function ProfilePage() {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/")[2];
  //context
  const { state: tracks, dispatch } = useContext(trackContext);
  const { user, dispatch: dispatchUser } = useContext(AuthContext);
  //state
  const [profileData, setProfileData] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);
  const [followingArtist, setFollowingArtist] = useState([]);
  const [following, setFollowing] = useState([]);

  const getPlaylistList = () => {
    const data = getPlaylists({ user_id: id });
    data.then((list) => {
      setPlaylistList(list);
    });
  };
  const getprofileData = (id) => {
    const data = getUserById(id);
    data.then((profile) => {
      setProfileData(profile);
    });
  };
  const getRecentlyPlayed = () => {
    let tracks = JSON.parse(localStorage.getItem("recentlyPlayed"));
    const updatedTracks = [];
    if (tracks) {
      tracks = tracks.map((item) => {
        return item[0];
      });
      let updatedTracks = [
        ...new Map(tracks.map((item) => [item.name, item])).values(),
      ];
      setRecentlyPlayed(updatedTracks);
    }
  };

  const getFollowingList = () => {
    const artistData = getFollowers("following_artists", id);
    artistData.then((following_list) => {
      setFollowingArtist(following_list);
    });
    const userData = getFollowers("following_users", id);
    userData.then((following_list) => {
      setFollowing(following_list);
    });
  };
  const followUser = () => {
    const following_id = { user_id: profileData._id };
    user.following_users.push(following_id);
    profileData.followers.push({ user_id: user._id });
    const updateFollowingUserdata = updateUser(user, user._id);
    const updateFollowerUserData = updateUser(profileData, profileData._id);

    updateFollowingUserdata
      .then((i) => {
        dispatchUser({ type: "UPDATE_USER", payload: i });
        toast(`Followed ${profileData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      })
      .catch(() => {
        toast(`Error in following ${profileData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
  };
  const unFollowUser = () => {
    user.following_users = user.following_artists.filter(
      (item) => item.user_id !== profileData._id
    );
    profileData.followers = profileData.followers.filter(
      (item) => item.user_id !== user._id
    );
    const updateFollowingUserdata = updateUser(user, user._id);
    const updateFollowerUserData = updateUser(profileData, profileData._id);
    updateFollowingUserdata
      .then((i) => {
        dispatchUser({ type: "UPDATE_USER", payload: i });
        toast(`Unfollowed ${profileData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      })
      .catch(() => {
        toast(`Error in unfollowing ${profileData.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
  };

  const createNewConversation = () => {
    const payload1 = {
      members: [user._id, id],
    };
    const data = getConversations(user._id);
    data.then((conversationList) => {
      var exist = false;
      conversationList.forEach((i) => {
        if (i.members.includes(id) && i.members.includes(user._id)) {
          exist = true;
        }
      });
      if (exist) {
        navigate("/conversations");
      } else {
        const data1 = createConversation(payload1);
        data1.then(() => {
          navigate(`/conversations`);
        });
      }
    });
  };

  useEffect(() => {
    getprofileData(id);
    getRecentlyPlayed();
    getPlaylistList();
    getFollowingList();
  }, [id]);

  return (
    <div
      className="profilePage"
      style={{ height: tracks[0].name ? `calc(100vh - 80px)` : "100vh" }}
    >
      {profileData && recentlyPlayed ? (
        <div className="profile_wrapper">
          <div className="profile_info_container">
            <div className="cover_pic_container">
              <div className="blur"></div>
            </div>
            <div className="info_wrapper">
              <div className="img_container">
                <img
                  src={
                    profileData && profileData.images
                      ? profileData.images[0].url
                      : "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
                  }
                  alt=""
                  className="profileProfilePic"
                />
              </div>
              <div className="info_container">
                <p className="profile_title">Profile </p>
                <p className="name">{profileData.name}</p>
                <div className="follow_container">
                  <p>{profileData.followers.length} followers </p>
                  <p>|</p>
                  <p>
                    {profileData.following_users.length +
                      profileData.following_artists.length}{" "}
                    following{" "}
                  </p>
                </div>
              </div>
              {user._id !== profileData._id && (
                <div className="follow_button_container">
                  {user.following_users &&
                  user.following_users.length > 0 &&
                  user.following_users
                    .map((item) => item.user_id === profileData._id)
                    .includes(true) ? (
                    <div className="follow_button ">
                      <div
                        className="button following"
                        onClick={() => unFollowUser()}
                      >
                        <p>Following</p>
                      </div>
                    </div>
                  ) : (
                    <div className="follow_button">
                      <div className="button" onClick={() => followUser()}>
                        <p>Follow</p>
                      </div>
                    </div>
                  )}
                  <div className="dm_button">
                    <div
                      className="button"
                      onClick={() => {
                        createNewConversation();
                      }}
                    >
                      <ChatBubbleOutlineIcon className="chat_icon" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {recentlyPlayed && recentlyPlayed.length > 0 && id === user._id ? (
            <TrackInfo
              trackList={recentlyPlayed}
              showTitles={true}
              handleLikedSongs={() => {}}
              title="Recently Played"
            />
          ) : null}
          {playlistList.length > 0 && (
            <>
              <h3 className="playlist_title">Playlists</h3>
              <div className="list_container">
                {playlistList.map((item) => (
                  <Link to={`/playlist/${item._id}`}>
                    <InfoCard data={item} />
                  </Link>
                ))}
              </div>
            </>
          )}
          {followingArtist.length > 0 && (
            <>
              <h3 className="playlist_title">Following Artists</h3>
              <div className="list_container">
                {followingArtist.map((item) => (
                  <Link to={`/artist/${item._id}`}>
                    <InfoCard data={item} />
                  </Link>
                ))}
              </div>
            </>
          )}
          {following.length > 0 && (
            <>
              <h3 className="playlist_title">Following Profiles</h3>
              <div className="list_container">
                {following.map((item) => (
                  <Link to={`/user/${item._id}`}>
                    <InfoCard data={item} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="loader_container">
          <Loader />
        </div>
      )}
    </div>
  );
}
const ProfilePageWrapped = () => {
  return <HOC children={<ProfilePage />} />;
};
export default ProfilePageWrapped;
