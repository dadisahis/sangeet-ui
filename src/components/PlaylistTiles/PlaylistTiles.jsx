import React from "react";
import "./playlisttiles.scss";
function PlaylistTiles({ background, textColor, title }) {
  return (
    <div className="playlist_tiles" style={{ background: background }}>
      <div className="playlist_info">
        <h2 style={{ color: textColor }}>{title}</h2>
      </div>
    </div>
  );
}

export default PlaylistTiles;
