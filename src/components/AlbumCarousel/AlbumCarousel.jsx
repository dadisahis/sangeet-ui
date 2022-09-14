import React, { useEffect } from "react";
import "./albumcarousel.scss";
import { useState } from "react";
import Circle from "@mui/icons-material/Circle";
import { getAlbums, getArtist } from "../../api/api";
function AlbumCarousel({ setLoaderState }) {
  const [index, setIndex] = useState(0);
  const [albumList, setAlbumList] = useState([]);
  const getFeaturedAlbumList = () => {
    const res = getAlbums({ featured: true });

    res.then(async (data) => {
      const album_list = await Promise.all(
        data.map(async (item) => {
          const artist = await getArtist(item.artists[0].id);

          return { ...item, artists: artist };
        })
      );
      setLoaderState(false);
      setAlbumList(album_list);
    });
  };

  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       clickNext();
  //     }, 3000);
  //     return () => clearInterval(id);
  //   }, [index]);
  useEffect(() => {
    getFeaturedAlbumList();
  }, []);
  return (
    <div
      className="albumcarousel"
      style={{
        background: `linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83))`,
      }}
    >
      {albumList.length > 0 ? (
        <div className="albumcarousel_parent_container">
          <div className="albumcarousel_container">
            <div className="albuminfo_container">
              <p className="artistName">{albumList[index].artists.name}</p>
              <p className="albumName">{albumList[index].name}</p>
              <p className="year">{`${new Date(
                albumList[index].release_date
              ).getFullYear()}`}</p>
            </div>
            <div className="albumcarousel_wrapper">
              <div className="img_container">
                <div className="blur_container"></div>
                <img
                  src={albumList[index].images[0].url}
                  alt=""
                  className="carousel"
                />
              </div>
            </div>
          </div>
          <div className="carousel_changer">
            {albumList.map((item, ind) => (
              <div
                className={
                  ind === index ? "circle_container active" : "circle_container"
                }
                onClick={() => setIndex(ind)}
              >
                <Circle className="circle" />
              </div>
            ))}
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
}

export default AlbumCarousel;
