import React, { useState, useEffect, useRef, useContext } from "react";
import "./soundbar.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { trackContext } from "../../context/trackContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthContext } from "../../context/authContext";
import { QueueMusic } from "@mui/icons-material";
import { updateTracks } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Soundbar() {
  // states
  const { state: tracks } = useContext(trackContext);
  const { user } = useContext(AuthContext);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackVolume, setTrackVolume] = useState(0.5);
  const [isLoop, setIsLoop] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [openArtwork, setOpenArtwork] = useState(false);
  const [openQueue, setOpenQueue] = useState(false);
  let windowSize = window.screen.width;

  //ref
  const audioRef = useRef(new Audio(tracks[trackIndex].trackObject));
  const intervalRef = useRef();
  const { duration } = audioRef.current;

  const handleClick = (index) => {
    setTrackIndex(index);
  };

  const toPreviousTrack = () => {
    if (isLoop) {
      setTrackIndex(trackIndex > 0 ? trackIndex - 1 : tracks.length - 1);
    } else {
      setTrackIndex(trackIndex > 0 ? trackIndex - 1 : 0);
    }
    // dispatch({ type: "CHANGE_TRACK", payload: [tracks[trackIndex]] });
  };
  const toNextTrack = () => {
    if (isLoop) {
      setTrackIndex(trackIndex < tracks.length - 1 ? trackIndex + 1 : 0);
    } else {
      setTrackIndex(
        trackIndex < tracks.length - 1 ? trackIndex + 1 : trackIndex
      );
    }
    // dispatch({ type: "CHANGE_TRACK", payload: [tracks[trackIndex]] });
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
      });
    }
  }
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #FFF), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const onScrubVolume = (value) => {
    audioRef.current.volume = value;
    setTrackVolume(audioRef.current.volume);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // useEffect(() => {
  //   return () => {
  //     audioRef.current.pause();
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[trackIndex].trackObject);
    clearInterval(intervalRef.current);
    setTrackProgress(audioRef.current.currentTime);

    audioRef.current.play();
    setIsPlaying(!isPlaying);
    startTimer();

    // dispatch({ type: "CHANGE_TRACK", payload: [tracks[trackIndex]] });
  }, [trackIndex, tracks]);

  return (
    <div className={openArtwork ? "soundbar open" : "soundbar"}>
      <input
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={duration ? duration : `${duration}`}
        className="progressBar"
        onChange={(e) => {
          onScrub(e.target.value);
        }}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
      <div
        className={
          openArtwork ? "soundbar_container open" : "soundbar_container"
        }
      >
        {!openArtwork ? (
          <>
            <div className="soundbar_left">
              <div className="button_container">
                <div
                  className="icon_container"
                  onClick={() => toPreviousTrack()}
                >
                  <SkipPreviousIcon className="skip_icon" />
                </div>
                <div
                  className="icon_container"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseIcon className="play_icon" />
                  ) : (
                    <PlayArrowIcon className="play_icon" />
                  )}
                </div>
                <div className="icon_container" onClick={() => toNextTrack()}>
                  <SkipNextIcon className="skip_icon" />
                </div>
              </div>
            </div>
            <div className="soundbar_middle">
              <div className="middle_left">
                <img src={tracks[trackIndex].albums[0].album_image} alt="" />
              </div>
              <div className="middle_right">
                <h4>{tracks[trackIndex].name}</h4>
                <p>{tracks[trackIndex].artists[0].artist_name}</p>
              </div>
              <div className={tracks[trackIndex].liked_by.includes(user._id) ?  "liked_component true": "liked_component"} onClick={()=> handleLikedSongs(tracks[trackIndex])}>
                <FavoriteIcon />
              </div>
            </div>
            <div className="soundbar_right">
              <div className="right_icon hide">
                <VolumeUpIcon />
              </div>
              <div
                className={
                  isLoop ? "right_icon active hide" : "right_icon hide"
                }
                onClick={() => {
                  setIsLoop(!isLoop);
                }}
              >
                <RepeatIcon />
              </div>
              <div
                className={
                  isRandom ? "right_icon active hide" : "right_icon hide"
                }
                onClick={() => {
                  setIsRandom(!isRandom);
                }}
              >
                <ShuffleIcon />
              </div>
              <div
                className="right_icon"
                onClick={() => setOpenArtwork(!openArtwork)}
              >
                <ArrowDropUpIcon />
              </div>
            </div>
            {/* <ArtistCover open={openArtwork} /> */}
          </>
        ) : (
          <div className="soundbar_open_container">
            <div className="soundbar_open_wrapper">
              <div className="soundbar_top">
                <div className="top_left">
                  <img src={tracks[trackIndex].albums[0].album_image} alt="" />
                </div>
                <div className="top_info_container">
                  <div className="top_right">
                    <h4>{tracks[trackIndex].name}</h4>
                    <p>{tracks[trackIndex].artists[0].artist_name}</p>
                  </div>
                  <div className="button_container">
                    <FavoriteIcon
                      className={
                        tracks[trackIndex].liked_by &&
                        tracks[trackIndex].liked_by.includes(user._id)
                          ? "favourite_icon"
                          : "favourite_icon"
                      }
                    />
                    <div onClick={() => setOpenQueue(!openQueue)}>
                      <QueueMusic className="queue_icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="soundbar_controls">
                <div className="button_container">
                  <div className="icon_container">
                    <ShuffleIcon
                      className={isRandom ? "skip_icon active" : "skip_icon"}
                      onClick={() => {
                        setIsRandom(!isRandom);
                      }}
                    />
                  </div>
                  <div
                    className="icon_container"
                    onClick={() => toPreviousTrack()}
                  >
                    <SkipPreviousIcon className="skip_icon" />
                  </div>
                  <div
                    className="icon_container"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <PauseIcon className="play_icon" />
                    ) : (
                      <PlayArrowIcon className="play_icon" />
                    )}
                  </div>
                  <div className="icon_container" onClick={() => toNextTrack()}>
                    <SkipNextIcon className="skip_icon" />
                  </div>
                  <div className="icon_container">
                    <RepeatIcon
                      className={isLoop ? "skip_icon active" : "skip_icon"}
                      onClick={() => {
                        setIsLoop(!isLoop);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="soundbar_top_right">
                <div
                  className="right_icon"
                  onClick={() => {
                    audioRef.current.volume > 0
                      ? onScrubVolume(0)
                      : onScrubVolume(1);
                  }}
                >
                  {audioRef.current.volume > 0 ? (
                    <VolumeUpIcon />
                  ) : (
                    <VolumeOffIcon />
                  )}
                </div>
                <input
                  type="range"
                  value={trackVolume}
                  step={0.01}
                  min={0}
                  max={1}
                  className="volumeBar"
                  onChange={(e) => {
                    onScrubVolume(e.target.value);
                  }}
                  onMouseUp={onScrubEnd}
                  onKeyUp={onScrubEnd}
                />
                <div
                  className="right_icon"
                  onClick={() => setOpenArtwork(!openArtwork)}
                >
                  <ArrowDropDownIcon />
                </div>
              </div>
            </div>
            <div className="queue_component">
              {windowSize > 750 ? (
                <>
                  <h3>Queue</h3>
                  {tracks[0].name &&
                    tracks.map((track, index) => (
                      <div
                        className={
                          index === trackIndex
                            ? "queue_track_info_container active"
                            : "queue_track_info_container"
                        }
                        onClick={() => handleClick(index)}
                      >
                        <img src={track.albums[0].album_image} alt="" />
                        <p>{track.name}</p>
                        <p>{track.artists[0].artist_name}</p>
                      </div>
                    ))}
                </>
              ) : openQueue ? (
                <>
                  <h3>Queue</h3>
                  {tracks[0].name &&
                    tracks.map((track, index) => (
                      <div
                        className={
                          index === trackIndex
                            ? "queue_track_info_container active"
                            : "queue_track_info_container"
                        }
                        onClick={() => handleClick(index)}
                      >
                        <img src={track.albums[0].album_image} alt="" />
                        <p>{track.name}</p>
                        <p>{track.artists[0].artist_name}</p>
                      </div>
                    ))}
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Soundbar;
