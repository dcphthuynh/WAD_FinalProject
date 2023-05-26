import React, { useContext } from "react";
import Logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../Context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faUser } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            {/* <img src={Logo} alt="" /> */}
            <h1 className="logoName">
              WAD
              <span className="logoFont">
                <FontAwesomeIcon icon={faTerminal} />
              </span>
              BLOG
            </h1>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to={"?cat=art"}>
            <h6>ART</h6>
          </Link>
          <Link className="link" to={"?cat=science"}>
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to={"?cat=technology"}>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to={"?cat=cinema"}>
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to={"?cat=design"}>
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to={"?cat=food"}>
            <h6>FOOD</h6>
          </Link>
        </div>
        <div className="navbarLogin">
          {currentUser ? (
            <span className="write">
              <Link className="link" to={"/write"}>
                Write
              </Link>
            </span>
          ) : (
            <Link className="link" to={"/login"}>
              <button className="loginButton">Login</button>
            </Link>
          )}
          {currentUser ? (
            <Link className="loginButton" to={"/"} onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link className="link" to={"/register"}>
              <button className="write" style={{ cursor: "pointer" }}>
                Register
              </button>
            </Link>
          )}
          {currentUser ? (
            <FontAwesomeIcon className="userIcon" icon={faUser} />
          ) : null}
          <p>{currentUser?.username}</p>
        </div>
      </div>
    </div>
  );
};
