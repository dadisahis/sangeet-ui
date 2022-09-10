import React from "react";
import "./navbar.scss";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TagIcon from "@mui/icons-material/Tag";
import Login from "../../pages/Login/Login";
import SearchBox from "../SearchBox/SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import UserInfo from "../UserInfo/UserInfo";
function Navbar() {
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="navbar_left">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <div className="logo">
              <h1>संगीत</h1>
            </div>
          </Link>
          <div className="left_items">
            {/* <div className="left_item">
              <NewspaperIcon />
              <p>News</p>
            </div>
            <div className="left_item">
              <TagIcon />
              <p>Social</p>
            </div> */}
          </div>
        </div>
        <div className="navbar_right">
          <div className="right_items">
            <div className="right_item">
              <SearchBox />
            </div>
            <div className="right_item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png?20111003033457"
                alt=""
              />
            </div>
            <div className="right_item button">
              {user ? (
                <UserInfo />
              ) : (
                <Button
                  className="login_button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
