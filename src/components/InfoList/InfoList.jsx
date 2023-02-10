import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllArtist } from "../../api/api";
import InfoCard from "../InfoCard/InfoCard";
import "./infolist.scss";

function InfoList() {
  const [hipHopList, setHipHopList] = useState([]);
  const [popList, setPopList] = useState([]);
  const [rockList, setRockList] = useState([]);
  const getArtistByGenre = (genre, limit, setMethod) => {
    const data = getAllArtist({ genres: genre, limit: limit });
    data.then((data) => {
      setMethod(data);
    });
  };
  useEffect(() => {
    getArtistByGenre("hip hop", 5, setHipHopList);
    getArtistByGenre("pop", 5, setPopList);
    getArtistByGenre("rock", 5, setRockList);
  }, []);
  return (
    <div className="infolist">
      {hipHopList.length > 0 && rockList.length > 0 && popList.length > 0 ? (
        <>
          <div className="infolist_container">
            <h2>Top Hip-hop Artist</h2>
            <div className="info_card_container">
              {hipHopList.map((item, index) => (
                <Link
                  to={`artist/${item._id}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <InfoCard data={item} key={index} />
                </Link>
              ))}
            </div>
          </div>
          <div className="infolist_container">
            <h2>Top Pop Artist</h2>
            <div className="info_card_container">
              {popList.map((item, index) => (
                <Link
                  to={`artist/${item._id}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <InfoCard data={item} key={index} />
                </Link>
              ))}
            </div>
          </div>
          <div className="infolist_container">
            <h2>Top Rock Artists</h2>
            <div className="info_card_container">
              {rockList.map((item, index) => (
                <Link
                  to={`artist/${item._id}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <InfoCard data={item} key={index} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="infolist_container">
          <div className="title skeleton-info skeleton-title"></div>
          <div className="info_card_container">
            <div className="card skeleton-info"></div>
            <div className="card skeleton-info"></div>
            <div className="card skeleton-info"></div>
            <div className="card skeleton-info"></div>
            <div className="card skeleton-info"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoList;
