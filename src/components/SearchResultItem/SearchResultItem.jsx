import React, { useState } from "react";
import "./searchresultitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
function SearchResultItem({ data, isNotArtist }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="searchresultitem">
      <div
        className="searchresultitem_container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="img_container">
          {data && data.images && data.images.length > 0 && !isNotArtist ? (
            <div className="img_wrapper">
              <img src={data.images[0].url} alt="" />
              <div className="info_container">
                <h3>{data.name}</h3>
              </div>
            </div>
          ) : (
            <div className="img_wrapper">
              <img
                src={
                  isNotArtist
                    ? data.albums[0].album_image
                    : "https://images.squarespace-cdn.com/content/v1/572e522f044262a7f8bb164f/1582526288999-ZV2M90MCATSH6FEIW83R/music.jpg?format=500w"
                }
                alt=""
              />
              <div className="info_container">
                <h3>{data.name}</h3>
              </div>
            </div>
          )}
        </div>
        {hover ? (
          <div className="play_icon_container">
            <PlayArrowIcon className="play_icon" />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchResultItem;
